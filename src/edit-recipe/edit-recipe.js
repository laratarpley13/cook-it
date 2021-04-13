import React from 'react';

function EditRecipe() {
  return (
    <>
        <header class="landing-nav">
            <h1>CookIt</h1>
            <a href="#">My Recipes</a>
            <a href="#">Add Recipe</a>
            <a href="#">Sign Out</a>
        </header>
        <div>
            <h2>Edit Recipe</h2>
            <section class="edit-recipe">
                <form>
                    <label for="img-url">Image Url:</label>
                    <input name="img-url" id="img-url" type="text" />
                    <br />
                    <label for="description">Description:</label>
                    <input name="description" id="description" type="text" />
                    <br />
                    <label for="ingredients">Ingredients:</label>
                    <input name="ingredients" id="ingredients" type="text" />
                    <br />
                    <label for="directions">Directions:</label>
                    <input name="directions" id="directions" type="text" />
                    <br />
                    <label for="category">Category:</label>
                    <select name="category" id="category">
                        <option value="breakfast">breakfast</option>
                        <option value="lunch">lunch</option>
                        <option value="dinner">dinner</option>
                        <option value="snack">snack</option>
                        <option value="side">side</option>
                        <option value="drink">drink</option>
                    </select>
                    <br />
                    <label for="dietary">Dietary Needs:</label>
                    <select name="dietary" id="dietary" size="2" multiple>
                        <option value="vegan">vegan</option>
                        <option value="vegatarian">vegatarian</option>
                        <option value="gluten-free">gluten free</option>
                        <option value="dairy-free">dairy free</option>
                        <option value="oil-free">oil free</option>
                        <option value="nightshade-free">nightshade free</option>
                    </select>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </section>
        </div>
    </>
  );
}

export default EditRecipe;