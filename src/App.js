import './App.css';
import React from 'react';
import { CameraFeed } from './components/camera-feed';

// Upload to local seaweedFS instance
const uploadImage = async file => {
  const formData = new FormData();
  formData.append('file', file);

  // Connect to a seaweedfs instance
};

function App() {
  return (
      <div className="App">
          <h1>Teste Ponto Massivo Techware 1.0</h1>
          <CameraFeed sendFile={uploadImage} />
      </div>
  );
}

export default App;
