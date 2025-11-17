// types/menu.ts
export interface MenuItem {
  title: string;
  href: string;
  hasChildren?: boolean;
  children?: MenuItem[];
  image?: {
    src: string;
    alt: string;
  };
}

export interface HeaderProps {
  // Add any props you might need
}