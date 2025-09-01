import React from 'react';

function Home({token, onBackToLogin}){
    return(
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>This is the main homepage content.</p>
            
            <div className="button-container">
                <button className="btn-primary btn-lost">
                    Lost
                </button>
                <button className="btn-primary btn-found">
                    Found
                </button>
            </div>

        </div>
    );
}

export default Home;