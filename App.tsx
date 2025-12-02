import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Calculator from './components/Calculator';
import Policy from './components/Policy';
import { CalculatorMode } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<CalculatorMode>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check local storage or system preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDark(storedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Layout isDark={isDark} toggleTheme={toggleTheme}>
      <div className="w-full">
        <Hero />
        <Calculator mode="SEMESTER" onBack={() => {}} />
        <Policy />
      </div>
    </Layout>
  );
};

export default App;