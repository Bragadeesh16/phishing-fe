import { Download, CheckCircle, ArrowRight } from 'lucide-react';

export default function Extension() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-lg p-6">
        <h2 className="text-2xl font-bold text-emerald-500 mb-6 flex items-center">
          <Download className="mr-2" /> Download PhishGuard Extension
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {/* <button className="w-full px-6 py-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200 flex items-center justify-center text-lg font-semibold">
              <Download className="mr-2" /> Download for Chrome
            </button> */}

            <a
              href="http://localhost:8000/download"
              download
              className="w-full px-6 py-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200 flex items-center justify-center text-lg font-semibold"
            >
              <Download className="mr-2" /> Download for Chrome
            </a>

            <button className="w-full px-6 py-4 glass border border-emerald-500/30 rounded-lg hover:border-emerald-500 transition-colors duration-200 flex items-center justify-center text-lg font-semibold">
              <Download className="mr-2" /> Download for Firefox
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-emerald-400">Installation Steps</h3>
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mr-3">1</span>
                <span>Download the extension for your browser</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mr-3">2</span>
                <span>Open your browser's extension page</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mr-3">3</span>
                <span>Drag and drop the downloaded file into the extensions page</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mr-3">4</span>
                <span>Click "Add Extension" when prompted</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="glass rounded-lg p-6">
        <h3 className="text-xl font-semibold text-emerald-400 mb-4">Features</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 glass rounded-lg border border-emerald-500/30">
            <CheckCircle className="h-8 w-8 text-emerald-500 mb-2" />
            <h4 className="font-semibold mb-2">Real-time Protection</h4>
            <p className="text-gray-400">Instant scanning of websites as you browse</p>
          </div>
          <div className="p-4 glass rounded-lg border border-emerald-500/30">
            <CheckCircle className="h-8 w-8 text-emerald-500 mb-2" />
            <h4 className="font-semibold mb-2">Smart Detection</h4>
            <p className="text-gray-400">Advanced algorithms to detect phishing attempts</p>
          </div>
          <div className="p-4 glass rounded-lg border border-emerald-500/30">
            <CheckCircle className="h-8 w-8 text-emerald-500 mb-2" />
            <h4 className="font-semibold mb-2">Regular Updates</h4>
            <p className="text-gray-400">Continuous updates to protect against new threats</p>
          </div>
        </div>
      </div>
    </div>
  );
}