import LandingHero from './components/LandingHero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Examples from './components/Examples';
import Documentation from './components/Documentation';
import LandingFooter from './components/LandingFooter';

function App() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <LandingHero />
            <Features />
            <HowItWorks />
            <Examples />
            <Documentation />
            <LandingFooter />
        </div>
    );
}

export default App;
