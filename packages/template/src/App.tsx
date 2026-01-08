import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Blog from './components/Blog';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import SEO from './components/SEO';
import portfolioData from './config/portfolio.json';

function App() {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle('light', savedTheme === 'light');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('light', newTheme === 'light');
    };

    return (
        <>
            <SEO
                title={`${portfolioData.name} - ${portfolioData.role}`}
                description={portfolioData.bio}
                name={portfolioData.name}
            />
            <div className="min-h-screen bg-background text-foreground">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
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
