import { Table, AlertTriangle, CheckCircle, XCircle, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';



export default function Dashboard() {

  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/predictions-history')
      .then((response) => response.json())
      .then((data) => setPredictions(data?.predictions))
      .catch((error) => console.error('Error fetching predictions:', error));
  }, []);

  const checkedUrls = [
    {
      url: 'example-bank.com',
      googleSafe: true,
      sslCertificate: true,
      trustable: true,
      isPhishing: false,
      checkedAt: '2024-03-10 15:30',
    },
    {
      url: 'suspicious-site.net',
      googleSafe: false,
      sslCertificate: false,
      trustable: false,
      isPhishing: true,
      checkedAt: '2024-03-10 14:20',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-lg p-6">
        <h2 className="text-2xl font-bold text-emerald-500 mb-4 flex items-center">
          <Shield className="mr-2" /> Previously Checked URLs
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Google Safe</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">SSL Certificate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Older than 3 Months</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Checked At</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((prediction, index) => (
                <tr key={index} className="border-b border-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{prediction.url}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {prediction.prediction.GoogleSafePassed ? (
                      <CheckCircle className="text-green-500 h-5 w-5" />
                    ) : (
                      <XCircle className="text-red-500 h-5 w-5" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {prediction.prediction.hasSSLCertificate ? (
                      <CheckCircle className="text-green-500 h-5 w-5" />
                    ) : (
                      <XCircle className="text-red-500 h-5 w-5" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {prediction.prediction.isOlderThan3Months ? (
                      <CheckCircle className="text-green-500 h-5 w-5" />
                    ) : (
                      <XCircle className="text-red-500 h-5 w-5" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {prediction.prediction.SCORE <= 110 ? (
                      <span className="text-red-500 flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-1" /> Phishing
                      </span>
                    ) : (
                      <span className="text-green-500 flex items-center">
                        <Shield className="h-5 w-5 mr-1" /> Safe
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {new Date(prediction.checked_at).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}