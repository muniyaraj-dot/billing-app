import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-box">
        <h1 className="home-title">Welcome to the Billing App</h1>
        <p className="home-description">
          Manage your invoices and track payments with ease.
        </p>
      </div>
    </div>
  );
}

export default Home;
