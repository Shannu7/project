import React from 'react';
import { Shapes, Brush, Square, Waves, Grid, Droplets, Triangle, Sparkles, Zap, Camera } from 'lucide-react';
import { useArt } from '../contexts/ArtContext';
import { ArtStyle } from '../types';
import { Card } from './ui/Card';

const styleConfig = {
  abstract: { 
    icon: Shapes, 
    label: 'Abstract', 
    description: 'Fluid forms and vibrant colors',
    color: 'text-purple-600',
    emoji: '🎨'
  },
  impressionist: { 
    icon: Brush, 
    label: 'Impressionist', 
    description: 'Soft brushstrokes and light play',
    color: 'text-blue-600',
    emoji: '🖌️'
  },
  minimalist: { 
    icon: Square, 
    label: 'Minimalist', 
    description: 'Clean lines and simple forms',
    color: 'text-green-600',
    emoji: '⬜'
  },
  surreal: { 
    icon: Waves, 
    label: 'Surreal', 
    description: 'Dreamlike and imaginative',
    color: 'text-pink-600',
    emoji: '🌀'
  },
  pixel: {
    icon: Grid,
    label: 'Pixel Art',
    description: 'Retro 8-bit style graphics',
    color: 'text-red-600',
    emoji: '🎮'
  },
  watercolor: {
    icon: Droplets,
    label: 'Watercolor',
    description: 'Soft, flowing paint effects',
    color: 'text-cyan-600',
    emoji: '💧'
  },
  geometric: {
    icon: Triangle,
    label: 'Geometric',
    description: 'Sharp angles and patterns',
    color: 'text-orange-600',
    emoji: '🔺'
  },
  cosmic: {
    icon: Sparkles,
    label: 'Cosmic',
    description: 'Space-themed stellar art',
    color: 'text-indigo-600',
    emoji: '🌌'
  },
  neon: {
    icon: Zap,
    label: 'Neon',
    description: 'Glowing cyberpunk aesthetics',
    color: 'text-yellow-600',
    emoji: '⚡'
  },
  vintage: {
    icon: Camera,
    label: 'Vintage',
    description: 'Classic retro styling',
    color: 'text-amber-600',
    emoji: '📷'
  }
};

export const StyleSelector: React.FC = () => {
  const { state, dispatch } = useArt();

  const handleStyleSelect = (style: ArtStyle) => {
    dispatch({ type: 'SET_STYLE', payload: style });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Select Art Style</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(styleConfig).map(([style, config]) => {
          const Icon = config.icon;
          const isSelected = state.selectedStyle === style;
          
          return (
            <Card
              key={style}
              hoverable
              className={`p-4 transition-all duration-300 ${
                isSelected 
                  ? 'ring-2 ring-purple-500 bg-gradient-to-br from-purple-50 to-pink-50' 
                  : 'hover:bg-gradient-to-br hover:from-gray-50 hover:to-white'
              }`}
              onClick={() => handleStyleSelect(style as ArtStyle)}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center transition-transform duration-200 ${isSelected ? 'scale-110' : ''}`}>
                  <Icon className={`w-6 h-6 ${config.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-semibold text-lg ${isSelected ? 'text-purple-700' : 'text-gray-800'}`}>
                      {config.label}
                    </h3>
                    <span className="text-xl">{config.emoji}</span>
                  </div>
                  <p className="text-sm text-gray-600">{config.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};