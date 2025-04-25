import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ darkMode = false }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem('user'));
  const userId = userData?.userId;
  const name = userData?.user || 'User';

  // Color palette from your specifications
  const colors = darkMode ? {
    primary: '#7B8CFF',       // Light Indigo
    accent: '#FFE066',        // Muted Yellow
    background: '#111827',    // Charcoal
    surface: '#1F2937',       // Slate
    textPrimary: '#F9FAFB',   // Off-white
    textMuted: '#9CA3AF',     // Gray 400
    borders: '#374151'        // Gray 700
  } : {
    primary: '#5C67F2',       // Indigo Blue
    accent: '#FCD34D',        // Soft Yellow
    background: '#F9FAFB',    // Off-white
    surface: '#FFFFFF',       // White
    textPrimary: '#1F2937',   // Slate Black
    textMuted: '#6B7280',     // Gray 500
    borders: '#E5E7EB'        // Light Gray
  };

  const navItems = [
    { path: 'home', label: 'Home' },
    { path: 'analytics', label: 'Analytics' },
    { path: 'add', label: 'Add Transaction' },
    { path: 'reports', label: 'Reports' },
    { path: 'settings', label: 'Settings' }
  ];

  // Close mobile menu when clicking a link
  const handleMobileLinkClick = () => setIsMobileOpen(false);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Desktop Navigation Bar */}
      <header 
        className="hidden md:flex items-center justify-between px-6 py-3"
        style={{
          backgroundColor: colors.surface,
          borderBottom: `1px solid ${colors.borders}`,
          color: colors.textPrimary
        }}
      >
        <Link to={`/home/${userId}`} className="text-xl font-bold">
          PocketPlan
        </Link>
        
        <nav className="flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={`/${item.path}/${userId}`}
              className="px-3 py-2 rounded-md transition-colors hover:bg-opacity-10 hover:bg-black hover:dark:bg-white"
              style={{ color: colors.textPrimary }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        <Link 
          to={`/profile/${userId}`} 
          className="flex items-center space-x-2"
        >
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: colors.primary,
              color: darkMode ? colors.background : colors.surface
            }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
          <span style={{ color: colors.textPrimary }}>{name}</span>
        </Link>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md"
          style={{
            backgroundColor: colors.surface,
            color: colors.textPrimary
          }}
        >
          {isMobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transition-transform duration-300 ${
            isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{
            backgroundColor: colors.primary,
            color: colors.textPrimary
          }}
        >
          <div className="h-full flex flex-col p-4">
            <h1 className="text-2xl font-bold mb-8">PocketPlan</h1>
            
            <nav className="flex-1">
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={`/${item.path}/${userId}`}
                      className="block p-3 rounded-lg hover:bg-opacity-20 hover:bg-white"
                      onClick={handleMobileLinkClick}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="mt-auto p-3 rounded-lg hover:bg-opacity-20 hover:bg-white">
              <Link
                to={`/profile/${userId}`}
                className="flex items-center space-x-3"
                onClick={handleMobileLinkClick}
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: colors.accent,
                    color: darkMode ? colors.background : colors.primary
                  }}
                >
                  {name.charAt(0).toUpperCase()}
                </div>
                <span>{name}</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-50"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </div>

      {/* Spacer for desktop header */}
      <div className="hidden md:block h-16"></div>
    </>
  );
};

export default Navigation;