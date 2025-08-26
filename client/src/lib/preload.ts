// Preload critical chunks and resources
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Preload critical routes that are likely to be visited
  const criticalRoutes = [
    () => import('@/pages/about'),
    () => import('@/pages/services'),
    () => import('@/pages/portfolio/index'),
    () => import('@/pages/contact'),
  ];

  // Use requestIdleCallback to preload when the browser is idle
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      criticalRoutes.forEach((importFn) => {
        importFn().catch(() => {
          // Ignore preload errors - the route will load normally when needed
        });
      });
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      criticalRoutes.forEach((importFn) => {
        importFn().catch(() => {
          // Ignore preload errors
        });
      });
    }, 2000);
  }
}

// Preload resources on user interaction
export function setupPreloadOnInteraction() {
  if (typeof window === 'undefined') return;

  const routePreloadMap: Record<string, () => Promise<any>> = {
    '/about': () => import('@/pages/about'),
    '/services': () => import('@/pages/services'),
    '/portfolio': () => import('@/pages/portfolio/index'),
    '/contact': () => import('@/pages/contact'),
    '/dashboard': () => import('@/pages/dashboard'),
    '/login': () => import('@/pages/login'),
    '/register': () => import('@/pages/register'),
  };

  // Preload on hover/focus for links
  document.addEventListener('mouseover', (event) => {
    const target = event.target as HTMLElement;
    const link = target.closest('a[href]') as HTMLAnchorElement;
    
    if (link && link.hostname === window.location.hostname) {
      const path = link.pathname;
      const preloadFn = routePreloadMap[path];
      if (preloadFn) {
        preloadFn().catch(() => {
          // Ignore preload errors
        });
      }
    }
  });

  // Preload on touchstart for mobile
  document.addEventListener('touchstart', (event) => {
    const target = event.target as HTMLElement;
    const link = target.closest('a[href]') as HTMLAnchorElement;
    
    if (link && link.hostname === window.location.hostname) {
      const path = link.pathname;
      const preloadFn = routePreloadMap[path];
      if (preloadFn) {
        preloadFn().catch(() => {
          // Ignore preload errors
        });
      }
    }
  });
}