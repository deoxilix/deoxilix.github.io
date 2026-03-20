import React from 'react';

type MinimapItem = {
  label: React.ReactNode;
  href: string;
  ariaLabel?: string;
  isArrow?: boolean;
};

const SectionMinimap = ({ items }: { items: MinimapItem[] }) => {
  return (
    <nav
      aria-label="Section minimap"
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 justify-end"
    >
      <ul className="space-y-0.5 text-right">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              aria-label={item.ariaLabel}
              className={`transition-colors duration-200 ${
                item.isArrow
                  ? 'minimap-link inline-block origin-right text-base leading-none font-semibold transition-transform duration-200 hover:scale-105'
                  : 'minimap-link inline-block origin-right text-[10px] uppercase tracking-wide font-medium transition-transform duration-200 hover:scale-105'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SectionMinimap;