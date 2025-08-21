
import React from 'react';
import { MusicIcon } from './icons';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 text-cyan-400">
      <div className="relative flex items-center justify-center w-24 h-24">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></span>
        ))}
        <MusicIcon className="w-12 h-12 text-white z-10" />
      </div>
      <h2 className="text-xl font-bold animate-pulse">Weaving your rhythm...</h2>
      <p className="text-gray-400 max-w-xs">The AI is fusing genres, moods, and textures into a unique composition.</p>
    </div>
  );
};

export default Loader;
