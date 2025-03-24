import React from 'react';
import ParticleBackground from '../components/ParticleBackground';

const TestPage = () => {
    return (
        <div style={{ 
            width: '100vw', 
            height: '100vh', 
            position: 'relative',
            overflow: 'hidden'
        }}>
            <ParticleBackground />
            <h1 style={{ 
                position: 'relative', 
                zIndex: 1, 
                color: '#000000',
                textAlign: 'center',
                padding: '20px'
            }}>
                Particle Test Page
            </h1>
        </div>
    );
};

export default TestPage; 