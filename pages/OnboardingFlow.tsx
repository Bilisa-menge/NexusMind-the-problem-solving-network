import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NexusMindLogo from '../components/NexusMindLogo';

interface OnboardingData {
  hearAboutUs: string;
  role: string;
  experience: string;
  expectations: string;
  newsletter: boolean;
}

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    hearAboutUs: '',
    role: '',
    experience: '',
    expectations: '',
    newsletter: false
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Save onboarding data and completion status
    localStorage.setItem('nexusmind_onboarding_completed', 'true');
    localStorage.setItem('nexusmind_onboarding_data', JSON.stringify(onboardingData));
    navigate('/');
  };

  const handleSkip = () => {
    localStorage.setItem('nexusmind_onboarding_completed', 'true');
    navigate('/');
  };

  const updateData = (field: keyof OnboardingData, value: string | boolean) => {
    setOnboardingData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-red-600 rounded-full mr-2 animate-pulse"></span>
                FIRST MVP RELEASE
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to NexusMind!</h2>
              <p className="text-lg text-gray-700 mb-6">
                We're a passionate startup building the future of collaborative problem-solving
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-amber-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">Small Team, Big Dreams</h3>
                  <p className="text-amber-800 text-sm">
                    We're currently a small team with limited engineering resources, but we're dedicated to making NexusMind amazing for our community.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Your Feedback Matters</h3>
                  <p className="text-blue-800 text-sm">
                    Your input is crucial in shaping the future of NexusMind. Every suggestion, bug report, and idea helps us build a better platform for everyone.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-green-900 mb-2">Early Access Benefits</h3>
                  <p className="text-green-800 text-sm">
                    As an early user, you'll have special access to new features and your feedback will directly influence our product roadmap.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How did you hear about NexusMind?</h2>
            
            <div className="space-y-3">
              {[
                { value: 'social_media', label: 'Social Media (Twitter, LinkedIn, etc.)' },
                { value: 'friend', label: 'Friend or Colleague' },
                { value: 'search', label: 'Search Engine (Google, Bing, etc.)' },
                { value: 'tech_blog', label: 'Tech Blog or Publication' },
                { value: 'startup_news', label: 'Startup News Platform' },
                { value: 'github', label: 'GitHub or Open Source' },
                { value: 'other', label: 'Other' }
              ].map(option => (
                <label key={option.value} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="hearAboutUs"
                    value={option.value}
                    checked={onboardingData.hearAboutUs === option.value}
                    onChange={(e) => updateData('hearAboutUs', e.target.value)}
                    className="mr-3 text-blue-600"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>

            {onboardingData.hearAboutUs === 'other' && (
              <input
                type="text"
                placeholder="Please specify..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => updateData('hearAboutUs', e.target.value)}
              />
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tell us about yourself</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Role</label>
              <select
                value={onboardingData.role}
                onChange={(e) => updateData('role', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select your role</option>
                <option value="software_engineer">Software Engineer</option>
                <option value="product_manager">Product Manager</option>
                <option value="designer">Designer (UI/UX)</option>
                <option value="entrepreneur">Entrepreneur/Founder</option>
                <option value="student">Student</option>
                <option value="researcher">Researcher/Academic</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience with Problem-Solving Platforms</label>
              <select
                value={onboardingData.experience}
                onChange={(e) => updateData('experience', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select experience level</option>
                <option value="beginner">Beginner (New to these platforms)</option>
                <option value="intermediate">Intermediate (Used similar platforms)</option>
                <option value="expert">Expert (Very experienced)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">What do you hope to achieve with NexusMind?</label>
              <textarea
                value={onboardingData.expectations}
                onChange={(e) => updateData('expectations', e.target.value)}
                placeholder="Share your goals and expectations..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Connected</h2>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-900 mb-2">Join Our Newsletter</h3>
                  <p className="text-purple-800 text-sm mb-4">
                    Get updates on new features, success stories, and exclusive opportunities for early users.
                  </p>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onboardingData.newsletter}
                      onChange={(e) => updateData('newsletter', e.target.checked)}
                      className="mr-3 text-purple-600"
                    />
                    <span className="text-gray-700">Yes, I'd like to receive updates</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">What's Next?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Access to the problem-solving feed
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Connect with other problem-solvers
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Share and solve real problems
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Direct influence on product development
                </li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <NexusMindLogo size={64} />
          </div>
          <div className="flex items-center justify-center space-x-2 mb-4">
            {[1, 2, 3, 4].map(step => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full ${
                  step <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">Step {currentStep} of 4</p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
            >
              Skip for now
            </button>
            
            <div className="flex space-x-3">
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={currentStep === 2 && !onboardingData.hearAboutUs}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === 4 ? 'Get Started' : 'Next'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>Built with passion by the NexusMind team</p>
          <p className="mt-1">© 2026 NexusMind. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
