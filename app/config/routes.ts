/**
 * Centralized Route Configuration
 *
 * This file serves as the single source of truth for all application routes.
 * It drives:
 * - Rail navigation (left icon rail)
 * - Sidebar navigation (collapsible sections)
 * - Command palette search (cmd+k)
 * - Breadcrumb generation
 * - Page metadata (title, description, SEO)
 * - Empty states and placeholders
 *
 * Architecture Benefits:
 * - Single source of truth for navigation
 * - Type-safe route definitions
 * - Automatic generation of navigation components
 * - Consistent metadata across the app
 * - Easier to maintain and update routes
 * - Can generate breadcrumbs automatically
 *
 * Considerations:
 * - Need to keep route definitions in sync with actual page files
 * - Large route trees might need hierarchical organization
 * - Dynamic routes (/:id) need special handling
 * - Permissions/visibility logic can be centralized here
 */

export interface RouteConfig {
  /** The route path (e.g., '/forms/feed') */
  path: string;
  /** Display label for the route */
  label: string;
  /** Icon name (e.g., 'lucide:home') */
  icon: string;
  /** Optional color tint for icon */
  tint?: string;
  /** Optional badge text */
  badge?: string | (() => string | number);
  /** Page metadata */
  meta?: {
    /** Page title */
    title?: string;
    /** Page description */
    description?: string;
    /** SEO title (if different from display title) */
    seoTitle?: string;
    /** SEO description */
    seoDescription?: string;
    /** Subtitle for Page component */
    subtitle?: string;
    /** Subtitle color */
    subtitleColor?: string;
    /** Show back button */
    showBackButton?: boolean;
    /** Full width page */
    fullWidth?: boolean;
  };
  /** Whether this route should appear in rail navigation */
  inRail?: boolean;
  /** Rail position: 'primary' | 'secondary' */
  railPosition?: "primary" | "secondary";
  /** Whether this route should appear in command palette */
  inCommandPalette?: boolean;
  /** Command palette search keywords (for better search) */
  searchKeywords?: string[];
  /** Child routes (for nested navigation) */
  children?: RouteConfig[];
  /** Whether route requires authentication */
  requiresAuth?: boolean;
  /** Custom visibility function */
  visible?: () => boolean;
  /** Order in navigation (lower = appears first) */
  order?: number;
}

/**
 * Hierarchical route configuration
 * Organized by top-level sections
 */
export const routeConfig: RouteConfig[] = [
  {
    path: "/forms",
    label: "Forms",
    icon: "lucide:file-text",
    tint: "text-emerald-300",
    meta: {
      subtitle: "Forms",
      subtitleColor: "text-emerald-300",
    },
    children: [
      {
        path: "/forms/feed",
        label: "Live counter",
        icon: "lucide:loader-2",
        tint: "text-emerald-300",
        inRail: true,
        railPosition: "primary",
        inCommandPalette: true,
        order: 1,
        meta: {
          title: "Live Counter",
          description: "A simple counter application built with Nuxt & UI Thing.",
        },
      },
      {
        path: "/forms/new",
        label: "Create form",
        icon: "lucide:square-plus",
        tint: "text-sky-300",
        inCommandPalette: true,
        order: 2,
        meta: {
          title: "Create form",
          description:
            "Placeholder builder canvas. Drop in your drag-and-drop fields, schema editor, or AI scaffolding UI.",
          subtitle: "Forms",
          subtitleColor: "text-sky-300",
        },
      },
      {
        path: "/forms/library",
        label: "Templates",
        icon: "lucide:library",
        tint: "text-indigo-300",
        inCommandPalette: true,
        order: 3,
        meta: {
          title: "Template library",
          description:
            "Placeholder gallery for form templates. Wire this to your presets or spaces marketplace.",
          subtitle: "Forms",
          subtitleColor: "text-indigo-300",
        },
      },
    ],
  },
  {
    path: "/layouts",
    label: "Layouts",
    icon: "lucide:layout-dashboard",
    tint: "text-violet-300",
    meta: {
      subtitle: "Layouts",
      subtitleColor: "text-violet-300",
    },
    children: [
      {
        path: "/layouts/templates",
        label: "Templates",
        icon: "lucide:layout-grid",
        tint: "text-violet-300",
        inRail: true,
        railPosition: "primary",
        inCommandPalette: true,
        order: 1,
        meta: {
          title: "Page templates",
          description:
            "A collection of ready-to-use page layouts and templates for common UI patterns.",
          subtitle: "Layouts",
          subtitleColor: "text-sky-300",
        },
      },
      {
        path: "/layouts/playground",
        label: "Playground",
        icon: "lucide:layout-template",
        tint: "text-sky-300",
        inRail: true,
        railPosition: "primary",
        inCommandPalette: true,
        order: 2,
      },
      {
        path: "/layouts/shells",
        label: "Shells",
        icon: "lucide:panels-top-left",
        tint: "text-cyan-300",
        inCommandPalette: true,
        order: 3,
      },
      {
        path: "/layouts/sections",
        label: "Sections",
        icon: "lucide:rows",
        tint: "text-emerald-300",
        inCommandPalette: true,
        order: 4,
      },
    ],
  },
  {
    path: "/tokens",
    label: "Design tokens",
    icon: "lucide:swatch-book",
    tint: "text-indigo-300",
    meta: {
      subtitle: "Design tokens",
      subtitleColor: "text-indigo-300",
    },
    children: [
      {
        path: "/tokens",
        label: "Overview",
        icon: "lucide:swatch-book",
        tint: "text-indigo-300",
        inCommandPalette: true,
        order: 1,
      },
      {
        path: "/tokens/colors",
        label: "Colors",
        icon: "lucide:palette",
        tint: "text-pink-300",
        inCommandPalette: true,
        order: 2,
      },
      {
        path: "/tokens/type",
        label: "Typography",
        icon: "lucide:type",
        tint: "text-amber-300",
        inCommandPalette: true,
        order: 3,
        meta: {
          title: "Typography kit",
          description:
            "Placeholder specimens for headings, body, labels, and numeric styles. Replace with your type scale.",
          subtitle: "Design tokens",
          subtitleColor: "text-amber-300",
        },
      },
    ],
  },
  {
    path: "/activity",
    label: "Activity",
    icon: "lucide:activity",
    tint: "text-orange-300",
    meta: {
      subtitle: "Activity",
      subtitleColor: "text-orange-300",
    },
    children: [
      {
        path: "/activity/feed",
        label: "Feed",
        icon: "lucide:activity",
        tint: "text-orange-300",
        inRail: true,
        railPosition: "primary",
        inCommandPalette: true,
        order: 1,
      },
      {
        path: "/activity/analytics",
        label: "Analytics",
        icon: "lucide:chart-line",
        tint: "text-lime-300",
        inCommandPalette: true,
        order: 2,
      },
      {
        path: "/activity/responses",
        label: "Responses",
        icon: "lucide:inbox",
        tint: "text-sky-300",
        badge: "24",
        inCommandPalette: true,
        order: 3,
      },
    ],
  },
  {
    path: "/settings",
    label: "Settings",
    icon: "lucide:settings",
    tint: "text-purple-300",
    meta: {
      subtitle: "Settings",
      subtitleColor: "text-purple-300",
    },
    children: [
      {
        path: "/settings/project",
        label: "Project",
        icon: "lucide:settings",
        tint: "text-purple-300",
        inRail: true,
        railPosition: "primary",
        inCommandPalette: true,
        order: 1,
        meta: {
          title: "Project settings",
          description: "Customize your experience with toggles and preferences.",
          subtitle: "Settings",
          subtitleColor: "text-purple-300",
        },
      },
      {
        path: "/settings/profile",
        label: "Profile",
        icon: "lucide:user",
        tint: "text-sky-300",
        inRail: true,
        railPosition: "secondary",
        inCommandPalette: true,
        order: 2,
      },
      {
        path: "/settings/notifications",
        label: "Notifications",
        icon: "lucide:bell",
        tint: "text-pink-300",
        badge: "3",
        inRail: true,
        railPosition: "secondary",
        inCommandPalette: true,
        order: 3,
      },
    ],
  },
];

