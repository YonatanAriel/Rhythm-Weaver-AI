
import React from 'react';
import { RefreshCwIcon } from './icons';

interface HeaderProps {
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="flex justify-between items-center pb-4 border-b border-white/10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-lime-400">
          Rhythm Weaver AI
        </h1>
        <p className="text-gray-400 mt-1 text-sm sm:text-base">
          Fuse Sounds, Forge Futures: Your AI-Powered Music Genesis.
        </p>
      </div>
      <button 
        onClick={onReset}
        className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-200 text-cyan-400 hover:text-white"
        title="Start Over"
      >
        <RefreshCwIcon className="w-5 h-5" />
      </button>
    </header>
  );
};

export default Header;
