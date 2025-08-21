import React, { useState, useRef, useEffect } from 'react';
import { PlayIcon, PauseIcon, DownloadIcon, Volume2Icon } from './icons';

interface AudioPlayerProps {
  audioUrl: string;
  songTitle: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, songTitle }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      if (isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
      setCurrentTime(audio.currentTime);
    }

    const setAudioTime = () => setCurrentTime(audio.currentTime);
    
    // When a new URL is provided, reset the player state
    setIsPlaying(false);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('durationchange', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('durationchange', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    }
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // This play() call is a direct result of a user click, so it's allowed by browsers.
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    if(audioRef.current) {
        audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const safeSongTitle = songTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase();

  return (
    <div className="w-full bg-white/10 p-4 rounded-lg flex flex-col gap-3 animate-fade-in">
       <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} loop></audio>
      <div className="flex items-center gap-4">
        <button onClick={togglePlayPause} className="p-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-400 transition-colors shrink-0">
            {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
        </button>
        <div className="flex-grow flex items-center gap-2">
            <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
            <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleProgressChange}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer range-sm"
                style={{
                    background: `linear-gradient(to right, #22d3ee ${ (currentTime / duration) * 100 }%, #ffffff33 ${ (currentTime / duration) * 100 }%)`
                }}
            />
            <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
        </div>
      </div>
       <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 w-32">
                <Volume2Icon className="w-5 h-5 text-gray-400" />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer range-sm"
                     style={{
                        background: `linear-gradient(to right, #22d3ee ${volume * 100}%, #ffffff33 ${volume * 100}%)`
                    }}
                />
            </div>
            <a href={audioUrl} download={`${safeSongTitle}.mp3`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-lime-500/20 text-lime-400 border border-lime-500 rounded-full hover:bg-lime-500/30 transition-colors">
                <DownloadIcon className="w-3 h-3" />
                Export MP3
            </a>
       </div>
    </div>
  );
};

export default AudioPlayer;