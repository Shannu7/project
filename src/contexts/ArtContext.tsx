import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ArtPiece, Mood, ArtStyle } from '../types';

interface ArtState {
  gallery: ArtPiece[];
  currentArt: ArtPiece | null;
  isGenerating: boolean;
  selectedMood: Mood;
  selectedStyle: ArtStyle;
}

type ArtAction =
  | { type: 'SET_MOOD'; payload: Mood }
  | { type: 'SET_STYLE'; payload: ArtStyle }
  | { type: 'START_GENERATION' }
  | { type: 'ADD_ART_PIECE'; payload: ArtPiece }
  | { type: 'SET_CURRENT_ART'; payload: ArtPiece | null }
  | { type: 'REMOVE_ART_PIECE'; payload: string };

const initialState: ArtState = {
  gallery: [],
  currentArt: null,
  isGenerating: false,
  selectedMood: 'happy',
  selectedStyle: 'abstract'
};

const artReducer = (state: ArtState, action: ArtAction): ArtState => {
  switch (action.type) {
    case 'SET_MOOD':
      return { ...state, selectedMood: action.payload };
    case 'SET_STYLE':
      return { ...state, selectedStyle: action.payload };
    case 'START_GENERATION':
      return { ...state, isGenerating: true };
    case 'ADD_ART_PIECE':
      return {
        ...state,
        gallery: [action.payload, ...state.gallery],
        currentArt: action.payload,
        isGenerating: false
      };
    case 'SET_CURRENT_ART':
      return { ...state, currentArt: action.payload };
    case 'REMOVE_ART_PIECE':
      return {
        ...state,
        gallery: state.gallery.filter(art => art.id !== action.payload),
        currentArt: state.currentArt?.id === action.payload ? null : state.currentArt
      };
    default:
      return state;
  }
};

const ArtContext = createContext<{
  state: ArtState;
  dispatch: React.Dispatch<ArtAction>;
} | undefined>(undefined);

export const ArtProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(artReducer, initialState);

  return (
    <ArtContext.Provider value={{ state, dispatch }}>
      {children}
    </ArtContext.Provider>
  );
};

export const useArt = () => {
  const context = useContext(ArtContext);
  if (context === undefined) {
    throw new Error('useArt must be used within an ArtProvider');
  }
  return context;
};