import { motion } from 'framer-motion';
import {
    Code2,
    Database,
    Palette,
    Terminal,
    Wrench,
    Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillsProps {
    skills: string[];
}

// Icon mapping for common skills
const getSkillIcon = (skill: string) => {
    const lowerSkill = skill.toLowerCase();

    if (lowerSkill.includes('react') || lowerSkill.includes('vue') || lowerSkill.includes('angular')) {
        return Code2;
    }
    if (lowerSkill.includes('node') || lowerSkill.includes('express') || lowerSkill.includes('api')) {
        return Terminal;
    }
    if (lowerSkill.includes('database') || lowerSkill.includes('sql') || lowerSkill.includes('mongo')) {
        return Database;
    }
    if (lowerSkill.includes('css') || lowerSkill.includes('tailwind') || lowerSkill.includes('design')) {
        return Palette;
    }
    if (lowerSkill.includes('typescript') || lowerSkill.includes('javascript')) {
        return Zap;
    }

    return Wrench;
};

export default function Skills({ skills }: SkillsProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, ease: 'easeOut' },
        },
    };

    return (
        <section className="py-20 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Skills & <span className="gradient-text">Technologies</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Tools and technologies I work with
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    {skills.map((skill, index) => {
                        const Icon = getSkillIcon(skill);

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className={cn(
                                    'glass rounded-xl px-6 py-4 flex items-center gap-3',
                                    'hover:glow-effect transition-all duration-300',
                                    'border border-border/50 hover:border-primary/50'
                                )}
                            >
                                <Icon className="w-5 h-5 text-primary" />
                                <span className="font-medium text-foreground">{skill}</span>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
