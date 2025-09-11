import React from 'react';

function AppNavbar({ onSwitchToHome, onSwitchToLogin, onSwitchToSignup, onSwitchToProfile, currentUser, onLogout }) {
  const userDisplayName = currentUser && (currentUser.username || currentUser.email || 'User');

  return (
    <nav className="w-full bg-gray-900 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-14 flex items-center justify-between">
          <button type="button" onClick={onSwitchToHome} className="font-semibold bg-transparent p-0 w-auto border-0">My App</button>

          <div className="flex items-center gap-4">
            <button type="button" onClick={onSwitchToHome} className="hover:text-gray-300 bg-transparent p-0 w-auto border-0">Home</button>
            <a href="#about" className="hover:text-gray-300">About</a>
            {currentUser ? (
              <>
                <span className="text-sm text-gray-300">Welcome, {userDisplayName}</span>
                <button type="button" onClick={onSwitchToProfile} className="hover:text-gray-300 bg-transparent p-0 w-auto border-0">Profile</button>
                <button type="button" onClick={onLogout} className="text-red-300 hover:text-red-200 bg-transparent p-0 w-auto border-0">Logout</button>
              </>
            ) : (
              <>
                <button type="button" onClick={onSwitchToLogin} className="hover:text-gray-300 bg-transparent p-0 w-auto border-0">Login</button>
                {onSwitchToSignup && (
                  <button type="button" onClick={onSwitchToSignup} className="hover:text-gray-300 bg-transparent p-0 w-auto border-0">Sign Up</button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;
