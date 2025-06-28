import React, { useState } from 'react';
import { Download, Sparkles, RefreshCw } from 'lucide-react';
import { useArt } from '../contexts/ArtContext';
import { useArtGeneration } from '../hooks/useArtGeneration';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { LoadingSpinner } from './ui/LoadingSpinner';

export const ArtCanvas: React.FC = () => {
  const { state } = useArt();
  const { generateNewArt, isGenerating } = useArtGeneration();
  const [customPrompt, setCustomPrompt] = useState('');

  const handleGenerate = () => {
    generateNewArt(customPrompt || undefined);
    setCustomPrompt('');
  };

  const handleDownload = () => {
    if (state.currentArt) {
      const link = document.createElement('a');
      link.download = `mood-art-${state.currentArt.id}.png`;
      link.href = state.currentArt.imageData;
      link.click();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Generate Your Art</h2>
        
        <div className="max-w-md mx-auto mb-6">
          <input
            type="text"
            placeholder="Add custom prompt (optional)"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={isGenerating}
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          size="lg"
          className="mb-6"
        >
          {isGenerating ? (
            <>
              <LoadingSpinner size="sm" color="text-white" />
              <span className="ml-2">Creating Art...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Art
            </>
          )}
        </Button>
      </div>

      <Card className="p-6">
        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
          {isGenerating ? (
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-gray-600">Creating your {state.selectedStyle} artwork...</p>
              <p className="text-sm text-gray-500">Mood: {state.selectedMood}</p>
            </div>
          ) : state.currentArt ? (
            <div className="w-full h-full relative group">
              <img
                src={state.currentArt.imageData}
                alt={state.currentArt.prompt}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button
                  onClick={handleDownload}
                  variant="secondary"
                  className="transform scale-95 group-hover:scale-100 transition-transform duration-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Click "Generate Art" to create your first masterpiece</p>
              <p className="text-sm">Currently set to: {state.selectedStyle} style with {state.selectedMood} mood</p>
            </div>
          )}
        </div>

        {state.currentArt && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Artwork Details</h3>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Style:</span> {state.currentArt.style}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Mood:</span> {state.currentArt.mood}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Prompt:</span> {state.currentArt.prompt}
            </p>
            <p className="text-xs text-gray-500">
              Created: {state.currentArt.createdAt.toLocaleString()}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};