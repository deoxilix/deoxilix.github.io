// components/Leadership.tsx
import React from 'react';
import { Leadership as LeadershipType } from '../types';

const Leadership = ({ leadership }: { leadership: LeadershipType[] }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold pb-1 mb-4 text-[#428bca] font-garamond">LEADERSHIPS</h2>
      {leadership.map((lead, index) => (
        <div key={index} className="flex mb-4 font-lato">
          <div className="w-3/4 pr-2">
            <h3 className="text-xl font-semibold font-garamond">{lead.name}</h3>
            <p className="text-lg italic font-normal">{lead.role}</p>
            {lead.description && <p className="text-zinc-700 font-normal">{lead.description}</p>}
          </div>
          <div className="w-1/4 text-left pl-2 flex">
            <div className="border-l-2 border-dotted border-zinc-300 h-auto self-stretch"></div>
            <div className="pl-2">
              <p className="text-zinc-500 text-xs font-normal">{lead.startDate}</p>
              <p className="text-zinc-500 text-xs font-normal">{lead.endDate}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Leadership;
