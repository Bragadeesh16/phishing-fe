import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Report from './components/Report';
import FindImpersonators from './components/FindImpersonators';
import Extension from './components/Extension';
import About from './components/About';

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen cyber-grid">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/report" element={<Report />} />
            <Route path="/impersonators" element={<FindImpersonators />} />
            <Route path="/extension" element={<Extension />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;