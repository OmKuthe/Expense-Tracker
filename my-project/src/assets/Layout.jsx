import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Sidebar';

const Layout = ({ darkMode = false }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const layoutColors = darkMode ? {
    background: '#111827',
  } : {
    background: '#F9FAFB',
  };

  return (
<div
  className="min-h-screen flex flex-col"
  style={{ backgroundColor: layoutColors.background }}
>
  <Navigation 
    darkMode={darkMode}
    onMobileToggle={(isOpen) => setMobileNavOpen(isOpen)}
  />

  {/* Main Content - Adjust padding to prevent overlap with fixed navbar */}
  <main className="flex-1 p-4 pt-20"> {/* Add pt-20 to give space for fixed navbar */}
    <Outlet />
  </main>

  {/* Overlay for Mobile Sidebar */}
  {mobileNavOpen && (
    <div 
      className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
      onClick={() => setMobileNavOpen(false)}
    />
  )}
</div>


  
  );
};

export default Layout;
