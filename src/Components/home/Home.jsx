import React from 'react';
import RandomRecipes from '../randomRecipes/RandomRecipes';
import WhatToCook from '../whatToCook/WhatToCook';
import './Home.css'

const Home = () => {
    return (
        <div className='homeContainer'>
            <RandomRecipes />
            <WhatToCook />
        </div>
    )
}

export default Home;