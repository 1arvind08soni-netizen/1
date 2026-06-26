import React from 'react';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>💎 Jewelry Shop</h1>
        </div>
        <ul className="navbar-menu">
          <li><a href="/">Dashboard</a></li>
          <li><a href="/clients">Clients</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/sales">Sales</a></li>
          <li><a href="/quotations">Quotations</a></li>
          <li><a href="/loans">Loans</a></li>
          <li><a href="/reports">Reports</a></li>
          <li><a href="/settings">Settings</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;