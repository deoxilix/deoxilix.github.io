// components/Internships.tsx
import React from 'react';
import { Internship } from '../types';

const Internships = ({ internships }: { internships: Internship[] }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold pb-1 mb-4 text-[#428bca] font-garamond">INTERNSHIPS</h2>
      {internships.map((internship, index) => (
        <div key={index} className="flex mb-4 font-lato">
          <div className="w-3/4 pr-2">
            <h3 className="text-xl font-semibold font-garamond">{internship.company}</h3>
            <p className="text-lg italic font-normal">{internship.role}</p>
            <p className="text-zinc-700 font-normal">{internship.description}</p>
          </div>
          <div className="w-1/4 text-left pl-2 flex">
            <div className="border-l-2 border-dotted border-zinc-300 h-auto self-stretch"></div>
            <div className="pl-2">
              <p className="text-zinc-600 text-sm font-normal">{internship.location}</p>
              <p className="text-zinc-500 text-xs font-normal">{internship.startDate}</p>
              <p className="text-zinc-500 text-xs font-normal">{internship.endDate}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Internships;
