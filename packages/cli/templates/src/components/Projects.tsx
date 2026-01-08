import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Project {
    name: string;
    description: string;
    tech: string[];
    github?: string;
    demo?: string;
}

interface ProjectsProps {
    projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <section id="projects" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Some of my recent work
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ scale: 1.05, y: -10 }}
                            className={cn(
                                'glass rounded-xl p-6 hover:glow-effect transition-all duration-300',
                                'border border-border/50 hover:border-primary/50'
                            )}
                        >
                            <h3 className="text-2xl font-bold mb-3 gradient-text">
                                {project.name}
                            </h3>

                            <p className="text-muted-foreground mb-4 line-clamp-3">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tech.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            'flex items-center gap-2 px-4 py-2 rounded-lg',
                                            'bg-muted hover:bg-muted/80 transition-colors',
                                            'text-sm font-medium'
                                        )}
                                    >
                                        <Github className="w-4 h-4" />
                                        Code
                                    </a>
                                )}

                                {project.demo && (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            'flex items-center gap-2 px-4 py-2 rounded-lg',
                                            'bg-gradient-to-r from-primary to-secondary',
                                            'text-sm font-medium hover:opacity-90 transition-opacity'
                                        )}
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Demo
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
