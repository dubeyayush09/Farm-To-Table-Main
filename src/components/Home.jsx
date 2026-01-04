import React, { useState } from 'react';
import { Heart,  ShoppingCart, User } from 'lucide-react';


import { Route, Routes } from 'react-router-dom';

import Header from './Header.js';
import Hero from './Hero.js';
import SaleOfTheMonth from './SaleOfTheMonth.js';
import ShopByCategory from './ShopByCategory.js';
import FeaturedProducts from './FeaturedProducts.js';
import Footer from './Footer.js';
import '../App.css';




const Home = () => {
  const[loggedin , setlogin] = useState(false);
  return (
    <div className="app">
 
      <Header loggedin={loggedin} setlogin={setlogin} />
      <Hero />
      <SaleOfTheMonth />
      <ShopByCategory />
      <FeaturedProducts />
      <Footer/>
      
    </div>
  );
};

export default Home;