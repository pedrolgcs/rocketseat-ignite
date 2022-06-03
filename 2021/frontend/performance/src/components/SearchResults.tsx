import { List, ListRowRenderer, AutoSizer } from 'react-virtualized';

// components
import { ProductItem } from './ProductItem';

type Product = {
  id: string;
  price: string;
  title: string;
};

type SearchResultsProps = {
  products: Product[];
  totalPrice: number;
  onAddToWishlist: (id: string) => void;
};

function SearchResults({
  products,
  totalPrice,
  onAddToWishlist,
}: SearchResultsProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={products[index]}
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    );
  };

  return (
    <>
      <h2>{totalPrice}</h2>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            rowHeight={30}
            width={width}
            overscanRowCount={10}
            rowCount={products.length}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </>
  );
}

export { SearchResults };
