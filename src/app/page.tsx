'use client';
import { useState, useEffect } from 'react';
import localResume from '../../data/resume.json';
import appConfig from '../../config.json';
import Header from '../components/Header';
import Education from '../components/Education';
import Work from '../components/Work';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Internships from '../components/Internships';
import Leadership from '../components/Leadership';
import { Resume } from '../types';

type ResumeSource = 'local' | 'remote';
type RuntimeEnv = 'development' | 'production' | 'test';

interface SourceConfig {
  source: ResumeSource;
  path: string;
}

interface AppConfig {
  development: SourceConfig;
  production: SourceConfig;
  test?: SourceConfig;
}

type ResumeWithConfig = Resume & {
  disabled?: boolean;
  sections?: {
    internships?: {
      enabled?: boolean;
    };
  };
};

const typedLocalResume = localResume as ResumeWithConfig;
const typedAppConfig = appConfig as AppConfig;
const runtimeEnv = (process.env.NODE_ENV as RuntimeEnv | undefined) ?? 'development';
const activeConfig: SourceConfig = typedAppConfig[runtimeEnv] ?? typedAppConfig.development;

export default function Home() {
  const [resume, setResume] = useState<ResumeWithConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeConfig.source === 'local') {
      setResume(typedLocalResume);
      setLoading(false);
      return;
    }

    if (!activeConfig.path) {
      console.warn('Remote resume source selected without a path. Falling back to local resume.');
      setResume(typedLocalResume);
      setLoading(false);
      return;
    }

    const fetchResume = async () => {
      try {
        const response = await fetch(activeConfig.path);
        const data = (await response.json()) as ResumeWithConfig;

        // Check if gist is disabled, or use gist data if enabled
        if (data.disabled === false) {
          setResume(data);
        } else {
          setResume(typedLocalResume);
        }
      } catch (error) {
        console.error('Failed to fetch resume from gist, using local data:', error);
        setResume(typedLocalResume);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  // Console message for curious developers
  useEffect(() => {
    console.log(
      "%cMay the source be with you!",
      'font-size: 14px; font-weight: bold; color: #428bca;'
    );
    console.log(
      "%cLet me know if you find something interesting.",
      "color:#a78bfa;"
    );
    console.log(
      "%crsen90@gmail.com",
      "color:#409ab3;"
    );
  }, []);

  if (loading || !resume) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        {/* Mobile skeleton */}
        <div className="md:hidden space-y-8 animate-pulse">
          {/* Header skeleton */}
          <div className="space-y-4">
            <div className="w-[120px] h-[120px] bg-zinc-200 dark:bg-zinc-700 rounded-xl"></div>
            <div className="h-12 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
              <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
              <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-5/6"></div>
            </div>
          </div>
          {/* Content skeleton */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-1/3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-4/5"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop skeleton */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 animate-pulse">
          <aside className="md:col-span-1 space-y-8">
            {/* Header skeleton */}
            <div className="space-y-4">
              <div className="w-[120px] h-[120px] bg-zinc-200 dark:bg-zinc-700 rounded-xl"></div>
              <div className="h-12 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
                <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
                <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
              </div>
            </div>
            {/* Skills skeleton */}
            <div className="space-y-3">
              <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
              </div>
            </div>
          </aside>
          <main className="md:col-span-2 space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-1/3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-5/6"></div>
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-4/5"></div>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
    );
  }

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
