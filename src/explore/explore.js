import React, { Component } from 'react';
import Context from '../Context';
import './explore.css';
import DummyData from '../store';

class Explore extends Component{
    state = {
        recipes: DummyData.recipes,
        users: DummyData.users,
        selectCatValue: 'all',
        selectDietValues: [],
    }
    static contextType = Context;

    logout = () => {
        //TokenService.clearAuthToken();
        this.props.history.push('/')
    }

    handleCatChange = (e) => {
        this.setState({selectCatValue: e.target.value});
    }

    handleChange = (e) => {
        const isChecked = e.target.checked;
        const checkedValue = e.target.value;
        if(isChecked) {
            this.setState({
                selectDietValues: [...this.state.selectDietValues, checkedValue]
            })
        } else {
            const newValues = this.state.selectDietValues.filter(value => 
                value !== checkedValue    
            )
            this.setState({
                selectDietValues: newValues
            })
        }
    }

    handleFilter = (e, categories, tags, recipeTags) => {
        e.preventDefault();
        alert(`Cat is ${this.state.selectCatValue} and Diet is ${this.state.selectDietValues}`)
        if(this.state.selectCatValue === "all"){
            if(this.state.selectDietValues.length > 0) {
                let filteredTags = [];
                for(let i=0; i<this.state.selectDietValues.length; i++) {
                    for(let j=0; j<tags.length; j++) {
                        if(this.state.selectDietValues[i] === tags[j].title) {
                            filteredTags.push(tags[j])
                        }
                    }
                }
                let filteredRecipeTags = [];
                for(let i=0; i<filteredTags.length; i++) {
                    for(let j=0; j<recipeTags.length; j++) {
                        if(filteredTags[i].id === recipeTags[j].tagId) {
                            filteredRecipeTags.push(recipeTags[j])
                        }
                    }
                }
                let filteredRecByTag = [];
                for(let i=0; i<filteredRecipeTags.length; i++) {
                    for(let j=0; j<DummyData.recipes.length; j++) {
                        if(filteredRecipeTags[i].recipeId === DummyData.recipes[j].id) {
                            filteredRecByTag.push(DummyData.recipes[j]);
                        }
                    }
                }
                const removeUniqueRec = filteredRecByTag = Array.from(new Set(filteredRecByTag.map(rec => rec.id)))
                    .map(id => {
                        return filteredRecByTag.find(rec => rec.id === id)
                    })
                console.log(removeUniqueRec);
                this.setState({
                    recipes: removeUniqueRec
                })
            }
            else {
                this.setState({
                    recipes: DummyData.recipes
                })
            }
        } else {
            const targetCat = categories.filter(category => 
                category.title === this.state.selectCatValue    
            )
            console.log(targetCat)
            const filteredCatRec = DummyData.recipes.filter(recipe => 
                recipe.categoryId === targetCat[0].id
            )
            if(this.state.selectDietValues.length > 0) {
                let filteredTags = [];
                for(let i=0; i<this.state.selectDietValues.length; i++) {
                    for(let j=0; j<tags.length; j++) {
                        if(this.state.selectDietValues[i] === tags[j].title) {
                            filteredTags.push(tags[j])
                        }
                    }
                }
                let filteredRecipeTags = [];
                for(let i=0; i<filteredTags.length; i++) {
                    for(let j=0; j<recipeTags.length; j++) {
                        if(filteredTags[i].id === recipeTags[j].tagId) {
                            filteredRecipeTags.push(recipeTags[j])
                        }
                    }
                }
                let filteredRecByTag = [];
                for(let i=0; i<filteredRecipeTags.length; i++) {
                    for(let j=0; j<filteredCatRec.length; j++) {
                        if(filteredRecipeTags[i].recipeId === filteredCatRec[j].id) {
                            filteredRecByTag.push(filteredCatRec[j]);
                        }
                    }
                }
                const removeUniqueRec = filteredRecByTag = Array.from(new Set(filteredRecByTag.map(rec => rec.id)))
                    .map(id => {
                        return filteredRecByTag.find(rec => rec.id === id)
                    })
                console.log(removeUniqueRec);
                this.setState({
                    recipes: removeUniqueRec
                })
            }
            else{            
                this.setState({
                    recipes: filteredCatRec
                })
            }
        }
    }

    render() {
        const { user, categories, tags, recipeTags } = this.context;

        return (
            <>
                <header className="landing-nav">
                    <h1>CookIt</h1>
                    <button onClick={() => this.props.history.push(`user/${user.id}`)}>My Recipes</button>
                    <button>Add Recipe</button>
                    <button onClick={() => this.logout()}>Log Out</button>
                </header>
                <section className="filter-nav">
                    <form onSubmit={(e) => this.handleFilter(e, categories, tags, recipeTags)}>
                        <label htmlFor="category">Category:</label>
                        <select name="category" id="category" value={this.state.selectCatValue} onChange={this.handleCatChange}>
                            <option value="all">all</option>
                            <option value="breakfast">breakfast</option>
                            <option value="entree">entree</option>
                            <option value="dessert">dessert</option>
                            <option value="drink">drink</option>
                            <option value="side">side</option>
                            <option value="snack">snack</option>
                        </select>
                        <div className="dietary">
                            <input type="checkbox" id="vegan" name="vegan" value="vegan" onChange={this.handleChange} />
                            <label htmlFor="vegan">Vegan</label>
                            <input type="checkbox" id="vegatarian" name="vegatarian" value="vegatarian" onChange={this.handleChange} />
                            <label htmlFor="vegatarian">Vegatarian</label>
                            <input type="checkbox" id="gluten-free" name="gluten-free" value="gluten-free" onChange={this.handleChange} />
                            <label htmlFor="gluten-free">gluten-free</label>
                            <input type="checkbox" id="dairy-free" name="dairy-free" value="dairy-free" onChange={this.handleChange} />
                            <label htmlFor="dairy-free">dairy-free</label>
                            <input type="checkbox" id="oil-free" name="oil-free" value="oil-free" onChange={this.handleChange} />
                            <label htmlFor="oil-free">oil-free</label>
                            <input type="checkbox" id="nightshade-free" name="nightshade-free" value="nightshade-free" onChange={this.handleChange} />
                            <label htmlFor="nightshade-free">nightshade-free</label>
                        </div>
                        {/* <select name="dietary" id="dietary" size="2" multiple value={this.state.seletDietValue} onChange={this.handleDietChange}>
                            <option value="vegan">vegan</option>
                            <option value="vegatarian">vegatarian</option>
                            <option value="gluten-free">gluten free</option>
                            <option value="dairy-free">dairy free</option>
                            <option value="oil-free">oil free</option>
                            <option value="nightshade-free">nightshade free</option>
                        </select> */}
                        <button type="submit">Enter</button>
                    </form>
                </section>
                <div>
                    <p>{this.state.selectCatValue}</p>
                    <p>{this.state.selectDietValues}</p>
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