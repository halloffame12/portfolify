import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Blog from './components/Blog';
import Footer from './components/Footer';
import SEO from './components/SEO';
import ThemeToggle from './components/ThemeToggle';
import portfolioData from './config/portfolio.json';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check localStorage first, then use config default
        const stored = localStorage.getItem('theme');
        if (stored) return stored === 'dark';
        return portfolioData.defaultDarkMode ?? true;
    });

    useEffect(() => {
        // Apply theme class to document
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    return (
        <>
            <SEO
                title={`${portfolioData.name} - ${portfolioData.role}`}
                description={portfolioData.bio}
                name={portfolioData.name}
            />
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
                {portfolioData.enableDarkMode && (
                    <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                )}
                <Hero data={portfolioData} />
                <Projects projects={portfolioData.projects} />
                <Skills skills={portfolioData.skills} />
                {portfolioData.enableBlog && <Blog />}
                <Footer social={portfolioData.social} name={portfolioData.name} />
            </div>
        </>
    );
}

export default App;
