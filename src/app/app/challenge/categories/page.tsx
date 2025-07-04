'use client';

import { Button } from '@/components/ui/button';
import { LayoutDashboard, Plus, Minus, X, Divide, Sparkles, Sigma, Percent, FunctionSquare, SquareRadical, Braces, Square, RectangleHorizontal, Triangle, Circle, Combine, Milestone, Anchor, Key, BarChart, BetweenHorizontalStart, Pilcrow, UnfoldVertical, PercentCircle, Banknote, UtilityPole, Timer, Puzzle, LayoutGrid, ArrowLeft, Waves, TrendingUp, Box, Cylinder, MoveHorizontal, ArrowRightLeft, Landmark, Receipt } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { MathCategory } from '@/lib/types';
import { useRouter } from 'next/navigation';
import React from 'react';

const categoryGroups: Record<string, MathCategory[]> = {
    'Arithmetic': ['addition', 'subtraction', 'multiplication', 'division', 'mixed'],
    'Advanced Arithmetic': ['fractions', 'decimals', 'percentages', 'ratios', 'exponents', 'square-roots', 'order-of-operations', 'factorial'],
    'Algebra': ['algebra', 'linear-equations', 'quadratic-equations', 'logarithms', 'polynomial-addition', 'polynomial-subtraction', 'inequalities'],
    'Geometry': ['area-of-squares', 'area-of-rectangles', 'area-of-triangles', 'circumference', 'pythagorean-theorem', 'volume-cube', 'volume-sphere', 'volume-cylinder', 'distance-formula', 'slope-formula'],
    'Trigonometry': ['sine', 'cosine', 'tangent'],
    'Calculus': ['basic-derivatives', 'basic-integrals'],
    'Discrete Math': ['permutations', 'combinations', 'set-union', 'set-intersection'],
    'Number Theory': ['prime-numbers', 'factors', 'multiples', 'roman-numerals'],
    'Statistics & Probability': ['mean', 'median', 'mode', 'range', 'simple-probability'],
    'Practical Math': ['simple-interest', 'compound-interest', 'discounts', 'sales-tax', 'unit-conversion', 'time-calculation'],
    'Logic': ['logic-puzzles']
};

const IntersectIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M6 18h6c4.4 0 8-3.6 8-8v-2"/>
        <path d="M18 6H6c-4.4 0-8 3.6-8 8v2"/>
    </svg>
);

const UnionIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M7 18a5 5 0 0 0 10 0V9a5 5 0 1 0-10 0Z"/>
    </svg>
);

const categoryIcons: Record<MathCategory, React.ReactNode> = {
  addition: <Plus />, subtraction: <Minus />, multiplication: <X />, division: <Divide />, mixed: <Sparkles />,
  algebra: <Sigma />, percentages: <Percent />, exponents: <FunctionSquare />, fractions: <Sigma />, decimals: <Milestone />,
  ratios: <BetweenHorizontalStart />, 'square-roots': <SquareRadical />, 'order-of-operations': <Braces />,
  'area-of-squares': <Square />, 'area-of-rectangles': <RectangleHorizontal />, 'area-of-triangles': <Triangle />,
  circumference: <Circle />, 'pythagorean-theorem': <Combine />, 'linear-equations': <Milestone />,
  'quadratic-equations': <Sigma />, 'prime-numbers': <Anchor />, 'factors': <Key />, 'multiples': <Pilcrow />,
  'roman-numerals': <Milestone />, mean: <BarChart />, median: <UnfoldVertical />, mode: <BarChart />,
  range: <UnfoldVertical />, 'simple-probability': <PercentCircle />, 'simple-interest': <Banknote />,
  discounts: <Banknote />, 'unit-conversion': <UtilityPole />, 'time-calculation': <Timer />, 'logic-puzzles': <Puzzle />,
  // Newly Added
  sine: <Waves />, cosine: <Sigma />, tangent: <Sigma />,
  'basic-derivatives': <TrendingUp />, 'basic-integrals': <Sigma />,
  logarithms: <Sigma />, 'polynomial-addition': <Plus />, 'polynomial-subtraction': <Minus />, inequalities: <Sigma />,
  'volume-cube': <Box />, 'volume-sphere': <Circle />, 'volume-cylinder': <Cylinder />, 'distance-formula': <MoveHorizontal />, 'slope-formula': <TrendingUp />,
  permutations: <ArrowRightLeft />, combinations: <Combine />, 'set-union': <UnionIcon />, 'set-intersection': <IntersectIcon />, factorial: <Sigma />,
  'compound-interest': <Landmark />, 'sales-tax': <Receipt />,
};


export default function CategoriesPage() {
    const router = useRouter();

    const handleCategorySelect = (category: MathCategory) => {
        router.push(`/app/challenge?category=${category}`);
    };
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

  return (
    <div className="flex flex-col gap-8">
        <motion.div 
            className="flex items-center justify-between py-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-xl shadow-sm">
                    <LayoutGrid className="h-8 w-8" />
                </div>
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">All Categories</h1>
                    <p className="text-muted-foreground mt-1 text-base">Pick a challenge to test your skills.</p>
                </div>
            </div>
            <Link href="/app" passHref>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-6 w-6" />
                <span className="sr-only">Back to Dashboard</span>
              </Button>
            </Link>
        </motion.div>

        {Object.entries(categoryGroups).map(([groupName, categories]) => (
            <div key={groupName}>
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2">{groupName}</h2>
                <motion.div 
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {categories.map((cat) => (
                        <motion.div 
                            key={cat} 
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="h-full"
                        >
                            <button
                                className="w-full h-28 text-base flex flex-col gap-2 items-center justify-center rounded-xl bg-card border shadow-sm transition-all duration-200 hover:shadow-lg hover:border-primary/50 group text-card-foreground"
                                onClick={() => handleCategorySelect(cat)}
                            >
                                <div className="h-8 w-8 text-primary transition-transform duration-200 group-hover:scale-110">{categoryIcons[cat]}</div>
                                <span className="capitalize text-center text-wrap px-1 font-medium">{cat.replace(/-/g, ' ')}</span>
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        ))}
    </div>
  );
}
