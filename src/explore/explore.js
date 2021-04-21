import React, { Component } from 'react';
import Context from '../Context';
import './explore.css';

class Explore extends Component{
    state = {
        recipes: this.context.recipes,
        users: this.context.allUsers,
        selectCatValue: 'all',
        selectDietValues: [],
        selectedRecipes: this.context.recipes,
        tagDict: {},
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

    handleFilter = (e) => {
        e.preventDefault();
        const { categories, tags, recipeTags } = this.context
        //reset state before each filter

        let recWithTags = this.state.recipes.map(rec => {
            rec.tags = recipeTags.filter(rt => rt.recipeId === rec.id).map(rt => rt.tagId);
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
                recipe.categoryId === targetCat[0].id
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

        this.setState({ tagDict: tagDict }, () => console.log(this.state.tagDict))
    }

    render() {
        const { user, categories, tags, recipeTags } = this.context;

        return (
            <>
                <header className="landing-nav">
                    <h1 onClick={() => this.props.history.push('/explore')}>CookIt</h1>
                    <button onClick={() => this.props.history.push(`/user/${user.id}`)}>My Recipes</button>
                    <button onClick={() => this.props.history.push('/add-recipe')}>Add Recipe</button>
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
                            {tags.map(tag => 
                                <label key={tag.id}><input type="checkbox" id={tag.title} name={tag.title} value={tag.title} onChange={this.handleChange} />{tag.title}</label>    
                            )}
                        </div>
                        <button type="submit">Enter</button>
                    </form>
                </section>
                <div>
                    <h2>Explore</h2>
                    <section className="recipes">
                        {this.state.selectedRecipes.map(recipe => 
                            <div key={recipe.id} className="recipe" onClick={() => this.props.history.push(`/recipe/${recipe.id}`)}>
                                <div className="image" style={{backgroundImage: `url(${recipe.imgUrl})`}}></div>
                                <h3>{recipe.name}</h3>
                                {this.state.users.filter(user => user.id === recipe.userId).map(filteredUser =>
                                    <h4 key={filteredUser.id} className="user-link" onClick={(e) => {
                                        e.stopPropagation();
                                        this.props.history.push(`/user/${filteredUser.id}`);
                                }}>Created by: {filteredUser.nickname}</h4>
                                )}
                                <p>{recipe.description}</p>
                                <div className="tag-container">
                                    {categories.filter(category => category.id === recipe.categoryId).map(filteredCat => 
                                        <span key={filteredCat.id} className="tag category">{filteredCat.title}</span>    
                                    )}
                                    {recipeTags.filter(r => r.recipeId === recipe.id).map(r => r.tagId).map(tagId => 
                                        <span key={tagId} className="tag">{tags.find(t => t.id === tagId).title}</span>
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