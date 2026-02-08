import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

// Use this hook in any component to access theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
     const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

   useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDark));
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // // Function to toggle theme
  // const toggleTheme = () => {
  //   setIsDark(!isDark);
  //   document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  // };

  // Provide theme state and toggle function to all children
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={isDark ? 'dark' : 'light'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};