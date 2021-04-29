import React, { Component } from 'react';
import { API_BASE_URL } from '../config';
import Context from '../Context';
import tokenService from '../services/token-service';
import TokenService from '../services/token-service';
import './explore.css';

class Explore extends Component{
    state = {
        recipes: [],
        users: [],
        selectCatValue: 'all',
        selectDietValues: [],
        selectedRecipes: [],
        tagDict: {},
        recipetags: []
    }
    static contextType = Context;

    logout = () => {
        TokenService.clearAuthToken();
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

    handleFilter = (e) => {
        e.preventDefault();
        const { categories, tags } = this.context

        let recWithTags = this.state.recipes.map(rec => {
            rec.tags = this.state.recipetags.filter(rt => rt.recipeid === rec.id).map(rt => rt.tagid);
            return rec;
        });
        
        if(this.state.selectCatValue === "all"){
            if(this.state.selectDietValues.length > 0) {
                let filteredTags = [];
                for(let i=0; i<this.state.selectDietValues.length; i++) {
                    for(let j=0; j<tags.length; j++) {
                        if(this.state.selectDietValues[i] === tags[j].title) {
                            filteredTags.push(tags[j].id)
                        }
                    }
                }

                let filteredRecipes = recWithTags.filter(rec => filteredTags.every(val => rec.tags.includes(val)));
                
                this.setState({
                    selectedRecipes: filteredRecipes
                })
            }
            else {
                this.setState({
                    selectedRecipes: this.state.recipes
                })
            }
        } else {
            const targetCat = categories.filter(category => 
                category.title === this.state.selectCatValue    
            )
            const filteredCatRec = recWithTags.filter(recipe => 
                recipe.categoryid === targetCat[0].id
            )

            if(this.state.selectDietValues.length > 0) {
                let filteredTags = [];
                for(let i=0; i<this.state.selectDietValues.length; i++) {
                    for(let j=0; j<tags.length; j++) {
                        if(this.state.selectDietValues[i] === tags[j].title) {
                            filteredTags.push(tags[j].id)
                        }
                    }
                }

                let filteredRecipes = filteredCatRec.filter(rec => filteredTags.every(val => rec.tags.includes(val)));

                this.setState({
                    selectedRecipes: filteredRecipes
                })
            }
            else{            
                this.setState({
                    selectedRecipes: filteredCatRec
                })
            }
        }
    }

    componentDidMount() {
        let tagDict ={};

        this.context.tags.forEach(t => {
            tagDict[t.id] = t.title;
        })

        this.setState({ tagDict: tagDict })

        fetch(`${API_BASE_URL}/users/all`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${tokenService.getAuthToken()}`
            }
        }).then((userRes) => {
            if(!userRes.ok) {
                return userRes.json().then(e => Promise.reject(e))
            }
            return userRes.json()
        }).then((userRes) => {
            this.setState({ users: userRes })
            fetch(`${API_BASE_URL}/recipes`, {
                method: 'GET',
                headers: {
                    'authorization': `bearer ${tokenService.getAuthToken()}`
                }
            }).then((recRes) => {
                if(!recRes.ok) {
                    return recRes.json().then(e => Promise.reject(e))
                }
                return recRes.json()
            }).then((recRes) => {
                this.setState({ recipes: recRes, selectedRecipes: recRes })
                fetch(`${API_BASE_URL}/recipetags`, {
                    method: 'GET',
                    headers: {
                        'authorization': `bearer ${tokenService.getAuthToken()}`
                    }
                }).then(recTagRes => {
                    if(!recTagRes.ok) {
                        return recTagRes.json().then(e => Promise.reject(e))
                    }
                    return recTagRes.json()
                }).then(recTagRes => {
                    this.setState({ recipetags: recTagRes })
                })
            })
        }).catch(error => console.error(error))
    }

    render() {
        const { user, categories, tags } = this.context;

        return (
            <>
                <header className="landing-nav">
                    <h1 onClick={() => this.props.history.push('/explore')}>CookIt</h1>
                    <button onClick={() => this.props.history.push(`/user/${user.id}`)}>My Recipes</button>
                    <button onClick={() => this.props.history.push('/add-recipe')}>Add Recipe</button>
                    <button onClick={() => this.logout()}>Log Out</button>
                </header>
                <section className="filter-nav">
                    <form onSubmit={(e) => this.handleFilter(e, categories, tags)}>
                        <div className="category-form">
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
                        </div>
                        <div className="dietary">
                            {tags.map(tag => 
                                <label key={tag.id}><input type="checkbox" id={tag.title} name={tag.title} value={tag.title} onChange={this.handleChange} />{tag.title}</label>    
                            )}
                        </div>
                        <button className="explore-submit" type="submit">Enter</button>
                    </form>
                </section>
                <div className="explore">
                    <h2>Explore</h2>
                    <p>How to use: to view a recipe click on the recipe, to view a user's profile click on their name.</p>
                    <section className="recipes">
                        {this.state.selectedRecipes.map(recipe => 
                            <div key={recipe.id} className="recipe" onClick={() => this.props.history.push(`/recipe/${recipe.id}`)}>
                                <div className="image" style={{backgroundImage: `url(${recipe.imgurl})`}}></div>
                                <h3>{recipe.title}</h3>
                                {this.state.users.filter(user => user.id === recipe.userid).map(filteredUser =>
                                    <h4 key={filteredUser.id} className="user-link" onClick={(e) => {
                                        e.stopPropagation();
                                        this.props.history.push(`/user/${filteredUser.id}`);
                                }}>Created by: {filteredUser.nickname}</h4>
                                )}
                                <p>{recipe.description}</p>
                                <div className="tag-container">
                                    {categories.filter(category => category.id === recipe.categoryid).map(filteredCat => 
                                        <span key={filteredCat.id} className="tag category">{filteredCat.title}</span>    
                                    )}
                                    {this.state.recipetags.filter(r => r.recipeid === recipe.id).map(r => r.tagid).map(tagid => 
                                        <span key={tagid} className="tag">{tags.find(t => t.id === tagid).title}</span>
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