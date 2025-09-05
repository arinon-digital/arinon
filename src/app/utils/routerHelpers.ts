'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Helper function to convert React Router Link to Next.js Link
export const RouterLink = ({ to, children, ...props }: { to: string; children: React.ReactNode; [key: string]: any }) => {
  return (
    <Link href={to} {...props}>
      {children}
    </Link>
  );
};

// Helper function to convert React Router useNavigate to Next.js useRouter
export const useRouterNavigation = () => {
  const router = useRouter();
  
  return {
    navigate: (to: string) => router.push(to),
    goBack: () => router.back(),
    goForward: () => router.forward(),
    replace: (to: string) => router.replace(to)
  };
};

// Helper function to convert React Router useParams to Next.js params
export const useParamsHelper = (params: any) => {
  return params;
};
