export interface Tag {
  id: string;
  name: string;
}

export interface Track {
  instrument: string;
  description: string;
}

export interface Song {
  title: string;
  bpm: number;
  key: string;
  summary: string;
  tracks: Track[];
}

export interface AudioTrack {
  id: string;
  url: string;
  description: string;
  tags: string[];
}

export enum LoadingState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export enum AudioState {
  IDLE = 'idle',
  GENERATING = 'generating',
  READY = 'ready',
  ERROR = 'error'
}