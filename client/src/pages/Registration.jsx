import React from 'react';
import RegistrationForm from '../components/RegistrationForm';

const Registration = () => {
  const handleSuccess = (data) => {
    console.log('Registration submitted successfully:', data);
  };

  return (
    <main className="page-container">
      {/* Decorative background vectors/illustrations */}
      <div className="bg-decorations">
        <div className="decor-wave wave-1"></div>
        <div className="decor-wave wave-2"></div>
        
        {/* Floating background graphics matching reference image */}
        <div className="floating-graphic cap-left">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M50 15L10 35L50 55L90 35L50 15Z" />
            <path d="M25 43V65C25 73 35 80 50 80C65 80 75 73 75 65V43" />
            <path d="M90 35V65" />
          </svg>
        </div>

        <div className="floating-graphic books-left">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 30 L85 20 L85 35 L15 45 Z" />
            <path d="M15 45 L85 35 L85 50 L15 60 Z" />
            <path d="M15 60 L85 50 L85 65 L15 75 Z" />
          </svg>
        </div>

        <div className="floating-graphic book-open-right">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M50 25 C35 15 15 20 10 25 V75 C15 70 35 65 50 75 C65 65 85 70 90 75 V25 C85 20 65 15 50 25 Z" />
            <path d="M50 25 V75" />
            <line x1="20" y1="35" x2="42" y2="33" />
            <line x1="20" y1="45" x2="42" y2="43" />
            <line x1="20" y1="55" x2="42" y2="53" />
            <line x1="58" y1="33" x2="80" y2="35" />
            <line x1="58" y1="43" x2="80" y2="45" />
            <line x1="58" y1="53" x2="80" y2="55" />
          </svg>
        </div>

        <div className="floating-graphic school-right">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="10" y="50" width="80" height="40" />
            <path d="M50 15 L90 50 H10 Z" />
            <rect x="42" y="65" width="16" height="25" />
            <rect x="20" y="60" width="15" height="15" />
            <rect x="65" y="60" width="15" height="15" />
          </svg>
        </div>

        <div className="floating-graphic plant-left">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M20 90 C30 70 40 40 50 10 C45 35 25 45 10 50 C25 60 20 75 20 90 Z" />
            <path d="M35 85 C45 70 55 50 65 30 C55 50 75 55 90 55 C70 65 65 80 35 85 Z" />
          </svg>
        </div>

        <div className="floating-graphic plant-right">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M80 90 C70 70 60 40 50 10 C55 35 75 45 90 50 C75 60 80 75 80 90 Z" />
            <path d="M65 85 C55 70 45 50 35 30 C45 50 25 55 10 55 C30 65 35 80 65 85 Z" />
          </svg>
        </div>

        <div className="dots-pattern dots-top-left"></div>
        <div className="dots-pattern dots-bottom-right"></div>
      </div>

      <div className="registration-content">
        <RegistrationForm onSuccess={handleSuccess} />
      </div>
    </main>
  );
};

export default Registration;
