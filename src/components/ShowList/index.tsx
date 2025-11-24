import React from 'react';
import { Show } from '../../types';
import './styles.css';

interface Props {
  shows: Show[];
  onSelect: (show: Show) => void; 
}

export const ShowList: React.FC<Props> = ({ shows, onSelect }) => {
  if (!Array.isArray(shows)) {
    return <div style={{ padding: 20 }}>No shows available</div>;
  }

  return (
    <div className="shows-grid">
      {shows.map(show => (
        <div key={show.id} className="show-card" onClick={() => onSelect(show)}>
          <div className="show-date">{show.venue_name || (show.venue && show.venue.name) || 'Unknown Venue'}</div>
          <div className="show-venue">
            {show.date}
          </div>
          <div className="show-location">{show.location}</div>
        </div>
      ))}
    </div>
  );
};