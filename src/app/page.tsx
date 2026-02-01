import resume from '../../data/resume.json';
import Header from '../components/Header';
import Education from '../components/Education';
import Work from '../components/Work';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Internships from '../components/Internships';
import Leadership from '../components/Leadership';

export default function Home() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Mobile layout: single column with specific order */}
      <div className="md:hidden space-y-8">
        <Header basics={resume.basics} />
        <Education education={resume.education} />
        <Work work={resume.work} />
        <Skills skills={resume.skills} />
        <Projects projects={resume.projects} />
        {resume.sections?.internships?.enabled && <Internships internships={resume.internships} />}
        <Leadership leadership={resume.leadership} />
      </div>

      {/* Desktop layout: 3 columns with sidebar */}
      <div className="hidden md:grid md:grid-cols-3 gap-8">
        <aside className="md:col-span-1 space-y-8">
          <Header basics={resume.basics} />
          <Skills skills={resume.skills} />
        </aside>
        <main className="md:col-span-2 space-y-8">
          <Education education={resume.education} />
          <Work work={resume.work} />
          <Projects projects={resume.projects} />
          {resume.sections?.internships?.enabled && <Internships internships={resume.internships} />}
          <Leadership leadership={resume.leadership} />
        </main>
      </div>
    </div>
  );
}
