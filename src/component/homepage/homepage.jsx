import React, { useState } from 'react';
import FoundInfo from '../foundInfo/foundInfo';
import LostPage from '../LostPage/LostPage';

function Home({token, userId, onBackToLogin}){
    const [currentView, setCurrentView] = useState('home');

    if (currentView === 'found') return <FoundInfo token={token} userId={userId} onBack={() => setCurrentView('home')} />;
    if (currentView === 'lost') return <LostPage onBack={() => setCurrentView('home')} />;
    

    return(
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>This is the main homepage content.</p>
            
            <div className="button-container">
                <button className="btn-primary btn-lost" onClick={() => setCurrentView('lost')}>Lost</button>
                <button className="btn-primary btn-found" onClick={() => setCurrentView('found')}>
                    Found
                </button>
            </div>
        </div>
    );
}

export default Home;