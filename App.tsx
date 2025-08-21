import React, { useState, useCallback } from 'react';
import { AUDIO_LIBRARY, MOODS, TEXTURES } from './constants';
import { Song, Tag, LoadingState, AudioState } from './types';
import WeaverControls from './components/WeaverControls';
import Header from './components/Header';
import StudioDisplay from './components/StudioDisplay';
import Loader from './components/Loader';
import { generateSong, getVariationSuggestions, selectMatchingAudio } from './services/geminiService';

const App: React.FC = () => {
  const [selectedGenres, setSelectedGenres] = useState<Tag[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<Tag[]>([]);
  const [selectedTextures, setSelectedTextures] = useState<Tag[]>([]);
  
  const [generatedSong, setGeneratedSong] = useState<Song | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);

  // New state for audio
  const [audioState, setAudioState] = useState<AudioState>(AudioState.IDLE);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleWeaveRhythm = useCallback(async (variation?: string) => {
    if (selectedGenres.length === 0 && selectedMoods.length === 0 && selectedTextures.length === 0) {
      setError("Please select at least one tag to start weaving.");
      return;
    }

    setLoadingState(LoadingState.LOADING);
    setError(null);
    setGeneratedSong(null);
    // Reset audio state when weaving a new rhythm
    setAudioState(AudioState.IDLE);
    setAudioUrl(null);

    try {
      const song = await generateSong(
        selectedGenres.map(t => t.name), 
        selectedMoods.map(t => t.name), 
        selectedTextures.map(t => t.name),
        variation
      );
      setGeneratedSong(song);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to weave rhythm. ${errorMessage}`);
      setLoadingState(LoadingState.ERROR);
    }
  }, [selectedGenres, selectedMoods, selectedTextures]);

  const handleGenerateAudio = useCallback(async () => {
    if (!generatedSong) return;

    setAudioState(AudioState.GENERATING);
    try {
        const url = await selectMatchingAudio(generatedSong, AUDIO_LIBRARY);
        setAudioUrl(url);
        setAudioState(AudioState.READY);
    } catch (err) {
        console.error("Audio selection failed:", err);
        setError("AI failed to select a matching audio track. Please try again.");
        setAudioState(AudioState.ERROR);
    }
  }, [generatedSong]);
  
  const resetApp = () => {
    setSelectedGenres([]);
    setSelectedMoods([]);
    setSelectedTextures([]);
    setGeneratedSong(null);
    setLoadingState(LoadingState.IDLE);
    setError(null);
    // Reset audio state
    setAudioState(AudioState.IDLE);
    setAudioUrl(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <Header onReset={resetApp} />
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <WeaverControls
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            selectedMoods={selectedMoods}
            setSelectedMoods={setSelectedMoods}
            selectedTextures={selectedTextures}
            setSelectedTextures={setSelectedTextures}
            onWeave={handleWeaveRhythm}
            isLoading={loadingState === LoadingState.LOADING}
          />
          <div className="w-full min-h-[60vh] lg:min-h-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-indigo-500/10 p-6 flex items-center justify-center">
            {loadingState === LoadingState.LOADING && <Loader />}
            {loadingState === LoadingState.IDLE && (
              <div className="text-center text-gray-400">
                <h2 className="text-2xl font-bold">Your Sonic Canvas</h2>
                <p className="mt-2">Select your elements and click "Weave Rhythm" to begin.</p>
              </div>
            )}
             {loadingState === LoadingState.ERROR && error && (
              <div className="text-center text-red-400 bg-red-900/50 p-6 rounded-lg">
                <h2 className="text-xl font-bold">Error</h2>
                <p className="mt-2">{error}</p>
              </div>
            )}
            {loadingState === LoadingState.SUCCESS && generatedSong && (
              <StudioDisplay 
                song={generatedSong} 
                onGenerateVariation={handleWeaveRhythm} 
                getSuggestions={getVariationSuggestions}
                audioState={audioState}
                audioUrl={audioUrl}
                onGenerateAudio={handleGenerateAudio}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;