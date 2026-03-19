// components/Projects.tsx
import React from 'react';
import { Project } from '../types';

const Projects = ({ projects }: { projects: Project[] }) => {
  const visibleProjects = (projects || []).filter((project) => project.disabled !== true);

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold pb-1 mb-4 text-[#428bca] font-garamond">PROJECTS</h2>
      {visibleProjects.map((project, index) =>
        (
          <div key={index} className="flex mb-4 font-lato">
          <div className="w-3/4 pr-2">
            <h3 className="text-xl font-semibold font-garamond">{project.name}</h3>
            <p className="text-zinc-700 mb-1 font-normal">{project.summary}</p>
            {project.source && (
              <a href={project.source} target="_blank" rel="noopener noreferrer" className="text-custom-blue hover:underline font-normal">
                source - {project.source}
              </a>
            )}
             {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-custom-blue hover:underline ml-4 font-normal">
                Link - {project.url}
              </a>
            )}
          </div>
          <div className="w-1/4 pl-2 flex">
            <div className="border-l-2 border-dotted border-zinc-300 h-auto self-stretch"></div>
            <div className="pl-2"></div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Projects;
