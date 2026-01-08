export interface Theme {
    name: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        foreground: string;
        muted: string;
    };
}

export const themes: Record<string, Theme> = {
    'modern-dark': {
        name: 'Modern Dark',
        colors: {
            primary: '220 90% 56%',
            secondary: '280 80% 60%',
            accent: '340 82% 52%',
            background: '224 71% 4%',
            foreground: '213 31% 91%',
            muted: '223 47% 11%'
        }
    },
    'gradient-purple': {
        name: 'Gradient Purple',
        colors: {
            primary: '271 91% 65%',
            secondary: '296 80% 60%',
            accent: '326 78% 66%',
            background: '240 10% 3.9%',
            foreground: '0 0% 98%',
            muted: '240 3.7% 15.9%'
        }
    },
    'ocean-blue': {
        name: 'Ocean Blue',
        colors: {
            primary: '199 89% 48%',
            secondary: '187 85% 53%',
            accent: '173 80% 40%',
            background: '200 50% 5%',
            foreground: '180 20% 96%',
            muted: '200 40% 12%'
        }
    },
    'sunset-orange': {
        name: 'Sunset Orange',
        colors: {
            primary: '25 95% 53%',
            secondary: '45 93% 47%',
            accent: '340 82% 52%',
            background: '20 14.3% 4.1%',
            foreground: '0 0% 95%',
            muted: '0 0% 15%'
        }
    },
    'minimal-light': {
        name: 'Minimal Light',
        colors: {
            primary: '222 47% 11%',
            secondary: '215 28% 17%',
            accent: '262 83% 58%',
            background: '0 0% 100%',
            foreground: '222 47% 11%',
            muted: '210 40% 96.1%'
        }
    }
};

export function getThemeChoices(): string[] {
    return Object.keys(themes);
}

export function getTheme(key: string): Theme {
    return themes[key] || themes['modern-dark'];
}
