import React, { useState } from 'react';
import { Users, Share2, Heart, MessageCircle, Palette, Sparkles, Upload, Search, Send, X } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface Discussion {
  id: string;
  title: string;
  author: string;
  replies: number;
  lastActivity: string;
}

interface Artist {
  id: string;
  name: string;
  avatar: string;
  artworks: number;
  followers: number;
  style: string;
}

export const ArtCollaboration: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });

  // Mock data
  const discussions: Discussion[] = [
    { id: '1', title: 'Best mood combinations for abstract art?', author: 'ArtLover23', replies: 12, lastActivity: '2 hours ago' },
    { id: '2', title: 'Tips for creating cosmic style artwork', author: 'StarGazer', replies: 8, lastActivity: '4 hours ago' },
    { id: '3', title: 'How to express melancholic feelings in art', author: 'DeepThinker', replies: 15, lastActivity: '1 day ago' },
    { id: '4', title: 'Watercolor vs Impressionist styles', author: 'ColorMaster', replies: 6, lastActivity: '2 days ago' }
  ];

  const artists: Artist[] = [
    { id: '1', name: 'Luna Artist', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', artworks: 45, followers: 234, style: 'Cosmic' },
    { id: '2', name: 'Alex Painter', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', artworks: 32, followers: 189, style: 'Abstract' },
    { id: '3', name: 'Maya Dreams', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', artworks: 67, followers: 456, style: 'Watercolor' },
    { id: '4', name: 'Neo Creator', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', artworks: 28, followers: 123, style: 'Neon' }
  ];

  const inspirationIdeas = [
    { mood: 'Happy', style: 'Abstract', idea: 'Create flowing shapes with bright yellows and oranges' },
    { mood: 'Calm', style: 'Watercolor', idea: 'Paint gentle blues and greens with soft transitions' },
    { mood: 'Mysterious', style: 'Cosmic', idea: 'Design deep space scenes with purple nebulas' },
    { mood: 'Energetic', style: 'Neon', idea: 'Make electric patterns with glowing colors' },
    { mood: 'Dreamy', style: 'Surreal', idea: 'Combine impossible elements in floating compositions' },
    { mood: 'Adventurous', style: 'Geometric', idea: 'Build mountain-like structures with bold angles' }
  ];

  const handleShareArt = () => {
    setActiveModal('share');
  };

  const handleFindArtists = () => {
    setActiveModal('artists');
  };

  const handleExploreIdeas = () => {
    setActiveModal('inspiration');
  };

  const handleJoinDiscussions = () => {
    setActiveModal('discussions');
  };

  const handleFollowArtist = async (artistId: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    // In a real app, this would update the follow status
  };

  const handleCreateDiscussion = async () => {
    if (!newDiscussion.title.trim() || !newDiscussion.content.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setNewDiscussion({ title: '', content: '' });
    setActiveModal(null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSearchTerm('');
    setNewDiscussion({ title: '', content: '' });
  };

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.style.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Art Community Hub
        </h2>
        <p className="text-gray-600 text-lg">Connect and collaborate with fellow artists worldwide</p>
      </div>

      {/* Community Features */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Share Your Art */}
        <Card className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Share2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Share Your Creations</h3>
            <p className="text-gray-600 mb-4">
              Share your AI-generated artwork with the community and get feedback from fellow artists.
            </p>
            <Button onClick={handleShareArt} variant="outline" className="w-full">
              <Share2 className="w-4 h-4 mr-2" />
              Share Artwork
            </Button>
          </div>
        </Card>

        {/* Connect with Artists */}
        <Card className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Connect with Artists</h3>
            <p className="text-gray-600 mb-4">
              Follow other artists, discover new styles, and build meaningful connections in the art community.
            </p>
            <Button onClick={handleFindArtists} variant="outline" className="w-full">
              <Users className="w-4 h-4 mr-2" />
              Find Artists
            </Button>
          </div>
        </Card>

        {/* Get Inspired */}
        <Card className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Inspired</h3>
            <p className="text-gray-600 mb-4">
              Discover new techniques, explore different moods and styles, and find inspiration for your next masterpiece.
            </p>
            <Button onClick={handleExploreIdeas} variant="outline" className="w-full">
              <Sparkles className="w-4 h-4 mr-2" />
              Explore Ideas
            </Button>
          </div>
        </Card>

        {/* Community Discussions */}
        <Card className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Join Discussions</h3>
            <p className="text-gray-600 mb-4">
              Participate in community discussions about art techniques, AI creativity, and share your experiences.
            </p>
            <Button onClick={handleJoinDiscussions} variant="outline" className="w-full">
              <MessageCircle className="w-4 h-4 mr-2" />
              Join Discussions
            </Button>
          </div>
        </Card>
      </div>

      {/* Community Stats */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Community Stats</h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-1">12,847</div>
              <div className="text-sm text-gray-600">Active Artists</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-1">89,234</div>
              <div className="text-sm text-gray-600">Artworks Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">156,789</div>
              <div className="text-sm text-gray-600">Community Likes</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Getting Started */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Palette className="w-6 h-6 mr-2 text-purple-600" />
          Getting Started in the Community
        </h3>
        <div className="space-y-3 text-gray-600">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-purple-600">1</span>
            </div>
            <p>Create your first artwork using the mood and style selectors</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-purple-600">2</span>
            </div>
            <p>Share your creation with the community to get feedback and inspiration</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-purple-600">3</span>
            </div>
            <p>Connect with other artists and explore different artistic styles and moods</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-purple-600">4</span>
            </div>
            <p>Participate in discussions and learn from the community's collective creativity</p>
          </div>
        </div>
      </Card>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {activeModal === 'share' && 'Share Your Artwork'}
                  {activeModal === 'artists' && 'Find Artists'}
                  {activeModal === 'inspiration' && 'Get Inspired'}
                  {activeModal === 'discussions' && 'Community Discussions'}
                </h3>
                <Button onClick={closeModal} variant="outline" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Share Artwork Modal */}
              {activeModal === 'share' && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Upload your artwork to share with the community</p>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="Tell us about your artwork..."
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button className="flex-1">Share Artwork</Button>
                    <Button onClick={closeModal} variant="outline">Cancel</Button>
                  </div>
                </div>
              )}

              {/* Find Artists Modal */}
              {activeModal === 'artists' && (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search artists by name or style..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredArtists.map((artist) => (
                      <div key={artist.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img
                            src={artist.avatar}
                            alt={artist.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <h4 className="font-medium text-gray-800">{artist.name}</h4>
                            <p className="text-sm text-gray-600">{artist.style} • {artist.artworks} artworks • {artist.followers} followers</p>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleFollowArtist(artist.id)}
                          disabled={isLoading}
                          size="sm"
                        >
                          {isLoading ? <LoadingSpinner size="sm" color="text-white" /> : 'Follow'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inspiration Modal */}
              {activeModal === 'inspiration' && (
                <div className="space-y-4">
                  <p className="text-gray-600">Discover new ideas for your next artwork!</p>
                  <div className="grid gap-4">
                    {inspirationIdeas.map((idea, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex space-x-2">
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">{idea.mood}</span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{idea.style}</span>
                          </div>
                          <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer" />
                        </div>
                        <p className="text-gray-700">{idea.idea}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Discussions Modal */}
              {activeModal === 'discussions' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Join ongoing discussions or start a new one!</p>
                    <Button size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      New Discussion
                    </Button>
                  </div>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {discussions.map((discussion) => (
                      <div key={discussion.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <h4 className="font-medium text-gray-800 mb-1">{discussion.title}</h4>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>by {discussion.author}</span>
                          <div className="flex items-center space-x-4">
                            <span>{discussion.replies} replies</span>
                            <span>{discussion.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};