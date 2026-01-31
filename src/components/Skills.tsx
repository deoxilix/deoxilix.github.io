// components/Skills.tsx
import React from 'react';
import { Skills as SkillsType } from '../types';

const Skills = ({ skills }: { skills: SkillsType }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold pb-1 mb-4 text-[#428bca] font-garamond">SKILLS</h2>
      <div className="flex flex-col space-y-4">
        <div>
<ul className="text-zinc-700 font-lato font-normal">
            {skills.languages.map(lang => (
              <li key={lang}>- {lang}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1 text-custom-blue font-garamond">FRAMEWORKS</h3>
          <ul className="text-zinc-700 font-lato font-normal">
            {skills.frameworks.map(framework => (
              <li key={framework}>- {framework}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1 text-custom-blue font-garamond">MACHINE LEARNING & AI</h3>
          <ul className="text-zinc-700 font-lato font-normal">
            {skills.ml_ai.map(skill => (
              <li key={skill}>- {skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1 text-custom-blue font-garamond">TOOLS</h3>
          <ul className="text-zinc-700 font-lato font-normal">
            {skills.tools.map(tool => (
              <li key={tool}>- {tool}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1 text-custom-blue font-garamond">METHODOLOGIES</h3>
          <ul className="text-zinc-700 font-lato font-normal">
            {skills.methodologies.map(method => (
              <li key={method}>- {method}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skills;
