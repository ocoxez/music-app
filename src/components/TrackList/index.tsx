import React from 'react';
import { Track } from '../../types';
import { formatTime } from '../../utils/formatters';
import './styles.css';

interface Props {
  tracks: Track[];
  currentTrackId?: number;
  onPlay: (track: Track) => void;
}

export const TrackList: React.FC<Props> = ({ tracks, currentTrackId, onPlay }) => {
  return (
    <ul className="track-list">
      {tracks.map(track => (
        <li 
          key={track.id} 
          className={`track-item ${currentTrackId === track.id ? 'active' : ''}`}
          onClick={() => onPlay(track)}
        >
          <span className="track-pos">{track.position}</span>
          <div className="track-info">
            <span className="track-title">{track.title}</span>
          </div>
          <span className="track-duration">{formatTime(track.duration)}</span>
        </li>
      ))}
    </ul>
  );
};