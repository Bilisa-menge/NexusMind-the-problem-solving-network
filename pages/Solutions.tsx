import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Post, User, Solution, Reply } from '../types';

interface SolutionsProps {
  user: User;
  posts: Post[];
}

const Solutions: React.FC<SolutionsProps> = ({ user, posts }) => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [newSolution, setNewSolution] = useState('');
  const [helpfulSolutions, setHelpfulSolutions] = useState<Set<string>>(new Set());
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());

  const post = posts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h2>
          <button 
            onClick={() => navigate('/')}
            className="text-blue-500 hover:underline"
          >
            Go back to feed
          </button>
        </div>
      </div>
    );
  }

  const handleAddSolution = () => {
    if (!newSolution.trim()) return;
    
    const solution: Solution = {
      id: Math.random().toString(36).substring(2, 11),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      text: newSolution,
      timestamp: Date.now(),
      upvotes: 0
    };

    post.solutions.push(solution);
    setNewSolution('');
  };

  const handleHelpful = (solutionId: string) => {
    setHelpfulSolutions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(solutionId)) {
        newSet.delete(solutionId);
        setHelpfulCounts(counts => ({
          ...counts,
          [solutionId]: Math.max(0, (counts[solutionId] || 0) - 1)
        }));
      } else {
        newSet.add(solutionId);
        setHelpfulCounts(counts => ({
          ...counts,
          [solutionId]: (counts[solutionId] || 0) + 1
        }));
      }
      return newSet;
    });
  };

  const handleReply = (solutionId: string) => {
    setReplyingTo(solutionId === replyingTo ? null : solutionId);
    setReplyText('');
  };

  const handleAddReply = (solutionId: string) => {
    if (!replyText.trim()) return;
    
    const solution = post.solutions.find(s => s.id === solutionId);
    if (solution) {
      if (!solution.replies) {
        solution.replies = [];
      }
      solution.replies.push({
        id: Math.random().toString(36).substring(2, 11),
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        text: replyText,
        timestamp: Date.now()
      });
    }
    
    setReplyText('');
    setReplyingTo(null);
    // Auto-expand replies when a new reply is added
    setExpandedReplies(prev => new Set(prev).add(solutionId));
  };

  const toggleReplies = (solutionId: string) => {
    setExpandedReplies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(solutionId)) {
        newSet.delete(solutionId);
      } else {
        newSet.add(solutionId);
      }
      return newSet;
    });
  };

  const formatDate = (ts: number) => {
    const diff = Date.now() - ts;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff/60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff/3600000)}h ago`;
    return new Date(ts).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')}
              className="text-gray-600 hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <h1 className="text-xl font-semibold">Solutions</h1>
          </div>
          <div className="text-sm text-gray-500">
            {post.solutions.length} {post.solutions.length === 1 ? 'solution' : 'solutions'}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Original Post */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <img src={post.userAvatar} className="w-10 h-10 rounded-full object-cover" alt={post.userName} />
            <div>
              <h3 className="font-semibold">{post.userName}</h3>
              <p className="text-gray-500 text-sm">{formatDate(post.timestamp)}</p>
            </div>
          </div>
          {post.title && <h2 className="font-bold text-lg mb-2">{post.title}</h2>}
          <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
          {post.imageUrl && (
            <img src={post.imageUrl} className="w-full rounded-lg mt-3 max-h-[400px] object-cover" alt="Post content" />
          )}
        </div>

        {/* Solutions Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-lg">All Solutions</h3>
          </div>
          
          {/* Solutions List */}
          <div className="divide-y divide-gray-100">
            {post.solutions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <i className="fa-regular fa-comment text-4xl mb-3 block"></i>
                <p>No solutions yet. Be the first to suggest one!</p>
              </div>
            ) : (
              post.solutions.map(sol => (
                <div key={sol.id} className="p-4 hover:bg-gray-50">
                  <div className="flex gap-3">
                    <img src={sol.userAvatar} className="w-10 h-10 rounded-full" alt={sol.userName} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold">{sol.userName}</h4>
                        <span className="text-gray-500 text-sm">{formatDate(sol.timestamp)}</span>
                      </div>
                      <p className="text-gray-800 mb-2">{sol.text}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <button 
                          onClick={() => handleHelpful(sol.id)}
                          className={`flex items-center gap-1 ${helpfulSolutions.has(sol.id) ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
                        >
                          <i className={`${helpfulSolutions.has(sol.id) ? 'fa-solid' : 'fa-regular'} fa-thumbs-up`}></i>
                          <span>Helpful {helpfulCounts[sol.id] || 0}</span>
                        </button>
                        <button 
                          onClick={() => handleReply(sol.id)}
                          className="flex items-center gap-1 text-gray-500 hover:text-blue-500"
                        >
                          <i className="fa-regular fa-comment"></i>
                          <span>Reply</span>
                        </button>
                        {sol.replies && sol.replies.length > 0 && (
                          <button 
                            onClick={() => toggleReplies(sol.id)}
                            className="flex items-center gap-1 text-gray-500 hover:text-blue-500"
                          >
                            <i className="fa-regular fa-comments"></i>
                            <span>Replies ({sol.replies.length})</span>
                          </button>
                        )}
                      </div>
                      
                      {/* Reply Section */}
                      {replyingTo === sol.id && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex gap-2">
                            <img src={user.avatar} className="w-8 h-8 rounded-full" alt={user.name} />
                            <div className="flex-1">
                              <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Write a reply..."
                                className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={2}
                              />
                              <div className="flex justify-end gap-2 mt-2">
                                <button
                                  onClick={() => handleReply(sol.id)}
                                  className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-lg text-sm"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleAddReply(sol.id)}
                                  disabled={!replyText.trim()}
                                  className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                >
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Display Replies */}
                      {sol.replies && sol.replies.length > 0 && expandedReplies.has(sol.id) && (
                        <div className="mt-3 space-y-2">
                          {sol.replies.map(reply => (
                            <div key={reply.id} className="flex gap-2 p-2 bg-gray-50 rounded-lg">
                              <img src={reply.userAvatar} className="w-6 h-6 rounded-full" alt={reply.userName} />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-sm">{reply.userName}</span>
                                  <span className="text-gray-500 text-xs">{formatDate(reply.timestamp)}</span>
                                </div>
                                <p className="text-gray-700 text-sm mt-1">{reply.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add Solution Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-3">
              <img src={user.avatar} className="w-10 h-10 rounded-full" alt={user.name} />
              <div className="flex-1">
                <textarea
                  value={newSolution}
                  onChange={(e) => setNewSolution(e.target.value)}
                  placeholder="Write your solution..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-2 text-gray-500">
                    <button className="hover:bg-gray-100 p-2 rounded">
                      <i className="fa-regular fa-face-smile"></i>
                    </button>
                    <button className="hover:bg-gray-100 p-2 rounded">
                      <i className="fa-solid fa-camera"></i>
                    </button>
                  </div>
                  <button
                    onClick={handleAddSolution}
                    disabled={!newSolution.trim()}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Post Solution
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
