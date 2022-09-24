import { Routes, Route } from 'react-router-dom';
import TransactionFlow from './pages/TransactionFlow';

const Router = () => {
  return (
    <Routes>
      <Route path={'/'} element={<TransactionFlow />} />
    </Routes>
  );
}

export default Router;