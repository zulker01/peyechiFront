import React, { useState } from 'react';
import './App.css';
import Login from './component/login/login';
import Signup from './component/signup/signup';
import Users from './component/users/users';
import FoundItemsList from './component/FoundItemsList/FoundItemsList';
import Home from './component/homepage/homepage';
import AppNavbar from './component/navbar/Navbar';
import ProfilePage from './component/Profile/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() { 
  const [view, setView] = useState('home');    // default view is login 
  const [token, setToken] = useState(null);
  const [currentUser,setCurrentUser] = useState(null)

  const handleLoginSuccess = (receivedToken,userData) => {  //set receivedToken parameter to global token
    setToken(receivedToken);
    if (userData) {
      setCurrentUser(userData);
    }
    setView('lost');     
  };

  const handleBackToLogin = () => {
    setToken('');
    setCurrentUser(null);
    setView('login');
  };

  return (
    <div >
      <AppNavbar 
        onSwitchToHome={() => setView('home')}
        onSwitchToLogin={() => setView('login')}
        onSwitchToSignup={() => setView('signup')}
        onSwitchToProfile={() => setView('profile')}
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
        <div >
          <Signup onSwitchToLogin={() => setView('login')} />
        </div>
      ): view === 'profile' ? (
        <div className="App-content">
          <ProfilePage onSwitchToLogin={() => setView('login')} />
        </div>
      ) : view === 'home' ? (
        <div className="App-content">
          <Home 
            token={token} 
            userId={currentUser?.id}
            onBackToLogin={handleBackToLogin}
            onSwitchToSignup={() => setView('signup')}
          />
        </div>
      ) : (
        <div className="App-content">
          <FoundItemsList token={token} onBack={() => setView('home')} onBackToLogin={()=>setView('login')} />
        </div>
      )}
    </div>
  );
}

export default App;
