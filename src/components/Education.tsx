// components/Education.tsx
import React from 'react';
import { Education as EducationType } from '../types';

const Education = ({ education }: { education: EducationType[] }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold pb-1 mb-4 text-[#428bca] font-garamond">EDUCATION</h2>
      {education.map((edu, index) => (
        <div key={index} className="flex mb-4 font-lato">
          <div className="w-3/4 pr-2">
            <h3 className="text-xl font-semibold font-garamond">{edu.institution}</h3>
            <p className="text-lg font-normal">{edu.studyType} in {edu.area}</p>
            {edu.gpa && <p className="text-zinc-600 font-normal">GPA: {edu.gpa}</p>}
            {edu.courses && <p className="text-zinc-700 font-normal">Courses: {edu.courses.join(', ')}</p>}
          </div>
          <div className="w-1/4 text-left pl-2 flex">
            <div className="border-l-2 border-dotted border-zinc-300 h-auto self-stretch"></div>
            <div className="pl-2">
              <p className="text-zinc-600 text-sm font-normal">{edu.location}</p>
              <p className="text-zinc-500 text-xs font-normal">{edu.startDate}</p>
              <p className="text-zinc-500 text-xs font-normal">{edu.endDate}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Education;
