import logo from './logo.svg';
import LandingPage from './components/bootstrap/landingpage';
import Shop from './components/bootstrap/shop';
import Preview from './components/bootstrap/shoppingcart';
import ProductPage from './components/bootstrap/productpage';
import PaymentPage from './components/bootstrap/paymentpage';
import PhilosophyPage from './components/tailwind/philosophyPage';
import CheckoutPage from './components/tailwind/checkoutpage';
import Home from './components/tailwind/homepage'
import Dashboard from './components/tailwind/dashboard'
import  Header  from "./components/tailwind/dashboardComponents/header"
import OrdersTable  from "./components/tailwind/dashboardComponents/ordersTable"
import  Sidebar  from "./components/tailwind//dashboardComponents/sideBar"
import PaymentScreen from './components/tailwind/payment'
import MPesaPaymentPage from './components/tailwind/mpesaPayment'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/tailwind/loginPage';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/shoppingcart' element={<Preview/>}/>
      <Route path='/productpage' element={<ProductPage/>}/>
      <Route path='/paymentpage' element={<PaymentPage/>}/>
      <Route path='/' element={<PhilosophyPage/>}/>
      <Route path='/homepage' element={<Home/>}/>
      <Route path='/checkout' element={<CheckoutPage/>}/>
      <Route path='/payment' element={<PaymentScreen/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/header' element={<Header/>}/>
      <Route path='/orders' element={<OrdersTable/>}/>
      <Route path='/mpesaPayment' element={<MPesaPaymentPage/>}/>
      <Route path='/sidebar' element={<Sidebar/>}/>
      <Route path='/login' element={<LoginPage/>}/>
    </Routes>
    </BrowserRouter>

  );
}

export default App;
