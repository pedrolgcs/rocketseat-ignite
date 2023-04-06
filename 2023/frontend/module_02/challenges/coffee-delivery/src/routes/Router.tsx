import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from '@/layouts';
import { Home } from '@/pages';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<h1>Cart</h1>} />
      </Route>
    </Routes>
  );
}

export { Router };
