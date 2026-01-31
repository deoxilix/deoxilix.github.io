// components/Header.tsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { FiInstagram, FiCopy } from 'react-icons/fi';
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
  
  return (
    <header className="flex flex-col mb-8">
      <div className="w-[120px] h-[120px] rounded-xl overflow-hidden mb-4">
        <Image
          src="/photo-chitown.jpeg"
          alt={basics.name}
          width={120}
          height={120}
          className="w-full h-full object-cover object-center"
        />
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
  );
};

export default Header;
