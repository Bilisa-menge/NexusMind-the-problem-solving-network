import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../src/firebase';
import { User } from '../types';

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState({ day: '', month: '', year: '' });
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!firstName || !lastName || !email || !password || !birthday.day || !birthday.month || !birthday.year || !gender) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Upload profile image if provided
      let avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName + ' ' + lastName)}&background=random`;
      if (profileImage) {
        // For now, we'll use a data URL. In production, you'd upload to a storage service
        avatarUrl = imagePreview;
      }

      const fullName = `${firstName} ${lastName}`;

      // Update user profile with name
      await updateProfile(user, {
        displayName: fullName
      });

      // Create user document in Firestore
      const userData: User = {
        id: user.uid,
        name: fullName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        avatar: avatarUrl,
        birthday: `${birthday.month}/${birthday.day}/${birthday.year}`,
        gender: gender,
        reputation: 0,
        bio: '',
        isAdmin: false,
        joinedAt: Date.now(),
        lastLogin: Date.now(),
        isBanned: false
      };

      await setDoc(doc(db, 'users', user.uid), userData);

      // Clear any existing onboarding completion flag for new users
      localStorage.removeItem('nexusmind_onboarding_completed');
      localStorage.removeItem('nexusmind_onboarding_data');

      // Redirect directly to onboarding page - let it handle authentication
      navigate('/onboarding');
    } catch (error: any) {
      console.error('Signup error:', error);
      setError(error.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  // Generate days for dropdown
  const generateDays = () => {
    return Array.from({ length: 31 }, (_, i) => i + 1);
  };

  // Generate months for dropdown
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Generate years for dropdown
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 120 }, (_, i) => currentYear - i);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">NexusMind</h1>
          <p className="text-gray-600 text-sm">Create a new account</p>
          <p className="text-gray-500 text-xs">It's free and always will be.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Image Upload */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div
                className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="text-center mt-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-600 text-xs hover:underline"
                >
                  Add Profile Photo
                </button>
              </div>
            </div>
          </div>

          {/* Name Fields - Two Column Layout */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email Field */}
          <input
            type="email"
            placeholder="Mobile number or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />

          {/* Password Field */}
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
            minLength={8}
          />

          {/* Birthday Fields */}
          <div>
            <label className="text-gray-600 text-xs font-semibold">Birthday</label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              <select
                value={birthday.month}
                onChange={(e) => setBirthday({ ...birthday, month: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Month</option>
                {months.map((month, index) => (
                  <option key={month} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={birthday.day}
                onChange={(e) => setBirthday({ ...birthday, day: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Day</option>
                {generateDays().map(day => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              <select
                value={birthday.year}
                onChange={(e) => setBirthday({ ...birthday, year: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Year</option>
                {generateYears().map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Gender Radio Buttons */}
          <div>
            <label className="text-gray-600 text-xs font-semibold">Gender</label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                  required
                />
                <span className="text-sm">Female</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                  required
                />
                <span className="text-sm">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="custom"
                  checked={gender === 'custom'}
                  onChange={(e) => setGender(e.target.value)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                  required
                />
                <span className="text-sm">Custom</span>
              </label>
            </div>
          </div>

          {/* Terms Notice */}
          <div className="text-xs text-gray-600 mt-4">
            By clicking Sign Up, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms</a>, <a href="#" className="text-blue-600 hover:underline">Data Policy</a> and <a href="#" className="text-blue-600 hover:underline">Cookie Policy</a>. You may receive SMS notifications from us and can opt out at any time.
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          {/* Login Link */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-blue-600 hover:underline font-medium"
              >
                Log In
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
