import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../src/firebase';
import { User } from '../types';
import NexusMindLogo from '../components/NexusMindLogo';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login with email:', email);
      
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log('Firebase sign-in successful, UID:', user.uid);

      // Get user data from Firestore with retry logic
      let userDoc;
      let retryCount = 0;
      const maxRetries = 3;
      
      while (retryCount < maxRetries) {
        try {
          userDoc = await getDoc(doc(db, 'users', user.uid));
          console.log('User document fetched successfully');
          break;
        } catch (fetchError: any) {
          retryCount++;
          if (fetchError.message && fetchError.message.includes('client is offline')) {
            if (retryCount < maxRetries) {
              console.log(`Retry ${retryCount}/${maxRetries} for fetching user data...`);
              await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
            } else {
              throw new Error('Connection failed. Please check your internet connection and try again.');
            }
          } else {
            throw fetchError;
          }
        }
      }

      if (userDoc && userDoc.exists()) {
        const userData = userDoc.data() as User;
        console.log('User data loaded, calling onLogin callback');
        onLogin(userData);
      } else {
        setError('User data not found. Please sign up again.');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Provide more user-friendly error messages
      if (error.message && error.message.includes('client is offline')) {
        setError('Unable to connect. Please check your internet connection and try again.');
      } else if (error.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError(error.message || 'An error occurred during login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[1000px] flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-8 pt-12 lg:pt-20">
        
        {/* Left Branding */}
        <div className="flex-1 text-center lg:text-left pt-16 lg:pt-24 flex flex-col items-center lg:items-start">
          <NexusMindLogo size={80} className="mb-4" />
          <h1 className="text-[#1877F2] text-6xl font-bold mb-4 tracking-tighter">NexusMind</h1>
          <p className="text-2xl font-medium leading-tight max-w-[500px]">
            Every problem has a solver. Connect with experts to share and tackle challenges together.
          </p>
        </div>

        {/* Right Form */}
        <div className="w-full max-w-[400px]">
          <div className="bg-white px-6 pt-6 pb-4 shadow-xl rounded-xl">
            <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="email" 
                placeholder="Email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-[17px]"
                required
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-[17px]"
                required
              />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#1877F2] hover:bg-blue-600 text-white font-bold py-3 rounded-lg text-xl transition-colors disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
              <div className="text-center">
                <a href="#" className="text-blue-500 text-sm hover:underline">Forgotten password?</a>
              </div>
              <hr />
              <div className="text-center pt-2 pb-1">
                <button 
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="bg-[#42B72A] hover:bg-[#36a420] text-white font-bold px-4 py-3 rounded-lg text-[17px] transition-colors"
                >
                  Create New Account
                </button>
              </div>
            </form>
          </div>
          <p className="text-center mt-6 text-sm">
            <b>Create a Page</b> for a celebrity, brand or business.
          </p>
        </div>
      </div>

      <footer className="mt-auto py-10 w-full max-w-[1000px] text-gray-500 text-xs">
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-2">
          <span>English (UK)</span>
          <span>Hausa</span>
          <span>Afaan Oromoo</span>
          <span>Amharic</span>
          <span>العربية</span>
          <span>Français (France)</span>
        </div>
        <hr className="my-2" />
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <span>Sign Up</span>
          <span>Log In</span>
          <span>Messages</span>
          <span>NexusMind Mobile</span>
          <span>Video</span>
          <span>Experts</span>
          <span>Challenges</span>
          <span>Solutions Hub</span>
          <span>NexusMind Credits</span>
          <span>Resources</span>
          <span>NexusMind Labs</span>
          <span>Community</span>
        </div>
        <p className="mt-4">NexusMind © 2026</p>
      </footer>
    </div>
  );
};

export default Login;