import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

// Initialize auth persistence before any other auth operations
export const initializeAuthPersistence = async () => {
  const auth = getAuth();
  try {
    await setPersistence(auth, browserLocalPersistence);
    console.log('Auth persistence initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize auth persistence:', error);
    return false;
  }
};

// Check if user is currently authenticated
export const isUserAuthenticated = () => {
  const auth = getAuth();
  return auth.currentUser !== null;
};

// Get current authenticated user
export const getCurrentUser = () => {
  const auth = getAuth();
  return auth.currentUser;
};
