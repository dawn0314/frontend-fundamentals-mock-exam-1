import { SavingsProduct } from 'api/types';
import { useEffect, useState } from 'react';
import { http } from 'tosslib';

export function useSavingsProduct() {
  const [products, setProducts] = useState<SavingsProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await http.get<SavingsProduct[]>('/api/savings-products');
        setProducts(data);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, loading, error };
}
