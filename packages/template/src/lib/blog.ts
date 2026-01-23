import { useState, useEffect } from 'react';

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    content?: string;
}

// Sample blog posts - in production, these would be loaded from MDX files
export const blogPosts: BlogPost[] = [
    {
        slug: 'welcome',
        title: 'Welcome to My Blog',
        date: new Date().toISOString().split('T')[0],
        excerpt: 'This is my first blog post using MDX. Learn how to customize and add more posts.',
        tags: ['welcome', 'intro', 'mdx']
    },
    {
        slug: 'getting-started-react',
        title: 'Getting Started with React',
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        excerpt: 'Learn the fundamentals of React and build your first component.',
        tags: ['react', 'javascript', 'tutorial']
    },
    {
        slug: 'typescript-tips',
        title: 'TypeScript Tips and Tricks',
        date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
        excerpt: 'Improve your TypeScript skills with these practical tips.',
        tags: ['typescript', 'tips', 'best-practices']
    }
];

export function useBlogPosts() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading blog posts
        setPosts(blogPosts);
        setLoading(false);
    }, []);

    return { posts, loading };
}

export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function getReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
}
