// components/Header.tsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { FiInstagram, FiCopy, FiDownload, FiMenu, FiMoon, FiSun, FiShare2, FiX, FiCheck, FiClipboard } from 'react-icons/fi';
import { Basics } from '../types';

const socialIcons = {
  github: { icon: <FaGithub />, className: 'social-github' },
  linkedin: { icon: <FaLinkedin />, className: 'social-linkedin' },
  facebook: { icon: <FaFacebook />, className: 'social-facebook' },
  instagram: { icon: <FiInstagram />, className: 'social-instagram' },
};

const Header = ({ basics }: { basics: Basics }) => {
  const nameParts = basics.name.split(' ');
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [shareState, setShareState] = useState<'idle' | 'clipboard' | 'check'>('idle');
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check for saved preference or system preference
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedMode ? savedMode === 'true' : prefersDark;
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  // Handle click outside and timeout
  useEffect(() => {
    if (menuOpen) {
      // Set 5-second timeout to close menu
      timeoutRef.current = setTimeout(() => {
        setMenuOpen(false);
      }, 5000);

      // Handle click outside
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setMenuOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [menuOpen]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('darkMode', String(newMode));
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareState('clipboard');
      setTimeout(() => {
        setShareState('check');
        setTimeout(() => setShareState('idle'), 1500);
      }, 400);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const copyToClipboard = async (text: string, type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'email') {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      } else {
        setPhoneCopied(true);
        setTimeout(() => setPhoneCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const menuContent = (
    <>
      {/* Hamburger/Close Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="hover:scale-110 transition-all duration-200 p-2"
        style={{ color: darkMode ? '#71717a' : '#71717a' }}
        onMouseEnter={(e) => e.currentTarget.style.color = darkMode ? '#d4d4d8' : '#3f3f46'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#71717a'}
        title="Menu"
      >
        {menuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
      </button>
      {/* Menu Items - expand vertically down */}
      <div className={`flex flex-col items-center gap-3 overflow-hidden transition-all duration-300 ease-out ${menuOpen ? 'max-h-32 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
        <button
          onClick={toggleDarkMode}
          className="hover:scale-110 transition-all duration-200 p-1"
          style={{ color: darkMode ? '#71717a' : '#71717a' }}
          onMouseEnter={(e) => e.currentTarget.style.color = darkMode ? '#d4d4d8' : '#3f3f46'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#71717a'}
          title={darkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
        </button>
        <a
          href="/Rajarshi-Sen-Resume-Jan-2026-int.pdf"
          download
          className="hover:scale-110 transition-all duration-200 p-1"
          style={{ color: darkMode ? '#71717a' : '#71717a' }}
          onMouseEnter={(e) => e.currentTarget.style.color = darkMode ? '#d4d4d8' : '#3f3f46'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#71717a'}
          title="Download Resume PDF"
        >
          <FiDownload className="text-xl" />
        </a>
        <button
          onClick={handleShare}
          className="hover:scale-110 transition-all duration-200 p-1"
          style={{ color: shareState === 'check' ? '#22c55e' : '#71717a' }}
          onMouseEnter={(e) => { if (shareState === 'idle') e.currentTarget.style.color = darkMode ? '#d4d4d8' : '#3f3f46'; }}
          onMouseLeave={(e) => { if (shareState === 'idle') e.currentTarget.style.color = '#71717a'; }}
          title="Share Resume"
        >
          <div className="relative w-5 h-5">
            <FiShare2 className={`text-xl absolute inset-0 transition-all duration-300 ${shareState === 'idle' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
            <FiClipboard className={`text-xl absolute inset-0 transition-all duration-300 ${shareState === 'clipboard' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
            <FiCheck className={`text-xl absolute inset-0 transition-all duration-300 ${shareState === 'check' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
          </div>
        </button>
      </div>
    </>
  );
  
  return (
    <>
      {/* Mobile: Sticky Hamburger Menu - top right */}
      <div ref={menuRef} className="md:hidden fixed top-4 right-4 z-50 flex flex-col items-end">
        {menuContent}
      </div>

      <header className="flex flex-col mb-8">
        {/* Desktop: Menu + Image container */}
        <div className="relative mb-4">
          {/* Desktop: Hamburger Menu - left of image */}
          <div ref={menuRef} className="hidden md:flex flex-col items-center absolute -left-10 top-0">
            {menuContent}
          </div>
          {/* Profile Image */}
          <div className="w-[120px] h-[120px] rounded-xl overflow-hidden">
            <Image
              src="/photo-chitown.jpeg"
              alt={basics.name}
              width={120}
              height={120}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      <h1 className="text-5xl font-jaapokki font-bold leading-tight animate-name">
        <span className="md:inline block">{nameParts[0]}</span>
        <span className="hidden md:inline"> </span>
        <span className="md:inline block">{nameParts.slice(1).join(' ')}</span>
      </h1>
      <div className="flex space-x-4 mt-4">
        {basics.social.map(profile => {
          const social = socialIcons[profile.name as keyof typeof socialIcons];
          return (
            <a 
              key={profile.name} 
              href={profile.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`text-zinc-600 text-2xl transition-all duration-200 hover:scale-110 ${social?.className || ''}`}
            >
              {social?.icon}
            </a>
          );
        })}
      </div>
      <p className="text-zinc-700 my-6 font-lato font-normal">{basics.description}</p>
      <div className="text-zinc-600 font-lato font-normal space-y-1">
        <div className="contact-item flex items-center group relative">
          <FiCopy 
            className={`copy-icon cursor-pointer text-sm hidden md:block absolute -left-6 ${emailCopied ? 'text-green-500 opacity-100' : ''}`}
            onClick={() => copyToClipboard(basics.email, 'email')}
            title="Copy email"
          />
          <a 
            href={`mailto:${basics.email}`} 
            className="contact-email transition-colors duration-200"
          >
            {basics.email}
          </a>
          <FiCopy 
            className={`cursor-pointer text-sm ml-2 md:hidden ${emailCopied ? 'text-green-500' : ''}`}
            onClick={() => copyToClipboard(basics.email, 'email')}
            title="Copy email"
          />
        </div>
        <div className="contact-item flex items-center group relative">
          <FiCopy 
            className={`copy-icon cursor-pointer text-sm hidden md:block absolute -left-6 ${phoneCopied ? 'text-green-500 opacity-100' : ''}`}
            onClick={() => copyToClipboard(basics.phone, 'phone')}
            title="Copy phone"
          />
          <span className="contact-phone transition-colors duration-200 cursor-default">
            {basics.phone}
          </span>
          <FiCopy 
            className={`cursor-pointer text-sm ml-2 md:hidden ${phoneCopied ? 'text-green-500' : ''}`}
            onClick={() => copyToClipboard(basics.phone, 'phone')}
            title="Copy phone"
          />
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
