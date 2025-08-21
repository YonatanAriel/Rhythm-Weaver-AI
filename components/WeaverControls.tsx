
import React from 'react';
import { GENRES, MOODS, TEXTURES } from '../constants';
import TagSelector from './TagSelector';
import type { Tag } from '../types';
import { WandSparklesIcon } from './icons';

interface WeaverControlsProps {
  selectedGenres: Tag[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<Tag[]>>;
  selectedMoods: Tag[];
  setSelectedMoods: React.Dispatch<React.SetStateAction<Tag[]>>;
  selectedTextures: Tag[];
  setSelectedTextures: React.Dispatch<React.SetStateAction<Tag[]>>;
  onWeave: () => void;
  isLoading: boolean;
}

const WeaverControls: React.FC<WeaverControlsProps> = ({
  selectedGenres,
  setSelectedGenres,
  selectedMoods,
  setSelectedMoods,
  selectedTextures,
  setSelectedTextures,
  onWeave,
  isLoading
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl shadow-indigo-500/10 flex flex-col gap-6">
      <TagSelector
        title="Genres"
        tags={GENRES}
        selectedTags={selectedGenres}
        onToggleTag={setSelectedGenres}
        color="fuchsia"
      />
      <TagSelector
        title="Moods"
        tags={MOODS}
        selectedTags={selectedMoods}
        onToggleTag={setSelectedMoods}
        color="cyan"
      />
      <TagSelector
        title="Textures"
        tags={TEXTURES}
        selectedTags={selectedTextures}
        onToggleTag={setSelectedTextures}
        color="lime"
      />
      <button
        onClick={onWeave}
        disabled={isLoading}
        className="w-full mt-4 flex items-center justify-center gap-3 text-lg font-bold py-4 px-6 rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 shadow-lg shadow-fuchsia-500/30"
      >
        <WandSparklesIcon className="w-6 h-6" />
        {isLoading ? 'Weaving...' : 'Weave Rhythm'}
      </button>
    </div>
  );
};

export default WeaverControls;