/**
 * Flatten route tree for easier access
 */
export function flattenRoutes(routes: RouteConfig[]): RouteConfig[] {
  const flattened: RouteConfig[] = [];

  function traverse(route: RouteConfig) {
    // Add route itself if it has a path (not just a parent)
    if (route.path && route.path !== route.label.toLowerCase()) {
      flattened.push(route);
    }

    // Recursively add children
    if (route.children) {
      route.children.forEach(traverse);
    }
  }

  routes.forEach(traverse);
  return flattened;
}

/**
 * Get all routes for command palette
 */
export function getCommandPaletteRoutes(): RouteConfig[] {
  return flattenRoutes(routeConfig)
    .filter((route) => route.inCommandPalette !== false)
    .sort((a, b) => (a.order || 999) - (b.order || 999));
}

/**
 * Get routes for rail navigation
 */
export function getRailRoutes(position: "primary" | "secondary"): RouteConfig[] {
  return flattenRoutes(routeConfig)
    .filter((route) => route.inRail && route.railPosition === position)
    .sort((a, b) => (a.order || 999) - (b.order || 999));
}

/**
 * Get sidebar section for a given path
 */
export function getSidebarSection(path: string): RouteConfig | null {
  // Find the section that matches the path prefix
  const sections = routeConfig.filter((section) => path.startsWith(section.path));

  if (sections.length === 0) return null;

  // Return the most specific match (longest path)
  return sections.reduce((prev, current) =>
    current.path.length > prev.path.length ? current : prev
  );
}

/**
 * Get breadcrumbs for a given path
 */
export function getBreadcrumbs(path: string): Array<{ label: string; path?: string }> {
  const breadcrumbs: Array<{ label: string; path?: string }> = [];
  const allRoutes = flattenRoutes(routeConfig);

  // Find the current route
  const currentRoute = allRoutes.find((r) => r.path === path);
  if (!currentRoute) return breadcrumbs;

  // Find parent section
  const section = getSidebarSection(path);
  if (section) {
    breadcrumbs.push({ label: section.label, path: section.children?.[0]?.path });
    breadcrumbs.push({ label: currentRoute.label });
  }

  return breadcrumbs;
}

/**
 * Get route metadata for a given path
 */
export function getRouteMeta(path: string): RouteConfig["meta"] | null {
  const allRoutes = flattenRoutes(routeConfig);
  const route = allRoutes.find((r) => r.path === path);
  return route?.meta || null;
}
