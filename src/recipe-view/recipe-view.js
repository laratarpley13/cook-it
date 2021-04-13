import React from 'react';

function RecipeView() {
  return (
      <>
        <header class="landing-nav">
            <h1>CookIt</h1>
            <a href="#">My Recipes</a>
            <a href="#">Add Recipe</a>
            <a href="#">Sign Out</a>
        </header>
        <div>
            <div class="full-recipe">
                <div class="image"></div>
                    <h3>Test Recipe Name</h3>
                    <p>A delicious test recipe, made with html and css.</p>
                    <h4>Ingredients</h4>
                    <ul class="ingredients">
                        <li>Test</li>
                        <li>Test</li>
                        <li>Test</li>
                        <li>Test</li>
                        <li>Test</li>
                        <li>Test</li>
                        <li>Test</li>
                        <li>Test</li>
                        <li>Test</li>
                        <li>Test</li>
                        <li>Test</li>
                    </ul>
                    <h4>Directions</h4>
                    <ul class="directions">
                        <li><p>Create a React App through your bash terminal</p></li>
                        <li><p>CD into the folder and remove uneccasry files</p></li>
                        <li><p>Open file in your coding editor</p></li>
                        <li><p>Create gitHub repository</p></li>
                        <li><p>Create remote origin in you newly created repository</p></li>
                        <li><p>Push current content into you remote repository</p></li>
                        <li><p>And happy coding!</p></li>
                    </ul>
                    <div class="tag-container">
                        <span class="tag">Test</span>
                        <span class="tag">Test</span>
                        <span class="tag">Test</span>
                    </div>
            </div>
            <h3>Comments</h3>
            <section class="comments">
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

export default RecipeView;