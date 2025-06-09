import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Disc3 } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollY } = useScroll();
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(8, 8, 32, 0.8)']
  );

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'music', label: 'Music' },
    { id: 'projects', label: 'The Lab' },
    { id: 'writer', label: 'Echoverse' },
    { id: 'barma-effect', label: 'The Barma Effect' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      style={{ backgroundColor: headerBackground }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md transition-colors duration-300"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.a
          href="#hero"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <Disc3 className="w-8 h-8 text-primary-500" />
          <span className="text-xl font-bold tracking-tighter text-white">Karthik Barma</span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {navItems.map((item, index) => (
              <motion.li key={item.id} 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <a
                  href={`#${item.id}`}
                  className={`text-sm font-medium transition-colors duration-300 relative 
                    ${activeSection === item.id ? 'text-primary-400' : 'text-white/70 hover:text-white'}`}
                  data-cursor-hover="true"
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute left-0 right-0 -bottom-1 h-0.5 bg-primary-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          data-cursor-hover="true"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <motion.nav
        className={`fixed top-16 left-0 w-full bg-black/90 backdrop-blur-lg overflow-hidden md:hidden z-50`}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        initial={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <ul className="py-4 px-6 space-y-4">
          {navItems.map((item) => (
            <li key={item.id} className="border-b border-white/10 pb-2">
              <a
                href={`#${item.id}`}
                className={`block py-2 text-lg ${
                  activeSection === item.id ? 'text-primary-400' : 'text-white/70'
                }`}
                onClick={() => setIsOpen(false)}
                data-cursor-hover="true"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>
    </motion.header>
  );
};

export default Header;