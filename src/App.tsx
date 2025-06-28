import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ArtProvider } from './contexts/ArtContext';
import { LoginPage } from './components/auth/LoginPage';
import { Header } from './components/Header';
import { MoodSelector } from './components/MoodSelector';
import { StyleSelector } from './components/StyleSelector';
import { ArtCanvas } from './components/ArtCanvas';
import { Gallery } from './components/Gallery';
import { StoryGenerator } from './components/StoryGenerator';
import { ArtCollaboration } from './components/collaboration/ArtCollaboration';
import { Button } from './components/ui/Button';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { Palette, Grid, Book, Users, LogOut } from 'lucide-react';

type Tab = 'create' | 'gallery' | 'stories' | 'community';

function AppContent() {
  const { state: authState, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('create');

  // Show loading spinner while checking authentication
  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 text-lg">Loading your creative space...</p>
        </div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <ArtProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* User Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <img
                src={authState.user?.avatar}
                alt={authState.user?.name}
                className="w-10 h-10 rounded-full border-2 border-purple-200"
              />
              <div>
                <h2 className="font-semibold text-gray-800">Welcome back, {authState.user?.name}!</h2>
                <p className="text-sm text-gray-600">{authState.user?.email}</p>
              </div>
            </div>
            <Button onClick={logout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          <Header />
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-white/20">
              <Button
                variant={activeTab === 'create' ? 'primary' : 'secondary'}
                onClick={() => setActiveTab('create')}
                className="mr-1"
              >
                <Palette className="w-4 h-4 mr-2" />
                Create Art
              </Button>
              <Button
                variant={activeTab === 'gallery' ? 'primary' : 'secondary'}
                onClick={() => setActiveTab('gallery')}
                className="mr-1"
              >
                <Grid className="w-4 h-4 mr-2" />
                Gallery
              </Button>
              <Button
                variant={activeTab === 'stories' ? 'primary' : 'secondary'}
                onClick={() => setActiveTab('stories')}
                className="mr-1"
              >
                <Book className="w-4 h-4 mr-2" />
                Stories
              </Button>
              <Button
                variant={activeTab === 'community' ? 'primary' : 'secondary'}
                onClick={() => setActiveTab('community')}
              >
                <Users className="w-4 h-4 mr-2" />
                Community
              </Button>
            </div>
          </div>

          {activeTab === 'create' ? (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <MoodSelector />
                <StyleSelector />
              </div>
              <div>
                <ArtCanvas />
              </div>
            </div>
          ) : activeTab === 'gallery' ? (
            <Gallery />
          ) : activeTab === 'stories' ? (
            <StoryGenerator />
          ) : (
            <ArtCollaboration />
          )}
        </div>
      </div>
    </ArtProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;