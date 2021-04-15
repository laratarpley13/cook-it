import React, { Component } from 'react';
import Context from '../Context';
import './explore.css';
import DummyData from '../store';

class Explore extends Component{
    state = {
        recipes: DummyData.recipes,
        users: DummyData.users,
    }
    static contextType = Context;

    logout = () => {
        //TokenService.clearAuthToken();
        this.props.history.push('/')
    }

    handleFilter = (e) => {
        e.preventDefault();
        const category = e.target.value;
        const dietary = e.target.value;
        
        //console.log(categories, tags);
    }

    render() {
        const { user, categories, tags, recipeTags } = this.context;
        console.log(tags[0].title, recipeTags[0].tagId)

        return (
            <>
                <header className="landing-nav">
                    <h1>CookIt</h1>
                    <button onClick={() => this.props.history.push(`user/${user.id}`)}>My Recipes</button>
                    <button>Add Recipe</button>
                    <button onClick={() => this.logout()}>Log Out</button>
                </header>
                <section className="filter-nav">
                    <form onSubmit={(e) => this.handleFilter(e)}>
                        <label htmlFor="category">Category:</label>
                        <select name="category" id="category">
                            <option value="breakfast">breakfast</option>
                            <option value="lunch">lunch</option>
                            <option value="dinner">dinner</option>
                            <option value="snack">snack</option>
                            <option value="side">side</option>
                            <option value="drink">drink</option>
                        </select>
                        <label htmlFor="dietary">Dietary Needs:</label>
                        <select name="dietary" id="dietary" size="2" multiple>
                            <option value="vegan">vegan</option>
                            <option value="vegatarian">vegatarian</option>
                            <option value="gluten-free">gluten free</option>
                            <option value="dairy-free">dairy free</option>
                            <option value="oil-free">oil free</option>
                            <option value="nightshade-free">nightshade free</option>
                        </select>
                        <button type="submit">Enter</button>
                    </form>
                </section>
                <div>
                    <h2>Explore</h2>
                    <section className="recipes">
                        {this.state.recipes.map(recipe => 
                            <div className="recipe" onClick={() => this.props.history.push(`/recipe/${recipe.id}`)}>
                                <div className="image"></div>
                                <h3>{recipe.name}</h3>
                                {this.state.users.filter(user => user.id === recipe.userId).map(filteredUser =>
                                    <h4>Created by: {filteredUser.nickname}</h4>
                                )}
                                <p>{recipe.description}</p>
                                <div className="tag-container">
                                    {categories.filter(category => category.id === recipe.categoryId).map(filteredCat => 
                                        <span className="tag category">{filteredCat.title}</span>    
                                    )}
                                    {recipeTags.filter(recipeTag => recipeTag.recipeId === recipe.id).map(filteredTagId => {
                                        <span className="tag">{tags.filter(tag => tag.id === filteredTagId.tagId).map(selectedTag => {return selectedTag.id})}</span>
                                    }
                                    )}
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </>
          );
    }
}

export default Explore;