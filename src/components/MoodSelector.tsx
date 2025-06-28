import React from 'react';
import { Heart, Wind, Zap, Eye, Cloud, Star, Mountain, Sparkles } from 'lucide-react';
import { useArt } from '../contexts/ArtContext';
import { Mood } from '../types';
import { Card } from './ui/Card';

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

export const MoodSelector: React.FC = () => {
  const { state, dispatch } = useArt();

  const handleMoodSelect = (mood: Mood) => {
    dispatch({ type: 'SET_MOOD', payload: mood });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Choose Your Mood</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(moodConfig).map(([mood, config]) => {
          const Icon = config.icon;
          const isSelected = state.selectedMood === mood;
          
          return (
            <Card
              key={mood}
              hoverable
              className={`p-4 text-center transition-all duration-300 ${
                isSelected 
                  ? 'ring-2 ring-purple-500 bg-gradient-to-br from-purple-50 to-pink-50' 
                  : 'hover:bg-gradient-to-br hover:from-gray-50 hover:to-white'
              }`}
              onClick={() => handleMoodSelect(mood as Mood)}
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
  );
};