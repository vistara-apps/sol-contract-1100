import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ContractBuilder from './pages/ContractBuilder';
import Dashboard from './pages/Dashboard';
import ContractDetails from './pages/ContractDetails';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800">
        <Header />
        <main className="relative">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/builder" element={<ContractBuilder />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contract/:id" element={<ContractDetails />} />
          </Routes>
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
