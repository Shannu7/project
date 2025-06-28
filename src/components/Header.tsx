import React from 'react';
import { Palette, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center py-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full">
          <Palette className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          AI Mood Artist
        </h1>
        <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
      </div>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Express your emotions through AI-generated art. Choose your mood, select a style, and watch as artificial intelligence transforms your feelings into beautiful visual masterpieces.
      </p>
    </header>
  );
};