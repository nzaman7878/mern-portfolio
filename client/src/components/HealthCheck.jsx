import { useState, useEffect } from 'react';

const HealthCheck = () => {
  const [serverStatus, setServerStatus] = useState('checking...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/health');
        if (response.ok) {
          const data = await response.json();
          setServerStatus(data);
          setError(null);
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      } catch (err) {
        setError(err.message);
        setServerStatus('offline');
      }
    };

    checkServerHealth();
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Client Status */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="font-semibold text-green-700">Client</span>
          </div>
          <p className="text-sm text-green-600 mt-1">React app is running</p>
        </div>

        {/* Server Status */}
        <div className={`p-4 rounded-lg border ${
          error ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
        }`}>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              error ? 'bg-red-500' : 'bg-green-500'
            }`}></div>
            <span className={`font-semibold ${
              error ? 'text-red-700' : 'text-green-700'
            }`}>Server</span>
          </div>
          <p className={`text-sm mt-1 ${
            error ? 'text-red-600' : 'text-green-600'
          }`}>
            {error ? `Error: ${error}` : 'Express server is running'}
          </p>
          {typeof serverStatus === 'object' && (
            <div className="text-xs text-gray-500 mt-2">
              Uptime: {Math.floor(serverStatus.uptime)}s
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">🎉 It Works!</h3>
        <p className="text-gray-600">
          Your MERN stack foundation is ready. Time to build something amazing!
        </p>
      </div>
    </div>
  );
};

export default HealthCheck;
