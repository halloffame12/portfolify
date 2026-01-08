import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Blog from './components/Blog';
import Footer from './components/Footer';
import SEO from './components/SEO';
import portfolioData from './config/portfolio.json';

function App() {
    return (
        <>
            <SEO
                title={`${portfolioData.name} - ${portfolioData.role}`}
                description={portfolioData.bio}
                name={portfolioData.name}
            />
            <div className="min-h-screen bg-background text-foreground dark">
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
