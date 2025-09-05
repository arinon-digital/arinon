"use client";

import NextLink from "next/link";
import { useParams as useNextParams, usePathname, useSearchParams } from "next/navigation";
import React, { AnchorHTMLAttributes, PropsWithChildren } from "react";

type LinkProps = PropsWithChildren<
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    to: string;
  }
>;

export function Link({ to, children, ...rest }: LinkProps) {
  return (
    <NextLink href={to} {...rest}>
      {children}
    </NextLink>
  );
}

export function useParams<T extends Record<string, string | string[]>>() {
  return useNextParams() as unknown as T;
}

export function useLocation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = React.useMemo(() => {
    const query = searchParams.toString();
    return query ? `?${query}` : "";
  }, [searchParams]);

  // Hash is not tracked by Next.js routing; read from window if available
  const hash = typeof window !== "undefined" ? window.location.hash : "";

  return { pathname, search, hash };
}

// No-op exports to satisfy potential imports
export const NavLink = Link;
export const BrowserRouter = ({ children }: PropsWithChildren) => <>{children}</>;
export const Routes = ({ children }: PropsWithChildren) => <>{children}</>;
export const Route = ({ children }: PropsWithChildren) => <>{children}</>;


