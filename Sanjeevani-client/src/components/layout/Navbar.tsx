
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import CustomButton from '../ui/CustomButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleSignup = () => {
    navigate('/signup');
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Health ID', path: '/health-id' },
    { name: 'Features', path: '/#features' },
  ];

  const featureItems = [
    { name: 'Predictive Alerts', path: '/predictive-alerts' },
    { name: 'Medicine Scanner', path: '/medicine-scanner' },
    { name: 'Medication Reminders', path: '/medication-reminders' },
    { name: 'Diet & Fitness', path: '/diet-fitness' },
    { name: 'AI Assistant', path: '/ai-assistant' },
    { name: 'Medical Reports', path: '/medical-reports' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6',
        scrolled ? 'glass shadow-md py-3' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" aria-label="Sanjeevani Health Sphere">
            <div className="text-health-500 font-bold text-2xl">Sanjeevani</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-foreground/80 hover:text-health-500 transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* <div className="flex items-center gap-4">
              <CustomButton variant="outline" size="default" onClick={handleLogin}>
                Log In
              </CustomButton>
              <CustomButton variant="health" size="default" onClick={handleSignup}>
                Sign Up
              </CustomButton>
            </div> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground p-2 focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'md:hidden fixed inset-0 top-[72px] z-40 bg-background/95 backdrop-blur-lg transition-transform duration-300',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="container mx-auto py-6 px-4">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 px-4 text-lg font-medium text-foreground hover:text-health-500 transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            
            <li className="pt-2 pb-1 px-4 text-sm text-muted-foreground">FEATURES</li>
            
            {featureItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 px-4 text-base text-foreground hover:text-health-500 transition-colors pl-8"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          {/* <div className="mt-6 flex flex-col gap-4 px-4">
            <CustomButton variant="outline" size="lg" className="w-full" onClick={handleLogin}>
              Log In
            </CustomButton>
            <CustomButton variant="health" size="lg" className="w-full" onClick={handleSignup}>
              Sign Up
            </CustomButton>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
