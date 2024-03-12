import { Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import React from 'react';

=======
import React, { useState } from 'react';

import Search from "./components/Search.tsx";
>>>>>>> main
import Home from './components/Home.tsx';
import About from './components/About.tsx';
import Contact from './components/Contact.tsx';
import Signup from "./components/Signup.tsx";
import Nav from './components/Nav.tsx';
import Checkout from './components/Checkout.tsx';
<<<<<<< HEAD
import Product from './components/Product.tsx';

const App = () => {
    return (
        <div>
=======

const App = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event: any) => {setSearchTerm(event.target.value)};
    return (
        <div>
            <div>
                <input
                    type="search"
                    placeholder="Search product..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <ul>
                    <Search product_name={searchTerm} />
                </ul>
            </div>
>>>>>>> main
            <Nav />
            <Routes>
                <Route path="/" element={ <Home /> }/>
                <Route path="/about" element={ <About /> }/>
                <Route path="/contact" element={ <Contact /> }/>
                <Route path="/signup" element={ <Signup /> }/>
<<<<<<< HEAD
                <Route path="/checkout" element={ <Checkout /> }/>
                <Route path="/product/:ProductID" element={ <Product /> }/>
=======
                <Route path="/checkout" element={<Checkout/>}/>
>>>>>>> main
            </Routes>
        </div>
    )    
}

export default App;