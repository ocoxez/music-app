import React, { useRef, useEffect, useState } from 'react';
import { Track } from '../../types';
import { formatSecondsToTime } from '../../utils/formatters';
import './styles.css';

interface Props {
  track: Track | null;
  onNext: () => void;
  onPrev: () => void;
}

export const Player: React.FC<Props> = ({ track, onNext, onPrev }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);


  useEffect(() => {
    if (track && audioRef.current) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          if (error.name !== 'AbortError') {
            console.error("Playback error:", error);
            setIsPlaying(false);
          }
        });
      }
    }
  }, [track]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (audioRef.current.paused) {
      audioRef.current.play().catch(e => console.error("Play failed", e));
    } else {
      audioRef.current.pause();
    }
  };

  if (!track) return null;

  return (
    <div className="player-bar">
      <div className="track-info-compact">
        <strong>{track.title}</strong>
      </div>
      
      <div className="controls">
        <button onClick={onPrev} className="control-btn">⏮</button>
        <button onClick={togglePlay} className="play-btn">
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <button onClick={onNext} className="control-btn">⏭</button>
      </div>

      <div className="progress-container">
        <span className="time-label">{formatSecondsToTime(progress)}</span>
        <input 
          type="range" 
          min={0} 
          max={duration || 0} 
          value={progress}
          onChange={(e) => {
            if(audioRef.current) {
                audioRef.current.currentTime = Number(e.target.value);
            }
          }}
          className="seek-slider"
        />
        <span className="time-label">{formatSecondsToTime(duration)}</span>
      </div>

      <audio 
        ref={audioRef}
        src={track.mp3}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={onNext}
      />
    </div>
  );
};