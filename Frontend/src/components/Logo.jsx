import React from 'react';

const Logo = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ff6a00" width="36" height="36">
            <path d="M20 6V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2h2a2 2 0 1 1 0 4H4v4h2a2 2 0 1 1 0 4H4v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2h-2a2 2 0 1 1 0-4h2V10h-2a2 2 0 1 1 0-4h2Z" />
        </svg>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#27303f' }}>EventSpark</h1>
        <span style={{ fontSize: '2.25rem', color: '#ff6a00', lineHeight: 0.75 }}>✦</span>
    </div>
);

export default Logo;