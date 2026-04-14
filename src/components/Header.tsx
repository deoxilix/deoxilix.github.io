// components/Header.tsx
'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { FiInstagram, FiCopy, FiDownload, FiMenu, FiMoon, FiSun, FiShare2, FiX, FiCheck, FiClipboard } from 'react-icons/fi';
import { Basics } from '../types';

type CopyAnimationState = 'idle' | 'clipboard' | 'check';

const socialIcons = {
  github: { icon: <FaGithub />, className: 'social-github' },
  linkedin: { icon: <FaLinkedin />, className: 'social-linkedin' },
  facebook: { icon: <FaFacebook />, className: 'social-facebook' },
  instagram: { icon: <FiInstagram />, className: 'social-instagram' },
};

const Header = ({
  basics,
  imageScaleCompensation = 1,
}: {
  basics: Basics;
  imageScaleCompensation?: number;
}) => {
  const profileImageSize = Math.round(120 * imageScaleCompensation);
  const minProfileImageSize = Math.round(96 * imageScaleCompensation);
  const nameParts = basics.name.split(' ');
  const [copyStates, setCopyStates] = useState<Record<string, CopyAnimationState>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageSize, setImageSize] = useState(profileImageSize);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? savedMode === 'true' : false;
  });
  const [shareState, setShareState] = useState<'idle' | 'clipboard' | 'check'>('idle');
  const [githubHover, setGithubHover] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const copyAnimationTimeouts = useRef<Record<string, ReturnType<typeof setTimeout>[]>>({});
  const imageColumnRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<{
    startX: number;
    startY: number;
    startSize: number;
    maxSize: number;
  } | null>(null);
  const emails = Array.isArray(basics.email) ? basics.email : [basics.email];

  useEffect(() => {
    setImageSize(profileImageSize);
  }, [profileImageSize]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

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
    setDarkMode((prevMode) => !prevMode);
  };

  const getPointerPosition = useCallback((event: MouseEvent | TouchEvent) => {
    if ('touches' in event) {
      const touch = event.touches[0] ?? event.changedTouches[0];
      return {
        x: touch?.clientX ?? 0,
        y: touch?.clientY ?? 0,
      };
    }

    return {
      x: event.clientX,
      y: event.clientY,
    };
  }, []);

  const handleResizeMove = useCallback((event: MouseEvent | TouchEvent) => {
    if (!dragStateRef.current) {
      return;
    }

    if ('touches' in event) {
      event.preventDefault();
    }

    const { x, y } = getPointerPosition(event);
    const { startX, startY, startSize, maxSize } = dragStateRef.current;
    const delta = Math.max(x - startX, y - startY);
    const nextSize = Math.round(Math.min(Math.max(startSize + delta, minProfileImageSize), maxSize));
    setImageSize(nextSize);
  }, [getPointerPosition, minProfileImageSize]);

  const stopResize = useCallback(function handleResizeEnd() {
    dragStateRef.current = null;
    window.removeEventListener('mousemove', handleResizeMove);
    window.removeEventListener('mouseup', handleResizeEnd);
    window.removeEventListener('touchmove', handleResizeMove);
    window.removeEventListener('touchend', handleResizeEnd);
  }, [handleResizeMove]);

  const startResize = (clientX: number, clientY: number) => {
    const columnWidth = imageColumnRef.current?.clientWidth ?? profileImageSize;

    dragStateRef.current = {
      startX: clientX,
      startY: clientY,
      startSize: imageSize,
      maxSize: Math.max(minProfileImageSize, Math.floor(columnWidth)),
    };

    window.addEventListener('mousemove', handleResizeMove);
    window.addEventListener('mouseup', stopResize);
    window.addEventListener('touchmove', handleResizeMove, { passive: false });
    window.addEventListener('touchend', stopResize);
  };

  const handleResizeMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    startResize(event.clientX, event.clientY);
  };

  const handleResizeTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
    const touch = event.touches[0];
    if (!touch) {
      return;
    }

    startResize(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    return () => {
      stopResize();
    };
  }, [stopResize]);

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

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);

      const existingTimeouts = copyAnimationTimeouts.current[key] || [];
      existingTimeouts.forEach((id) => clearTimeout(id));

      setCopyStates((prev) => ({ ...prev, [key]: 'clipboard' }));

      const checkTimeout = setTimeout(() => {
        setCopyStates((prev) => ({ ...prev, [key]: 'check' }));
      }, 250);

      const resetTimeout = setTimeout(() => {
        setCopyStates((prev) => ({ ...prev, [key]: 'idle' }));
      }, 1700);

      copyAnimationTimeouts.current[key] = [checkTimeout, resetTimeout];
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
          href="/Rajarshi-Sen-Resume-Mar-2026-int.pdf"
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
        <div ref={imageColumnRef} className="relative mb-4 w-full">
          {/* Desktop: Hamburger Menu - left of image */}
          <div ref={menuRef} className="hidden md:flex flex-col items-center absolute -left-10 top-0">
            {menuContent}
          </div>
          {/* Profile Image */}
          <div className="relative overflow-visible" style={{ width: imageSize, height: imageSize }}>
            <div className="rounded-xl overflow-hidden w-full h-full">
              <Image
                src="/photo-chitown.jpeg"
                alt={basics.name}
                width={imageSize}
                height={imageSize}
                className="w-full h-full object-cover object-center"
                draggable={false}
              />
            </div>

            <button
              type="button"
              aria-label="Resize profile image"
              title="Drag to resize"
              className="group absolute bottom-0 right-0 translate-x-[18%] translate-y-[18%] h-7 w-7 cursor-se-resize select-none touch-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/60 rounded-sm"
              onMouseDown={handleResizeMouseDown}
              onTouchStart={handleResizeTouchStart}
            >
              <span className="pointer-events-none absolute bottom-0 right-0 h-3.5 w-3.5 border-r-2 border-b-2 border-zinc-500/50 rounded-br-xl transition-colors duration-150 group-hover:border-zinc-700/70 group-active:border-zinc-700/70" />
            </button>
          </div>
        </div>
      <h1 className="text-5xl font-jaapokki font-bold leading-tight animate-name">
        <span className="md:inline block">{nameParts[0]}</span>
        <span className="hidden md:inline"> </span>
        <span className="md:inline block">{nameParts.slice(1).join(' ')}</span>
      </h1>
      <div className="flex space-x-4 mt-4 min-h-8">
        {basics.social.map(profile => {
          const social = socialIcons[profile.name as keyof typeof socialIcons];

          // Custom GitHub icon with animated GIF on hover
          if (profile.name === 'github') {
            return (
              <a
                key={profile.name}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="text-zinc-600 text-2xl transition-all duration-200 social-github inline-block relative"
                style={{ transform: githubHover ? 'translateY(-8px) scale(1.1)' : 'none' }}
                onMouseEnter={() => setGithubHover(true)}
                onMouseLeave={() => setGithubHover(false)}
              >
                {githubHover ? (
                  <Image
                    src="/GitHub-logo.gif"
                    alt="GitHub"
                    width={24}
                    height={24}
                    className="inline-block"
                    unoptimized
                  />
                ) : (
                  <FaGithub />
                )}
              </a>
            );
          }

          return (
            <a
              key={profile.name}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${profile.name.charAt(0).toUpperCase() + profile.name.slice(1)} profile`}
              className={`text-zinc-600 text-2xl transition-all duration-200 hover:scale-110 ${social?.className || ''}`}
            >
              {social?.icon}
            </a>
          );
        })}
      </div>
      <p className="text-zinc-700 my-6 font-lato font-normal">{basics.description}</p>
      <div className="text-zinc-600 font-lato font-normal space-y-1">
        {emails.map((email) => (
          <div key={email} className="contact-item flex items-center gap-1 w-fit group">
            <a
              href={`mailto:${email}`}
              className="contact-email transition-colors duration-200"
            >
              {email}
            </a>

            <button
              onClick={() => copyToClipboard(email, `email:${email}`)}
              className="cursor-pointer text-sm p-1 text-zinc-500 hover:text-zinc-700 transition-all duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 pointer-events-auto md:pointer-events-none md:group-hover:pointer-events-auto"
              title="Copy email"
              type="button"
            >
              <div className="relative w-4 h-4">
                <FiCopy className={`absolute inset-0 transition-all duration-300 ${!copyStates[`email:${email}`] || copyStates[`email:${email}`] === 'idle' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                <FiClipboard className={`absolute inset-0 transition-all duration-300 ${copyStates[`email:${email}`] === 'clipboard' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                <FiCheck className={`absolute inset-0 transition-all duration-300 ${copyStates[`email:${email}`] === 'check' ? 'opacity-100 scale-100 text-green-500' : 'opacity-0 scale-50'}`} />
              </div>
            </button>
          </div>
        ))}

        <div className="contact-item flex items-center gap-1 w-fit group">
          <span className="contact-phone transition-colors duration-200 cursor-default">
            {basics.phone}
          </span>

          <button
            onClick={() => copyToClipboard(basics.phone, `phone:${basics.phone}`)}
            className="cursor-pointer text-sm p-1 text-zinc-500 hover:text-zinc-700 transition-all duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 pointer-events-auto md:pointer-events-none md:group-hover:pointer-events-auto"
            title="Copy phone"
            type="button"
          >
            <div className="relative w-4 h-4">
              <FiCopy className={`absolute inset-0 transition-all duration-300 ${!copyStates[`phone:${basics.phone}`] || copyStates[`phone:${basics.phone}`] === 'idle' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
              <FiClipboard className={`absolute inset-0 transition-all duration-300 ${copyStates[`phone:${basics.phone}`] === 'clipboard' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
              <FiCheck className={`absolute inset-0 transition-all duration-300 ${copyStates[`phone:${basics.phone}`] === 'check' ? 'opacity-100 scale-100 text-green-500' : 'opacity-0 scale-50'}`} />
            </div>
          </button>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
