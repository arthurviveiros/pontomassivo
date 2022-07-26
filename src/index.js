import React from 'react';
import ReactDOM from 'react-dom';
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
            <h1>Teste Ponto Massivo Techware</h1>
            <CameraFeed sendFile={uploadImage} />
        </div>
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
