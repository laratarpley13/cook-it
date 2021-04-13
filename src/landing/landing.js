import React from 'react';
import './landing.css'

function Landing(props) {
  return (
    <>
        <header class="landing-nav">
            <h1>CookIt</h1>
            <button onClick={() => props.history.push('/sign-up')}>Sign Up</button>
            <button onClick={() => props.history.push('/sign-in')}>Sign In</button>
        </header>
        <div>
            <div class="about">
                <h2>About Us</h2>
                <p>
                A place for cooks of all levels to share their delicous and creative recipes they have made with others and for cooks to recreate other's dishes and post pictures of the end result.
                </p>
            </div>
            <div class="how-it-works">
                <h3>How it works:</h3>
                <p>Post recipes that you have created on to your profile</p>
                <p>Browse Recipes in the "Explore" page, and sort by catogory or dietary tags</p>
                <p>Try new recipes and leave a picture of your recipe re-make for others to see and your thoughts on the recipe!</p>
                <p>Have fun creating and making new dishes!</p>
            </div>   
        </div>
    </>
  );
}

export default Landing;
