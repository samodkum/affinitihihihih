import { Home, Briefcase, Info, Layers, Mail, Sparkles } from 'lucide-react';
import Dock from './Dock';

const navItems = [
  {
    icon: <Home size={20} />,
    label: 'Home',
    onClick: () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    icon: <Sparkles size={20} />,
    label: 'Services',
    onClick: () => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    icon: <Layers size={20} />,
    label: 'Process',
    onClick: () => document.getElementById('our-process')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    icon: <Info size={20} />,
    label: 'About',
    onClick: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    icon: <Briefcase size={20} />,
    label: 'Work',
    onClick: () => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    icon: <Mail size={20} />,
    label: 'Contact',
    onClick: () => {
      const el = document.getElementById('contact') || document.getElementById('connect');
      el?.scrollIntoView({ behavior: 'smooth' });
    },
  },
];

export default function MobileDock() {
  return (
    <div className="mobile-dock-wrapper" aria-label="Mobile navigation dock">
      <Dock
        items={navItems}
        panelHeight={60}
        baseItemSize={44}
        magnification={60}
        distance={100}
        spring={{ mass: 0.12, stiffness: 180, damping: 14 }}
      />
    </div>
  );
}
