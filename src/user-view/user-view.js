import React from 'react';

function UserView() {
  return (
    <>
        <header class="landing-nav">
            <h1>CookIt</h1>
            <a href="#">My Recipes</a>
            <a href="#">Add Recipe</a>
            <a href="#">Sign Out</a>
        </header>
        <div>
            <h2>User's Recipes</h2>
            <section class="user-recipes">
                <div class="recipe">
                    <div class="image"></div>
                    <h3>Test Recipe Name</h3>
                    <p>A delicious test recipe, made with html and css.</p>
                    <div class="tag-container">
                        <span class="tag">Test</span>
                        <span class="tag">Test</span>
                        <span class="tag">Test</span>
                    </div>
                </div>
                <div class="recipe">
                    <div class="image"></div>
                    <h3>Test Recipe Name</h3>
                    <p>A delicious test recipe, made with html and css.</p>
                    <div class="tag-container">
                        <span class="tag">Test</span>
                        <span class="tag">Test</span>
                        <span class="tag">Test</span>
                    </div>
                </div>
                <div class="recipe">
                    <div class="image"></div>
                    <h3>Test Recipe Name</h3>
                    <p>A delicious test recipe, made with html and css.</p>
                    <div class="tag-container">
                        <span class="tag">Test</span>
                        <span class="tag">Test</span>
                        <span class="tag">Test</span>
                    </div>
                </div>
            </section>
            <h2>User's Recipe Attempts</h2>
            <section class="user-comments">
                <div class="comment">
                    <div class="response-img"></div>
                    <p>A fantastic recipe!</p>
                </div>
                <div class="comment">
                    <div class="response-img"></div>
                    <p>A fantastic recipe!</p>
                </div>
                <div class="comment">
                    <div class="response-img"></div>
                    <p>A fantastic recipe!</p>
                </div>
                <div class="comment">
                    <div class="response-img"></div>
                    <p>A fantastic recipe!</p>
                </div>
                <div class="comment">
                    <div class="response-img"></div>
                    <p>A fantastic recipe!</p>
                </div>
            </section>
        </div>  
    </>
  );
}

export default UserView;