export const navItems = [
  {
    type: 'link',
    href: '/',
    label: 'Home',
  },
  {
    type: 'link',
    label: 'Documentation',
    href: '/text-generator',
  },
  {
    type: 'link',
    label: 'Pricing',
    href: '/pricing',
  },
  {
    type: 'link',
    label: 'Contact',
    href: '/contact',
  },
  {
    type: 'link',
    label: 'Testimonials',
    href: '/testimonials',
  },
] satisfies NavItem[];

type NavItem = Record<string, string | unknown> &
  (
    | {
        type: 'link';
        href: string;
      }
    | {
        type: 'dropdown';
      }
  );
