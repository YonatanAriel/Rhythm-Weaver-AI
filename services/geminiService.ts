import { GoogleGenAI, Type } from "@google/genai";
import type { Song, AudioTrack } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const songSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A creative and fitting title for the song." },
    bpm: { type: Type.INTEGER, description: "The tempo of the song in beats per minute." },
    key: { type: Type.STRING, description: "The musical key of the song (e.g., 'C# Minor')." },
    summary: { type: Type.STRING, description: "A rich, one-paragraph summary describing the overall vibe, structure, and feel of the composition." },
    tracks: {
      type: Type.ARRAY,
      description: "An array of distinct instrument tracks in the song.",
      items: {
        type: Type.OBJECT,
        properties: {
          instrument: { type: Type.STRING, description: "The name of the instrument or sound (e.g., '808 Kick', 'Lead Synth', 'Pizzicato Strings')." },
          description: { type: Type.STRING, description: "A brief description of what this instrument is playing and its role in the song." },
        },
        required: ["instrument", "description"],
      },
    },
  },
  required: ["title", "bpm", "key", "summary", "tracks"],
};

const audioSelectionSchema = {
  type: Type.OBJECT,
  properties: {
    trackId: { 
      type: Type.STRING,
      description: "The ID of the single best-matching audio track from the library.",
    },
    justification: {
      type: Type.STRING,
      description: "A brief one-sentence explanation for why this track was chosen."
    }
  },
  required: ["trackId", "justification"]
};


export const generateSong = async (
  genres: string[], 
  moods: string[], 
  textures: string[],
  variation?: string
): Promise<Song> => {
  const prompt = `
    Create a detailed musical composition concept.
    The composition must be an imaginative and harmonically coherent fusion of the following creative inputs.
    Genres: ${genres.join(', ') || 'Any'}.
    Moods: ${moods.join(', ') || 'Any'}.
    Textures: ${textures.join(', ') || 'Any'}.
    ${variation ? `Apply this variation: "${variation}".` : ''}
    Generate a plausible song title, BPM, musical key, a rich summary, and a list of distinct instrument tracks.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: songSchema,
        systemInstruction: "You are an expert musicologist and AI composer named 'Rhythm Weaver'. Your purpose is to generate detailed concepts for original musical compositions by creatively fusing disparate genres, moods, and sonic textures. Respond ONLY with the JSON object defined in the schema."
      },
    });

    const jsonString = response.text.trim();
    const songData = JSON.parse(jsonString);
    
    if (!songData.title || !songData.tracks) {
        throw new Error("Invalid song data structure received from AI.");
    }

    return songData as Song;
  } catch (error) {
    console.error("Error generating song with Gemini:", error);
    throw new Error("The AI failed to generate a valid song structure. Please try again.");
  }
};

export const getVariationSuggestions = async (songSummary: string): Promise<string[]> => {
    const prompt = `
      Based on the following musical composition, suggest 3 concise, creative variations.
      Each suggestion should be a short, actionable phrase like "Make this more 'Trip Hop'" or "Add a 'Post Punk' breakdown".
      Composition Summary: "${songSummary}"
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                },
                systemInstruction: "You are a creative music AI assistant. Your job is to suggest interesting variations for an existing musical idea. Provide 3 short, actionable suggestions. Respond ONLY with a JSON array of strings as defined in the schema."
            }
        });

        const jsonString = response.text.trim();
        const suggestions = JSON.parse(jsonString);

        if (!Array.isArray(suggestions) || suggestions.some(s => typeof s !== 'string')) {
            throw new Error("Invalid suggestions format received.");
        }

        return suggestions as string[];
    } catch (error) {
        console.error("Error getting variation suggestions:", error);
        return ["Make it more ambient", "Add a faster beat", "Introduce a vocal melody"]; // Fallback
    }
};

/**
 * Acts as an AI Music Supervisor to select the best audio track from a library
 * based on a generated song concept.
 */
export const selectMatchingAudio = async (song: Song, audioLibrary: AudioTrack[]): Promise<string> => {
  const libraryString = audioLibrary.map(track => 
    `{ "id": "${track.id}", "description": "${track.description}", "tags": ["${track.tags.join('", "')}"] }`
  ).join(',\n');

  const prompt = `
    You are an expert AI Music Supervisor. Your task is to select the perfect backing track for a musical concept.
    Analyze the following SONG CONCEPT details and choose the ONE track from the provided AUDIO LIBRARY that is the best possible fit.

    **SONG CONCEPT:**
    - Title: ${song.title}
    - BPM: ${song.bpm}
    - Key: ${song.key}
    - Summary: ${song.summary}
    - Instruments: ${song.tracks.map(t => t.instrument).join(', ')}

    **AUDIO LIBRARY (JSON Array):**
    [
      ${libraryString}
    ]

    Based on the mood, genre, texture, and overall feeling of the SONG CONCEPT, which track from the AUDIO LIBRARY is the most suitable?
    Respond with a JSON object containing the chosen track's ID and a brief justification.
  `;
  
  try {
     const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: audioSelectionSchema,
        systemInstruction: "You are an expert AI Music Supervisor. Your purpose is to select the best audio track from a library that matches a given song concept. Respond ONLY with the JSON object defined in the schema."
      }
    });

    const jsonString = response.text.trim();
    const selectionData = JSON.parse(jsonString);
    const selectedId = selectionData.trackId;

    const selectedTrack = audioLibrary.find(track => track.id === selectedId);

    if (selectedTrack) {
      console.log(`AI selected track: ${selectedTrack.id}. Justification: ${selectionData.justification}`);
      return selectedTrack.url;
    } else {
      console.warn(`AI returned an invalid track ID: "${selectedId}". Using fallback.`);
      return audioLibrary[0].url; // Fallback to the first track
    }
  } catch (error) {
     console.error("Error selecting matching audio with Gemini:", error);
     throw new Error("The AI failed to select a matching audio track.");
  }
};