import React, { useState } from 'react';
import './App.css';
import Login from './component/login/login';
import Signup from './component/signup/signup';
import Users from './component/users/users';
import Home from './component/homepage/homepage';
import AppNavbar from './component/navbar/Navbar';

function App() { 
  const [view, setView] = useState('home');    // default view is login 
  const [token, setToken] = useState('');
  const [currentUser,setCurrentUser] = useState('default')

  const handleLoginSuccess = (receivedToken,userData) => {  //set receivedToken parameter to global token
    setToken(receivedToken);
    if (userData) {
      setCurrentUser(userData);
    }
    setView('users');     
  };

  const handleBackToLogin = () => {
    setToken('');
    setCurrentUser(null);
    setView('login');
  };

  return (
    <div className="App">
      <AppNavbar 
        onSwitchToHome={() => setView('home')}
        onSwitchToLogin={() => setView('login')}
        onSwitchToSignup={() => setView('signup')}
        currentUser={currentUser}
        onLogout={handleBackToLogin}
      />
      {view === 'login' ? (  // if view is login 
        <div className="App-content">
          <Login   // go to login component with these params
            onSwitchToSignup={() => setView('signup')}   // a function, if called will switch to signup
            onLoginSuccess={handleLoginSuccess}  // a function, if called will set the token and switch to users
          />
        </div>
      ) : view === 'signup' ? (
        <div className="App-content">
          <Signup onSwitchToLogin={() => setView('login')} />
        </div>
      ) : view === 'home' ? (
        <div className="App-content">
          <Home 
            token={token} 
            onBackToLogin={handleBackToLogin}
          />
        </div>
      ) : (
        <div className="App-content">
          <Users token={token} onBackToLogin={handleBackToLogin} />
        </div>
      )}
    </div>
  );
}

export default App;
