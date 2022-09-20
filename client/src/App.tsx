import { Routes, Route } from 'react-router-dom';
import TransactionFlow from './transactionFlow';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<TransactionFlow />} />
    </Routes>
  );
}

export default App;
