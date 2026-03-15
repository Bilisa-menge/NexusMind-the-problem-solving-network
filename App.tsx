
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './src/firebase';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Loading from './pages/Loading';
import Solutions from './pages/Solutions';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import MyChallenges from './pages/MyChallenges';
import Onboarding from './pages/OnboardingFlow';
import { User, Post } from './types';
import { INITIAL_POSTS } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);
  const [authTimeout, setAuthTimeout] = useState(false);

  useEffect(() => {
    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        console.log('Auth timeout - forcing loading to false');
        setIsLoading(false);
        setAuthTimeout(true);
      }
    }, 5000); // 5 second timeout

    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser ? `User signed in (UID: ${firebaseUser.uid})` : 'User signed out');
      clearTimeout(timeoutId); // Clear timeout if auth resolves
      
      if (firebaseUser) {
        // User is signed in, get user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            setUser(userData);
            // Cache user data for offline scenarios
            localStorage.setItem('nexusmind_user_cache', JSON.stringify(userData));
            console.log('User data loaded and cached successfully:', userData.name);
            
            // Check if user has completed onboarding
            const hasCompletedOnboarding = localStorage.getItem('nexusmind_onboarding_completed') === 'true';
            const isFirstTimeUser = !hasCompletedOnboarding;
            setShouldShowOnboarding(isFirstTimeUser);
          } else {
            console.warn('User document not found in Firestore for UID:', firebaseUser.uid);
            setUser(null);
          }
        } catch (error: any) {
          console.error('Error fetching user data:', error);
          
          // Handle specific offline error
          if (error.message && error.message.includes('client is offline')) {
            console.log('Client is offline, checking for cached user data...');
            // Try to get cached user data from localStorage as fallback
            const cachedUser = localStorage.getItem('nexusmind_user_cache');
            if (cachedUser) {
                try {
                  const parsedUser = JSON.parse(cachedUser);
                  setUser(parsedUser);
                  console.log('Using cached user data:', parsedUser.name);
                  
                  // Check if user has completed onboarding
                  const hasCompletedOnboarding = localStorage.getItem('nexusmind_onboarding_completed') === 'true';
                  const isFirstTimeUser = !hasCompletedOnboarding;
                  setShouldShowOnboarding(isFirstTimeUser);
                } catch (cacheError) {
                  console.error('Failed to parse cached user data:', cacheError);
                  setUser(null);
                }
            } else {
              setUser(null);
            }
          } else {
            setUser(null);
          }
        }
      } else {
        setUser(null);
        setShouldShowOnboarding(false);
        // Clear cached user data when user is signed out
        localStorage.removeItem('nexusmind_user_cache');
        console.log('User signed out, cache cleared');
      }
      
      // Load posts from localStorage or use initial posts
      const storedPosts = localStorage.getItem('nexus_posts');
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
      } else {
        setPosts(INITIAL_POSTS);
        localStorage.setItem('nexus_posts', JSON.stringify(INITIAL_POSTS));
      }
      
      setIsLoading(false);
    });

    // Cleanup subscription and timeout
    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    // Cache user data for offline scenarios
    localStorage.setItem('nexusmind_user_cache', JSON.stringify(newUser));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('nexusmind_user_cache');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleAddPost = (newPost: Post) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('nexus_posts', JSON.stringify(updatedPosts));
  };

  const handleVote = (postId: string, delta: number) => {
    const updatedPosts = posts.map(p => 
      p.id === postId ? { ...p, votes: p.votes + delta } : p
    );
    setPosts(updatedPosts);
    localStorage.setItem('nexus_posts', JSON.stringify(updatedPosts));
  };

  if (isLoading) return <Loading />;

  // Show error if auth timed out
  if (authTimeout) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Connection Issue</h2>
          <p className="text-gray-700 mb-6">
            We're having trouble connecting to our services. This might be due to a network issue or our services being temporarily unavailable.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Add debugging
  console.log('App state:', { user: !!user, shouldShowOnboarding, isLoading });

  return (
    <Router>
      <div className="min-h-screen">
        {user && !shouldShowOnboarding && <Navbar user={user} onLogout={handleLogout} />}
        <main className={user && !shouldShowOnboarding ? "pt-[56px]" : ""}>
          <Routes>
            <Route 
              path="/login" 
              element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
            />
            <Route 
              path="/signup" 
              element={user ? <Navigate to="/" /> : <Signup />} 
            />
            <Route 
              path="/admin" 
              element={user && user.isAdmin ? <AdminDashboard /> : <Navigate to="/" />} 
            />
            <Route 
              path="/" 
              element={!user ? <Navigate to="/login" /> : (shouldShowOnboarding ? <Navigate to="/onboarding" /> : <Feed user={user} posts={posts} onAddPost={handleAddPost} onVote={handleVote} />)} 
            />
            <Route 
              path="/profile" 
              element={user ? (shouldShowOnboarding ? <Navigate to="/onboarding" /> : <Profile user={user} posts={posts} onVote={handleVote} />) : <Navigate to="/login" />} 
            />
            <Route 
              path="/messages" 
              element={user ? (shouldShowOnboarding ? <Navigate to="/onboarding" /> : <Messages user={user} />) : <Navigate to="/login" />} 
            />
            <Route 
              path="/notifications" 
              element={user ? (shouldShowOnboarding ? <Navigate to="/onboarding" /> : <Notifications />) : <Navigate to="/login" />} 
            />
            <Route 
              path="/solutions/:postId" 
              element={user ? (shouldShowOnboarding ? <Navigate to="/onboarding" /> : <Solutions user={user} posts={posts} />) : <Navigate to="/login" />} 
            />
            <Route 
              path="/challenges" 
              element={user ? (shouldShowOnboarding ? <Navigate to="/onboarding" /> : <MyChallenges user={user} posts={posts} onVote={handleVote} />) : <Navigate to="/login" />} 
            />
            <Route 
              path="/onboarding" 
              element={!user ? <Navigate to="/login" replace /> : <Onboarding />}
            />
            
            {/* Debug Route */}
            <Route 
              path="/debug-onboarding" 
              element={<div style={{padding: '20px', background: 'red', color: 'white'}}>
                <h2>Debug Onboarding Route</h2>
                <p>User: {user ? 'Authenticated' : 'Not Authenticated'}</p>
                <p>Should Show Onboarding: {shouldShowOnboarding ? 'Yes' : 'No'}</p>
                <button onClick={() => {
                  console.log('Manual navigate to onboarding');
                  navigate('/onboarding');
                }}>Go to Onboarding</button>
              </div>}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
