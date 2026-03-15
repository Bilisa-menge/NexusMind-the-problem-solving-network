import React from 'react';
import { Link } from 'react-router-dom';
import { User, Post } from '../types';
import PostCard from '../components/PostCard';

interface MyChallengesProps {
  user: User;
  posts: Post[];
  onVote?: (postId: string, delta: number) => void;
}

const MyChallenges: React.FC<MyChallengesProps> = ({ user, posts, onVote }) => {
  const myPosts = posts.filter(p => p.userId === user.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-[56px] z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Challenges</h1>
              <p className="text-gray-600 mt-1">Problems you've posted and their solutions</p>
            </div>
            <Link 
              to="/"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <i className="fa-solid fa-plus"></i>
              New Challenge
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Challenges</p>
                <p className="text-2xl font-bold text-gray-900">{myPosts.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-puzzle-piece text-blue-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Solutions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {myPosts.reduce((acc, post) => acc + (post.solutions?.length || 0), 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-lightbulb text-green-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Helpful Votes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {myPosts.reduce((acc, post) => acc + post.votes, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-thumbs-up text-purple-600"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {myPosts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-puzzle-piece text-gray-400 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No challenges posted yet</h3>
              <p className="text-gray-600 mb-6">Start by posting your first problem to get help from the community.</p>
              <Link 
                to="/"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition-colors"
              >
                <i className="fa-solid fa-plus"></i>
                Post Your First Challenge
              </Link>
            </div>
          ) : (
            myPosts.map(post => (
              <PostCard key={post.id} post={post} currentUser={user} onVote={onVote} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyChallenges;
