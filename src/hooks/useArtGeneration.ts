import { useCallback } from 'react';
import { useArt } from '../contexts/ArtContext';
import { generateArt, createArtPiece } from '../utils/artGenerator';

export const useArtGeneration = () => {
  const { state, dispatch } = useArt();

  const generateNewArt = useCallback(async (customPrompt?: string) => {
    dispatch({ type: 'START_GENERATION' });
    
    try {
      const imageData = await generateArt(state.selectedMood, state.selectedStyle, customPrompt);
      const artPiece = createArtPiece(state.selectedMood, state.selectedStyle, imageData, customPrompt);
      
      dispatch({ type: 'ADD_ART_PIECE', payload: artPiece });
    } catch (error) {
      console.error('Error generating art:', error);
      // In a real app, you'd handle this error properly
    }
  }, [state.selectedMood, state.selectedStyle, dispatch]);

  return {
    generateNewArt,
    isGenerating: state.isGenerating
  };
};