import React, { useState } from 'react';
import { Book, Sparkles, Download, Heart, Smile, Wind, Zap, Eye, Cloud, Star, Mountain } from 'lucide-react';
import { generateStory } from '../utils/storyGenerator';
import { Story, Mood } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { LoadingSpinner } from './ui/LoadingSpinner';

const moodConfig = {
  happy: { icon: Heart, label: 'Happy', color: 'text-yellow-500', bg: 'bg-yellow-100', emoji: '😊' },
  calm: { icon: Wind, label: 'Calm', color: 'text-blue-500', bg: 'bg-blue-100', emoji: '🌊' },
  energetic: { icon: Zap, label: 'Energetic', color: 'text-orange-500', bg: 'bg-orange-100', emoji: '⚡' },
  mysterious: { icon: Eye, label: 'Mysterious', color: 'text-purple-500', bg: 'bg-purple-100', emoji: '🔮' },
  melancholic: { icon: Cloud, label: 'Melancholic', color: 'text-gray-500', bg: 'bg-gray-100', emoji: '🌧️' },
  excited: { icon: Star, label: 'Excited', color: 'text-pink-500', bg: 'bg-pink-100', emoji: '🎉' },
  adventurous: { icon: Mountain, label: 'Adventurous', color: 'text-green-500', bg: 'bg-green-100', emoji: '🗻' },
  dreamy: { icon: Sparkles, label: 'Dreamy', color: 'text-purple-400', bg: 'bg-purple-50', emoji: '✨' }
};

export const StoryGenerator: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<Mood>('happy');
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [stories, setStories] = useState<Story[]>([]);

  const handleGenerateStory = async () => {
    setIsGenerating(true);
    try {
      const story = await generateStory(selectedMood);
      setCurrentStory(story);
      setStories(prev => [story, ...prev]);
    } catch (error) {
      console.error('Error generating story:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadStory = (story: Story) => {
    const content = `${story.title}\n\n${story.content}\n\nGenerated on: ${story.createdAt.toLocaleDateString()}\nMood: ${story.mood}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${story.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Mood Selector */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Choose Your Story Mood</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(moodConfig).map(([mood, config]) => {
            const Icon = config.icon;
            const isSelected = selectedMood === mood;
            
            return (
              <Card
                key={mood}
                hoverable
                className={`p-4 text-center transition-all duration-300 ${
                  isSelected 
                    ? 'ring-2 ring-purple-500 bg-gradient-to-br from-purple-50 to-pink-50' 
                    : 'hover:bg-gradient-to-br hover:from-gray-50 hover:to-white'
                }`}
                onClick={() => setSelectedMood(mood as Mood)}
              >
                <div className={`w-12 h-12 rounded-full ${config.bg} flex items-center justify-center mx-auto mb-2 transition-transform duration-200 ${isSelected ? 'scale-110' : ''}`}>
                  <Icon className={`w-6 h-6 ${config.color}`} />
                </div>
                <div className="text-2xl mb-1">{config.emoji}</div>
                <p className={`font-medium text-sm ${isSelected ? 'text-purple-700' : 'text-gray-700'}`}>
                  {config.label}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Story Generator */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Story Generator for Kids</h3>
        <p className="text-gray-600 mb-6">Generate magical stories based on your selected mood!</p>
        
        <Button
          onClick={handleGenerateStory}
          disabled={isGenerating}
          size="lg"
          className="mb-6"
        >
          {isGenerating ? (
            <>
              <LoadingSpinner size="sm" color="text-white" />
              <span className="ml-2">Creating Story...</span>
            </>
          ) : (
            <>
              <Book className="w-5 h-5 mr-2" />
              Generate {selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} Story
            </>
          )}
        </Button>
      </div>

      {/* Current Story Display */}
      {currentStory && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-purple-700 flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              {currentStory.title}
            </h3>
            <Button
              onClick={() => handleDownloadStory(currentStory)}
              variant="outline"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {currentStory.content}
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-600">
              <span className="font-medium">Mood:</span> {currentStory.mood.charAt(0).toUpperCase() + currentStory.mood.slice(1)} • 
              <span className="font-medium ml-2">Created:</span> {currentStory.createdAt.toLocaleString()}
            </p>
          </div>
        </Card>
      )}

      {/* Loading State */}
      {isGenerating && (
        <Card className="p-8">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gray-600">Creating a magical {selectedMood} story...</p>
            <p className="text-sm text-gray-500">This might take a moment while our AI crafts something special!</p>
          </div>
        </Card>
      )}

      {/* Previous Stories */}
      {stories.length > 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Previous Stories</h3>
          <div className="grid gap-4">
            {stories.slice(1).map((story) => (
              <Card key={story.id} className="p-4" hoverable>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{story.title}</h4>
                    <p className="text-sm text-gray-500 capitalize">
                      {story.mood} • {story.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setCurrentStory(story)}
                      variant="outline"
                      size="sm"
                    >
                      Read
                    </Button>
                    <Button
                      onClick={() => handleDownloadStory(story)}
                      variant="outline"
                      size="sm"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!currentStory && !isGenerating && stories.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
            <Book className="w-12 h-12 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No stories yet</h3>
          <p className="text-gray-500">Generate your first magical story based on your mood!</p>
        </div>
      )}
    </div>
  );
};