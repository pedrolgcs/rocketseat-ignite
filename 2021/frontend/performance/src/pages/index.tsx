import { FormEvent, useCallback, useState } from 'react';
import type { NextPage } from 'next';

// components
import { SearchResults } from '../components/SearchResults';

type Product = {
  id: string;
  price: string;
  title: string;
};

type Results = {
  products: Product[];
  totalPrice: number;
};

const Home: NextPage = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({
    products: [],
    totalPrice: 0,
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const totalPrice = data.reduce(
      (acc: number, curr: Product) => (acc += parseInt(curr.price)),
      0
    );

    setResults({ products: [...data], totalPrice });
  }

  const addToWishlist = useCallback(async (id: string) => {
    return console.log(id);
  }, []);

  return (
    <main>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="produto"
          value={search}
          onChange={(event) => setSearch(event.target.value.trim())}
        />

        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        products={results.products}
        totalPrice={results.totalPrice}
        onAddToWishlist={addToWishlist}
      />
    </main>
  );
};

export default Home;
