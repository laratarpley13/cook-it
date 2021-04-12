import React from 'react';

function Landing() {
  return (
    <>
        <header class="landing-nav">
            <h1>CookIt</h1>
            <a href="./sign-up.html">Sign Up</a>
            <a href="./sign-in.html">Sign In</a>
            <a href="./explore.html">Explore</a>
            <a href="./recipe-view.html">Recipe</a>
            <a href="./user-view.html">User</a>
            <a href="./add-recipe.html">Add Recipe</a>
            <a href="./edit-recipe.html">Edit Recipe</a>
            <a href="./add-comment.html">Add Comment</a>
            <a href="./edit-comment.html">Edit Comment</a>
        </header>
        <body>
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
        </body>
    </>
  );
}

export default Landing;
