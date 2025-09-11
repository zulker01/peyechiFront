import React from 'react';

function ProfilePage({onSwitchToLogin}){
    return(
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Profile</h1>
                <div className="grid grid-cols-[100px_1fr] gap-y-3">
                    <div className="text-gray-500">Name</div>
                    <div className="text-gray-900">testusername</div>
                    <div className="text-gray-500">Email</div>
                    <div className="text-gray-900">testEmail</div>
                </div>
                <div className="mt-8">
                    <button 
                        type="button" 
                        className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={onSwitchToLogin}
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>


    );
}
export default ProfilePage;