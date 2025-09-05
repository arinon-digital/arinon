'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const RoutesScrollToTop = () => {
    // Extracts pathname property from Next.js router
    const pathname = usePathname();

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // Return null since this component does not need to render anything
    return null;
}

export default RoutesScrollToTop;