import './App.css';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import {Routes, Route, Navigate} from 'react-router-dom';
import PopularProducts from './components/popularProducts/PopularProducts';
import Newsletter from './components/newsletter/Newsletter';
import Footer from './components/footer/Footer';
import Signup from './components/signup/Signup';
import Signin from './components/signin/Signin';
import Products from './components/products/Products';
import ProductDetail from './components/productDetail/ProductDetail'
import { useSelector } from 'react-redux';

function App() {
   
  const { user } = useSelector((state) => state.auth)


  return (
    <div >
      <Routes>
      <Route path='/' element={
          <>
            <Navbar />
            <Hero />
            <PopularProducts />
            <Newsletter />
            <Footer />
          </>
        } />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
        <Route path='/signin' element={!user ? <Signin /> : <Navigate to='/' />} />
        <Route path='/product' element={
          <>
            <Navbar />
            <Products />
            <Footer />
          </>
        } />
        <Route path='/productDetail/:id' element={
          <>
            <Navbar />
            <ProductDetail />
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
