import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CoinListPage } from '@/pages/coin-list/ui/CoinListPage';

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/coin-list" replace />} />
        <Route path="/coin-list" element={<CoinListPage />} />
      </Routes>
    </BrowserRouter>
  );
};
