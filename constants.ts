import { Tag, AudioTrack } from './types';

export const GENRES: Tag[] = [
  { id: 'g1', name: 'Japanese City Pop' },
  { id: 'g2', name: 'Death Metal' },
  { id: 'g3', name: 'Synthwave' },
  { id: 'g4', name: 'Ambient Lo-fi' },
  { id: 'g5', name: 'Trap' },
  { id: 'g6', name: 'Baroque Classical' },
  { id: 'g7', name: 'Psychedelic Rock' },
  { id: 'g8', name: 'UK Garage' },
  { id: 'g9', name: 'Industrial Techno' },
  { id: 'g10', name: 'Gregorian Chant' },
];

export const MOODS: Tag[] = [
  { id: 'm1', name: 'Melancholic' },
  { id: 'm2', name: 'Euphoric' },
  { id: 'm3', name: 'Chaotic' },
  { id: 'm4', name: 'Nostalgic' },
  { id: 'm5', name: 'Aggressive' },
  { id: 'm6', name: 'Serene' },
  { id: 'm7', name: 'Futuristic' },
  { id: 'm8', name: 'Mysterious' },
  { id: 'm9', name: 'Hopeful' },
  { id: 'm10', name: 'Anxious' },
];

export const TEXTURES: Tag[] = [
  { id: 't1', name: 'Lush Strings' },
  { id: 't2', name: 'Staccato Rhythms' },
  { id: 't3', name: 'Shimmering Synths' },
  { id: 't4', name: 'Crunchy Drums' },
  { id: 't5', name: 'Ethereal Vocals' },
  { id: 't6', name: 'Distorted Bass' },
  { id: 't7', name: 'Glitching Percussion' },
  { id: 't8', name: 'Sparkling Arpeggios' },
  { id: 't9', name: 'Warm Pads' },
  { id: 't10', name: 'Acoustic Guitar' },
];

// Expanded audio library for AI selection
export const AUDIO_LIBRARY: AudioTrack[] = [
  { id: 'synthwave-80s', url: 'https://cdn.pixabay.com/audio/2022/06/08/audio_36bba7000d.mp3', description: 'Classic 80s retro-futuristic synthwave with a driving beat, neon-soaked synths, and a feeling of nostalgic city nights.', tags: ['synthwave', 'electronic', 'futuristic', 'nostalgic'] },
  { id: 'death-metal-fury', url: 'https://cdn.pixabay.com/audio/2024/04/03/audio_34fb4625b1.mp3', description: 'An aggressive, high-energy death metal track featuring blast beats, distorted guitars, and a chaotic, powerful energy.', tags: ['death metal', 'metal', 'aggressive', 'chaotic'] },
  { id: 'lofi-chill', url: 'https://cdn.pixabay.com/audio/2022/02/07/audio_c9700f81a8.mp3', description: 'A calm, ambient lo-fi hip hop beat with a relaxed tempo, vinyl crackle, and a serene, melancholic mood. Perfect for studying or relaxing.', tags: ['ambient lo-fi', 'lo-fi', 'serene', 'melancholic'] },
  { id: 'baroque-elegance', url: 'https://cdn.pixabay.com/audio/2022/08/25/audio_515923b748.mp3', description: 'A sophisticated baroque classical piece featuring harpsichord and strings. It has an elegant, formal, and slightly melancholic feel.', tags: ['baroque classical', 'classical', 'serene'] },
  { id: 'psych-rock-groove', url: 'https://cdn.pixabay.com/audio/2023/04/05/audio_209a52a3ce.mp3', description: 'A groovy, psychedelic rock track with a heavy bassline, swirling guitars, and a mysterious, hypnotic vibe.', tags: ['psychedelic rock', 'rock', 'mysterious'] },
  { id: 'trap-banger', url: 'https://cdn.pixabay.com/audio/2023/11/26/audio_8f48398413.mp3', description: 'A modern trap beat with heavy 808 bass, crisp hi-hats, and an aggressive, energetic mood suitable for a blockbuster.', tags: ['trap', 'hip hop', 'aggressive'] },
  { id: 'industrial-techno-dark', url: 'https://cdn.pixabay.com/audio/2023/12/05/audio_9218d6a858.mp3', description: 'A dark, driving industrial techno track. Features distorted percussion, a relentless rhythm, and a futuristic, anxious atmosphere.', tags: ['industrial techno', 'techno', 'anxious', 'futuristic'] },
  { id: 'ambient-pads', url: 'https://cdn.pixabay.com/audio/2022/11/17/audio_8118092f7c.mp3', description: 'A serene and hopeful ambient track composed of warm, lush pads and ethereal textures. Very calm and meditative.', tags: ['ambient', 'serene', 'hopeful', 'warm pads'] },
  { id: 'city-pop-funk', url: 'https://cdn.pixabay.com/audio/2023/09/25/audio_17e3a2468d.mp3', description: 'An upbeat, funky track inspired by Japanese City Pop. Features a groovy bassline, staccato horns, and a euphoric, nostalgic feeling.', tags: ['japanese city pop', 'funk', 'euphoric', 'nostalgic'] },
  { id: 'garage-beat', url: 'https://cdn.pixabay.com/audio/2022/05/18/audio_87413532f8.mp3', description: 'A classic UK Garage beat with shuffling, syncopated drums (staccato rhythms) and a deep, melodic bassline.', tags: ['uk garage', 'electronic', 'staccato rhythms'] },
];
