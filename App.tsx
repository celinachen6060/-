import React, { useState } from 'react';
import { ViewState, JournalEntry } from './types';
import { NavBar } from './components/NavBar';
import { HomeView } from './components/HomeView';
import { JournalView } from './components/JournalView';
import { CommunityView } from './components/CommunityView';
import { EntryDetailView } from './components/EntryDetailView';
import { AddEntryView } from './components/AddEntryView';
import { ProfileView } from './components/ProfileView';
import { LibraryView } from './components/LibraryView';
import { FlipbookView } from './components/FlipbookView';
import { MOCK_ENTRIES } from './constants';

const App: React.FC = () => {
  // Initial View is now COMMUNITY (Square/Plaza)
  const [currentView, setView] = useState<ViewState>(ViewState.COMMUNITY);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>(MOCK_ENTRIES);

  const handleSelectEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setView(ViewState.ENTRY_DETAIL);
  };

  const handleSaveEntry = (imageUrl: string, caption: string) => {
      const newEntry: JournalEntry = {
          id: Date.now().toString(),
          date: new Date().toISOString().split('T')[0],
          imageUrl,
          caption
      };
      setEntries([newEntry, ...entries]);
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <HomeView setView={setView} onSelectEntry={handleSelectEntry} />;
      case ViewState.JOURNAL:
        return <JournalView setView={setView} onSelectEntry={handleSelectEntry} />;
      case ViewState.ENTRY_DETAIL:
        return selectedEntry ? <EntryDetailView entry={selectedEntry} setView={setView} /> : <JournalView setView={setView} onSelectEntry={handleSelectEntry} />;
      case ViewState.COMMUNITY:
        return <CommunityView setView={setView} />;
      case ViewState.PROFILE:
        return <ProfileView setView={setView} />;
      case ViewState.ADD_ENTRY:
        return <AddEntryView setView={setView} onSave={handleSaveEntry} />;
      case ViewState.LIBRARY:
        return <LibraryView setView={setView} />;
      case ViewState.FLIPBOOK:
        return <FlipbookView setView={setView} />;
      default:
        return <CommunityView setView={setView} />;
    }
  };

  return (
    <div className="relative w-full h-screen max-w-md mx-auto overflow-hidden shadow-2xl bg-black">
      {/* View Container */}
      <div className="w-full h-full transition-opacity duration-300">
        {renderView()}
      </div>

      {/* Persistent Navigation */}
      {/* Show NavBar on Home, Community, and Journal. Hide on others. */}
      {(currentView === ViewState.HOME || currentView === ViewState.COMMUNITY || currentView === ViewState.JOURNAL) && (
        <NavBar currentView={currentView} setView={setView} />
      )}
    </div>
  );
};

export default App;