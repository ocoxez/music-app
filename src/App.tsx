import React, { useEffect, useState } from 'react';
import { api } from './api/client';
import { Show, Track } from './types';
import { ShowList } from './components/ShowList';
import { TrackList } from './components/TrackList';
import { Player } from './components/Player';

const App: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [activeShow, setActiveShow] = useState<Show | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getRecentShows()
      .then((res: any) => {
        console.log('Shows Response:', res);
        if (res && Array.isArray(res.shows)) {
          setShows(res.shows);
        } else if (res && Array.isArray(res.data)) {
          setShows(res.data);
        } else if (Array.isArray(res)) {
          setShows(res);
        } else {
          setShows([]);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const handleSelectShow = async (show: Show) => {
    setIsLoading(true);
    try {
      const res: any = await api.getShow(show.date); 
      console.log('Show Details Response:', res);

      if (res && res.data) {
        setActiveShow(res.data);
      } else if (res && res.date) {
        setActiveShow(res);
      } else {

        console.warn('Could not fetch details, using partial data');
        setActiveShow(show); 
      }
    } catch (e) {
      console.error("Failed to load show details", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (!currentTrack || !activeShow) return;
    const currentIndex = activeShow.tracks.findIndex(t => t.id === currentTrack.id);
    if (currentIndex < activeShow.tracks.length - 1) {
      setCurrentTrack(activeShow.tracks[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (!currentTrack || !activeShow) return;
    const currentIndex = activeShow.tracks.findIndex(t => t.id === currentTrack.id);
    if (currentIndex > 0) {
      setCurrentTrack(activeShow.tracks[currentIndex - 1]);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 onClick={() => setActiveShow(null)} style={{cursor: 'pointer'}}>
          Phish<span style={{color: 'var(--accent-color)'}}>.in</span> Player
        </h1>
        {activeShow && (
          <button className="back-button" onClick={() => setActiveShow(null)}>
            &larr; Back
          </button>
        )}
      </header>

      <main className="app-content">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : !activeShow ? (
          <ShowList shows={shows} onSelect={handleSelectShow} />
        ) : (
          <div className="show-detail-view">
            <div className="show-header">
              <h2>{activeShow.venue_name || (activeShow.venue && activeShow.venue.name)}</h2>
              <p className="venue">
              {activeShow.date}
              </p>
              <p className="location">{activeShow.location}</p>
            </div>

            {activeShow.tracks && activeShow.tracks.length > 0 ? (
              <TrackList 
                tracks={activeShow.tracks} 
                currentTrackId={currentTrack?.id} 
                onPlay={setCurrentTrack} 
              />
            ) : (
              <div style={{padding: 20, textAlign: 'center', color: '#888'}}>
                No tracks available for this show.
              </div>
            )}
          </div>
        )}
      </main>

      <Player 
        track={currentTrack} 
        onNext={handleNext} 
        onPrev={handlePrev} 
      />
    </div>
  );
};

export default App;