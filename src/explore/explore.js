import React from 'react';

function Explore() {
  return (
    <>
        <header class="landing-nav">
            <h1>CookIt</h1>
            <a href="#">My Recipes</a>
            <a href="#">Add Recipe</a>
            <a href="#">Sign Out</a>
        </header>
        <section class="filter-nav">
            <form>
                <label for="category">Category:</label>
                <select name="category" id="category">
                    <option value="breakfast">breakfast</option>
                    <option value="lunch">lunch</option>
                    <option value="dinner">dinner</option>
                    <option value="snack">snack</option>
                    <option value="side">side</option>
                    <option value="drink">drink</option>
                </select>
                <label for="dietary">Dietary Needs:</label>
                <select name="dietary" id="dietary" size="2" multiple>
                    <option value="vegan">vegan</option>
                    <option value="vegatarian">vegatarian</option>
                    <option value="gluten-free">gluten free</option>
                    <option value="dairy-free">dairy free</option>
                    <option value="oil-free">oil free</option>
                    <option value="nightshade-free">nightshade free</option>
                </select>
            </form>
        </section>
        <body>
            <h2>Explore</h2>
            <section class="recipes">
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
        </body>
    </>
  );
}

export default Explore;