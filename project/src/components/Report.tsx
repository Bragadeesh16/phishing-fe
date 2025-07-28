import React from 'react';
import { AlertTriangle, Send } from 'lucide-react';

export default function Report() {
  const [url, setUrl] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle report submission
    console.log('Report submitted:', { url, description });
  };

  return (
    <div className="glass rounded-lg p-6">
      <h2 className="text-2xl font-bold text-emerald-500 mb-6 flex items-center">
        <AlertTriangle className="mr-2" /> Report Suspicious URL
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
            Suspicious URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter the suspicious URL..."
            className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors duration-200"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe why you think this URL is suspicious..."
            rows={4}
            className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors duration-200"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Send className="h-5 w-5" />
          <span>Submit Report</span>
        </button>
      </form>
    </div>
  );
}