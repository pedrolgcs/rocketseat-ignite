import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

// services
import { api } from '../../services/api';

// utils
import { formatPrice } from '../../util/format';

// hooks
import { useCart } from '../../hooks/useCart';

// styles
import { ProductList } from './styles';
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    if (!sumAmount[product.id]) {
      sumAmount[product.id] = product.amount;
    }

    return sumAmount;
  }, {} as CartItemsAmount);

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get<Product[]>('/products');

      const parseData = data.map((item) => ({
        ...item,
        priceFormatted: formatPrice(item.price),
      }));

      setProducts([...parseData]);
    }

    loadProducts();
  }, []);

  async function handleAddProduct(id: number) {
    await addProduct(id);
  }

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>
          <button
            type="button"
            data-testid="add-product-button"
            onClick={() => handleAddProduct(product.id)}
          >
            <div data-testid="cart-product-quantity">
              <MdAddShoppingCart size={16} color="#FFF" />
              {cartItemsAmount[product.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
};

export default Home;
