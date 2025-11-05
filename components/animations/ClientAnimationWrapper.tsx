'use client';

import { useEffect, useState, ReactNode } from 'react';

interface ClientAnimationWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

/**
 * Wrapper component that ensures children only render on client-side
 * Prevents hydration mismatches for animation-dependent components
 */
const ClientAnimationWrapper = ({ 
  children, 
  fallback = null, 
  className = "" 
}: ClientAnimationWrapperProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR and initial client render, show fallback or nothing
  if (!isClient) {
    return fallback ? <div className={className}>{fallback}</div> : null;
  }

  // After hydration, show the actual content
  return <div className={className}>{children}</div>;
};

export default ClientAnimationWrapper;
