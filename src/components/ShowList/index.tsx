import React from 'react';
import { Show } from '../../types';
import './styles.css';

interface Props {
  shows: Show[];
  onSelect: (id: number) => void;
}

export const ShowList: React.FC<Props> = ({ shows, onSelect }) => {
  return (
    <div className="shows-grid">
      {shows.map(show => (
        <div key={show.id} className="show-card" onClick={() => onSelect(show.id)}>
          <div className="show-date">{show.date}</div>
          <div className="show-venue">
            {show.venue_name || show.venue?.name || 'Unknown Venue'}
          </div>
          <div className="show-location">{show.location}</div>
        </div>
      ))}
    </div>
  );
};