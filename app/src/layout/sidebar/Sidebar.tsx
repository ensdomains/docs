'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

import { Navigation } from './_legacy/sidenav';

export const Sidebar = () => {
    const pathname = usePathname();

    if (pathname === '/') return;

    return (
        <motion.div
            layoutScroll
            className="border-ens-light-border dark:border-ens-dark-border fixed inset-0 top-[4rem] z-40 hidden w-72 border-r lg:block"
        >
            <Navigation />
            {/* {Navigation({})} */}
        </motion.div>
    );
};
