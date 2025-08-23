
import './App.css'

import HealthCheck from './components/HealthCheck';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-700 mb-2">
            MERN Portfolio
          </h1>
          <p className="text-gray-600">
            Full-stack developer portfolio built with React, Node.js, Express & MongoDB
          </p>
        </header>
        
        <main className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">System Status</h2>
            <HealthCheck />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
