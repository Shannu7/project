import React from 'react';
import { Trash2, Download, Eye } from 'lucide-react';
import { useArt } from '../contexts/ArtContext';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

export const Gallery: React.FC = () => {
  const { state, dispatch } = useArt();

  const handleView = (artId: string) => {
    const art = state.gallery.find(a => a.id === artId);
    if (art) {
      dispatch({ type: 'SET_CURRENT_ART', payload: art });
    }
  };

  const handleDownload = (art: any, event: React.MouseEvent) => {
    event.stopPropagation();
    const link = document.createElement('a');
    link.download = `mood-art-${art.id}.png`;
    link.href = art.imageData;
    link.click();
  };

  const handleDelete = (artId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch({ type: 'REMOVE_ART_PIECE', payload: artId });
  };

  if (state.gallery.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
          <Eye className="w-12 h-12 text-purple-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No artwork yet</h3>
        <p className="text-gray-500">Generate your first AI artwork to start building your gallery</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Your Art Gallery</h2>
        <p className="text-gray-600">{state.gallery.length} masterpiece{state.gallery.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.gallery.map((art) => (
          <Card
            key={art.id}
            hoverable
            className="p-4 group"
            onClick={() => handleView(art.id)}
          >
            <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
              <img
                src={art.imageData}
                alt={art.prompt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <Button
                    onClick={(e) => handleDownload(art, e)}
                    variant="secondary"
                    size="sm"
                    className="bg-white/90 hover:bg-white text-gray-800"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={(e) => handleDelete(art.id, e)}
                    variant="secondary"
                    size="sm"
                    className="bg-red-500/90 hover:bg-red-500 text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-purple-600 capitalize">
                  {art.style}
                </span>
                <span className="text-sm text-gray-500 capitalize">
                  {art.mood}
                </span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">
                {art.prompt}
              </p>
              <p className="text-xs text-gray-400">
                {art.createdAt.toLocaleDateString()}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};