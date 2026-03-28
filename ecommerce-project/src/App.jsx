import { Routes , Route } from 'react-router'
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPage';
import './App.css'

function App() {


  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/orders" element={<h1>Orders Page</h1>} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  )
}

export default App
