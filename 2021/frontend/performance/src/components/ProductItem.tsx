import { memo, useState } from 'react';
import dynamic from 'next/dynamic';

// types
import { AddProductToWishlistProps } from './AddProductToWishlist';

// import dynamic components
const AddProductToWishlist = dynamic<AddProductToWishlistProps>(
  () => {
    return import('./AddProductToWishlist').then(
      (module) => module.AddProductToWishlist
    );
  },
  {
    loading: () => <span>Carregando...</span>,
  }
);

type Product = {
  id: string;
  price: string;
  title: string;
};

type ProductItemProps = {
  product: Product;
  onAddToWishlist: (id: string) => void;
};

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        - Adicionar aos favoritos -
      </button>
      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  );
}

const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product);
});

export { ProductItem };
