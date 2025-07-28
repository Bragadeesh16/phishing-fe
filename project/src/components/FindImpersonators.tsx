import React from 'react';
import { Search, Loader, AlertTriangle, CheckCircle, Shield } from 'lucide-react';

export default function FindImpersonators() {
  const [url, setUrl] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [impersonationResults, setImpersonationResults] = React.useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    try {
      const response = await fetch(`http://localhost:8000/api/check-impersonation?domain=${url}`);
      if (!response.ok) {
        throw new Error('Failed to fetch impersonation results');
      }
  
      const data = await response.json();
      if(data.output != false )
      setImpersonationResults(data.output?.allDomains);
      else
      setImpersonationResults([])
    } catch (error) {
      console.error('Error fetching impersonation results:', error);
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="glass rounded-lg p-6">
      <h2 className="text-2xl font-bold text-emerald-500 mb-6 flex items-center">
        <Search className="mr-2" /> Find Impersonators
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to check for impersonators..."
            className="flex-1 px-4 py-2 rounded-md bg-gray-900 border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors duration-200"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <>
                <Loader className="animate-spin mr-2" />
                Scanning...
              </>
            ) : (
              <>
                <Search className="mr-2" />
                Scan
              </>
            )}
          </button>
        </div>
      </form>

      {loading && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center justify-center p-8 glass rounded-lg">
            <Loader className="animate-spin h-8 w-8 text-emerald-500 mr-3" />
            <p className="text-lg">Scanning for potential impersonators...</p>
          </div>
        </div>
      )}

{impersonationResults.length > 0 && !loading && (
        <div className="mt-8">

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700 rounded-lg">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-800 text-white">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Domain Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Registrar</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Creation Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name Servers</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {impersonationResults.map((domain, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{domain.domain_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{domain.registrar || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{domain.country || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {domain.creation_date ? new Date(domain.creation_date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{domain.name_servers || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {domain.status.includes('UNVERIFIED') ? (
                        <span className="text-red-500 flex items-center">
                          <AlertTriangle className="h-5 w-5 mr-1" /> {domain.status}
                        </span>
                      ) : (
                        <span className="text-green-500 flex items-center">
                          <CheckCircle className="h-5 w-5 mr-1" /> Verified
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}