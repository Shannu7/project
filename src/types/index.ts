export type Mood = 'happy' | 'calm' | 'energetic' | 'mysterious' | 'melancholic' | 'excited' | 'adventurous' | 'dreamy';

export type ArtStyle = 'abstract' | 'impressionist' | 'minimalist' | 'surreal' | 'pixel' | 'watercolor' | 'geometric' | 'cosmic' | 'neon' | 'vintage';

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export interface ArtPiece {
  id: string;
  mood: Mood;
  style: ArtStyle;
  palette: ColorPalette;
  prompt: string;
  createdAt: Date;
  imageData: string;
}

export interface GenerationConfig {
  mood: Mood;
  style: ArtStyle;
  customPrompt?: string;
}

export interface Story {
  id: string;
  mood: Mood;
  title: string;
  content: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  detectedEmotion?: string;
  confidence?: number;
}

export interface EmotionAnalysis {
  emotion: string;
  confidence: number;
  suggestions: string[];
}