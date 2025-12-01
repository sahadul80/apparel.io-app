import { Metadata } from 'next';
import ProductCollection from '../components/products';

export const metadata: Metadata = {
  title: 'All Products | APPAREL.IO',
  description: 'Browse our complete collection of premium apparel products across all categories',
};

interface ProductsPageProps {
  searchParams: {
    product_division?: string;
    product_category?: string;
    [key: string]: string | undefined;
  };
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <main className="min-h-screen text-foreground">
      <ProductCollection/>
    </main>
  );
}