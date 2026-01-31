// components/Work.tsx
import React from 'react';
import { Work as WorkType } from '../types';

const Work = ({ work }: { work: WorkType[] }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold pb-1 mb-4 text-[#428bca] font-garamond">WORK EXPERIENCE</h2>
      {work.map((job, index) => (
        <div key={index} className="flex mb-6 font-lato">
          <div className="w-3/4 pr-2">
            <h3 className="text-xl font-semibold font-garamond">{job.company}</h3>
            <p className="text-lg italic mb-2 font-normal">{job.position}</p>
            <p className="text-zinc-700 mb-2 font-normal">{job.summary}</p>
            <ul className="list-disc list-inside text-zinc-700 font-normal">
              {job.highlights.map((highlight, i) => (
                <li key={i} className="mb-1 font-normal">{highlight}</li>
              ))}
            </ul>
            {job.achievements && (
              <div>
                <h4 className="font-semibold mt-2 font-normal">Achievements:</h4>
                <ul className="list-disc list-inside text-zinc-700 font-normal">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="mb-1 font-normal">{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="w-1/4 text-left pl-2 flex">
            <div className="border-l-2 border-dotted border-zinc-300 h-auto self-stretch"></div>
            <div className="pl-2">
              <p className="text-zinc-600 text-sm font-normal">{job.location}</p>
              <p className="text-zinc-500 text-xs font-normal">{job.startDate}</p>
              <p className="text-zinc-500 text-xs font-normal">{job.endDate}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Work;
