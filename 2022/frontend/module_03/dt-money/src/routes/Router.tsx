import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from '@/layouts';
import { Transactions } from '@/pages';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Transactions />} />
      </Route>
    </Routes>
  );
}

export { Router };
