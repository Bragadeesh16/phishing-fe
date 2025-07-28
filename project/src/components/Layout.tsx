import { Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, FileWarning, Search, Download, Users } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  const navLinks = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/report', label: 'Report', icon: FileWarning },
    { path: '/impersonators', label: 'Find Impersonators', icon: Search },
    { path: '/extension', label: 'Download Extension', icon: Download },
    { path: '/about', label: 'About Us', icon: Users },
  ];

  return (
    <div className="min-h-screen">
      <nav className="glass fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-emerald-500" />
                <span className="text-xl font-bold text-emerald-500">PhishGuard</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1
                        ${location.pathname === link.path
                          ? 'bg-emerald-500 text-white'
                          : 'text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-500'}`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}