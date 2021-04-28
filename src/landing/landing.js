import React from 'react';
import './landing.css'

function Landing(props) {
  return (
    <>
        <header className="landing-nav">
            <h1>CookIt</h1>
            <button onClick={() => props.history.push('/sign-up')}>Sign Up</button>
            <button onClick={() => props.history.push('/sign-in')}>Sign In</button>
        </header>
        <section className="landing-page">
            <div className="background-img" style={{backgroundImage: `url("https://images.pexels.com/photos/6248852/pexels-photo-6248852.jpeg?auto=compress&cs=tinysrgb&h=650&w=940")`}}></div>
            <div className="about">
                <h2>About Us</h2>
                <p>
                A place for cooks of all levels to share their delicous and creative recipes they have made with others and for cooks to recreate other's dishes and post pictures of the end result.
                </p>
            </div>
            <div className="how-it-works">
                <h3>How it works:</h3>
                <p>Post recipes that you have created onto your profile</p>
                <p>Browse Recipes in the "Explore" page, and sort by catogory or dietary tags</p>
                <p>Try new recipes and leave a picture of your recipe re-make for others to see and your thoughts on the recipe!</p>
                <p>Have fun creating and making new dishes!</p>
            </div>   
        </section>
    </>
  );
}

export default Landing;
