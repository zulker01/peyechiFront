import React, { useState } from 'react';

function FoundInfo({ onBack }) {
  const [formData, setFormData] = useState({
    itemsFound: '', quantity: '', description: '', location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="found-info">
      <div className="found-info-header">
        <h2>Found Anything ? Add here</h2>
        <button onClick={onBack} className="back-btn">← Back to Home</button>
      </div>
      
      <form onSubmit={handleSubmit} className="found-info-form">
        {['itemsFound', 'quantity', 'description', 'location'].map(field => (
          <div key={field} className="form-group">
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              type="text"
              id={field}
              name={field}
              value={formData[field]}
              onChange={(e) => setFormData({...formData, [field]: e.target.value})}
              placeholder={`Enter ${field}`}
              required
            />
          </div>
        ))}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default FoundInfo;
