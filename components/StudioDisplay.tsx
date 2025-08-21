import React, { useState } from 'react';
import type { Song } from '../types';
import { AudioState } from '../types';
import { ClipboardIcon, Music4Icon, Music2Icon } from './icons';
import VariationSuggestions from './VariationSuggestions';
import AudioPlayer from './AudioPlayer';

interface StudioDisplayProps {
  song: Song;
  onGenerateVariation: (variation: string) => void;
  getSuggestions: (summary: string) => Promise<string[]>;
  audioState: AudioState;
  audioUrl: string | null;
  onGenerateAudio: () => void;
}

const StudioDisplay: React.FC<StudioDisplayProps> = ({ song, onGenerateVariation, getSuggestions, audioState, audioUrl, onGenerateAudio }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    const textToCopy = `Title: ${song.title}\nBPM: ${song.bpm}\nKey: ${song.key}\n\nSummary:\n${song.summary}\n\nTracks:\n${song.tracks.map(t => `- ${t.instrument}: ${t.description}`).join('\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderAudioSection = () => {
    switch(audioState) {
        case AudioState.IDLE:
        case AudioState.ERROR:
             return (
                 <>
                    <button 
                        onClick={onGenerateAudio}
                        className="w-full mt-4 flex items-center justify-center gap-3 text-lg font-bold py-3 px-6 rounded-xl bg-gradient-to-r from-lime-600 to-green-500 text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 shadow-lg shadow-lime-500/30"
                    >
                        <Music2Icon className="w-6 h-6" />
                        Generate Audio Preview
                    </button>
                    {audioState === AudioState.ERROR && <p className="text-red-400 text-xs text-center mt-2">Audio generation failed. Please try again.</p>}
                </>
             );
        case AudioState.GENERATING:
            return (
                <div className="w-full mt-4 text-center p-4 bg-white/5 rounded-lg">
                    <p className="font-bold animate-pulse text-lime-400">Synthesizing Audio...</p>
                    <p className="text-xs text-gray-400 mt-1">Our AI is composing a unique track for you. This may take a moment.</p>
                </div>
            );
        case AudioState.READY:
            if (audioUrl) {
                return <AudioPlayer audioUrl={audioUrl} songTitle={song.title} />;
            }
            return null;
        default:
            return null;
    }
  }
  
  return (
    <div className="w-full h-full flex flex-col animate-fade-in text-left">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-extrabold text-white">{song.title}</h2>
          <div className="flex items-center gap-4 text-gray-400 mt-2">
            <span>{song.bpm} BPM</span>
            <span>•</span>
            <span>{song.key}</span>
          </div>
        </div>
        <button onClick={handleCopyToClipboard} className="text-gray-400 hover:text-white transition-colors p-2 -mr-2">
          {copied ? <span className="text-xs text-lime-400">Copied!</span> : <ClipboardIcon className="w-5 h-5" />}
        </button>
      </div>
      
      <p className="mt-4 text-gray-300 leading-relaxed text-base">{song.summary}</p>
      
      <div className="my-6">
        {renderAudioSection()}
      </div>

      <div className="mt-2 flex-grow overflow-y-auto pr-2 -mr-2 space-y-3" style={{maxHeight: '20vh'}}>
        {song.tracks.map((track, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
            <div className="p-2 bg-gradient-to-br from-fuchsia-500 to-cyan-500 rounded-md">
              <Music4Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-white">{track.instrument}</h4>
              <p className="text-sm text-gray-400">{track.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-auto pt-6">
        <VariationSuggestions
          songSummary={song.summary}
          onGenerateVariation={onGenerateVariation}
          getSuggestions={getSuggestions}
        />
      </div>
    </div>
  );
};

export default StudioDisplay;
