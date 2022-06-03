import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';

// services
import { api } from '../services/api';

// types
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storageCart = localStorage.getItem('@RocketShoes:cart');

    if (storageCart) {
      return JSON.parse(storageCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      const productExistsCart = cart.find(
        (product) => product.id === productId
      );

      const currentAmount = productExistsCart ? productExistsCart.amount : 0;
      const newAmount = currentAmount + 1;

      const { data: stock } = await api.get<Stock>(`/stock/${productId}`);

      if (newAmount > stock.amount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      let newCart: Product[] = [];

      if (productExistsCart) {
        newCart = cart.map((product) =>
          product.id !== productId
            ? product
            : {
                ...product,
                amount: newAmount,
              }
        );

        setCart(newCart);
      } else {
        const { data } = await api.get(`/products/${productId}`);

        const product = {
          ...data,
          amount: newAmount,
        };

        newCart = [...cart, product];

        setCart(newCart);
      }

      localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart));
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const productExistsCart = cart.find(product => product.id === productId);

      if (!productExistsCart) {
        throw new Error('Produto não encontrado no carrinho')
      }

      const newCart = cart.filter((product) => product.id !== productId);

      setCart(newCart);
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart));
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount < 1) {
        throw new Error('Alteração inválida');
      }

      const { data: stock } = await api.get<Stock>(`/stock/${productId}`);

      if (stock.amount <= amount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      const newCart = cart.map((product) =>
        product.id === productId ? { ...product, amount } : product
      );

      localStorage.setItem(`@RocketShoes:cart`, JSON.stringify(newCart))

      setCart(newCart)
    } catch {
      toast.error('Erro na alteração de quantidade do produto')
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
