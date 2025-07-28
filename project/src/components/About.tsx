import { Users, Shield, Award, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-lg p-6">
        <h2 className="text-2xl font-bold text-emerald-500 mb-6 flex items-center">
          <Users className="mr-2" /> About PhishGuard
        </h2>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300">
            PhishGuard is a cutting-edge cybersecurity solution designed to protect users from sophisticated phishing attacks.
            Our team of security experts and developers work tirelessly to maintain and improve our detection algorithms,
            ensuring the highest level of protection for our users.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="glass p-6 rounded-lg border border-emerald-500/30">
              <Shield className="h-12 w-12 text-emerald-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-400">
                To create a safer internet by protecting users from phishing attacks and cyber threats.
              </p>
            </div>

            <div className="glass p-6 rounded-lg border border-emerald-500/30">
              <Award className="h-12 w-12 text-emerald-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Experience</h3>
              <p className="text-gray-400">
                Over 10 years of experience in cybersecurity and threat detection.
              </p>
            </div>

            <div className="glass p-6 rounded-lg border border-emerald-500/30">
              <Globe className="h-12 w-12 text-emerald-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Global Protection</h3>
              <p className="text-gray-400">
                Protecting millions of users across the globe from cyber threats.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-emerald-400 mb-4">Our Technology</h3>
          <p className="text-gray-300">
            PhishGuard uses advanced machine learning algorithms and real-time threat detection to identify and block
            phishing attempts. Our technology analyzes multiple factors including:
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-2">
            <li>Domain similarity analysis</li>
            <li>SSL certificate verification</li>
            <li>Visual similarity detection</li>
            <li>Behavioral analysis</li>
            <li>Real-time URL checking</li>
          </ul>
        </div>
      </div>
    </div>
  );
}