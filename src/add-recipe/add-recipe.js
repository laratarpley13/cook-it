import React, { Component } from 'react';
import Context from '../Context';
import tokenService from '../services/token-service';
import { API_BASE_URL } from '../config';
import './add-recipe.css';

class AddRecipe extends Component {
state = {
    imageurl: "",
    name: "",
    description: "",
    ingredients: [{title: "", amount: ""}],
    directions: [''],
    category: 'breakfast',
    tags: [],
}
static contextType = Context;

logout = () => {
tokenService.clearAuthToken();
this.props.history.push('/')
}

handleSubmit = (e) => {
    e.preventDefault()
    const { name, imageurl, description, ingredients, directions, category, tags } = this.state;
    let targetCatId = this.context.categories.filter(cat => cat.title === category);
    targetCatId = targetCatId[0].id;
    const newRecipe = {
        userid: this.context.user.id,
        categoryid: targetCatId,
        title: name,
        description: description,
        imgurl: imageurl
    }
    let targetTagsId = [];
    for (let i=0; i<this.context.tags.length; i++) {
        for(let j=0; j<tags.length; j++) {
            if(this.context.tags[i].title === tags[j]) {
                targetTagsId.push(this.context.tags[i].id)
            }
        }
    }
    //this.props.handleRecipeAdd(name, imageurl, description, ingredients, directions, category, tags)
    //make a post request to the database
    fetch(`${API_BASE_URL}/recipes`, {
        method: 'POST',
        body: JSON.stringify(newRecipe),
        headers: {
            'authorization': `bearer ${tokenService.getAuthToken()}`,
            'content-type': 'application/json'
        }
    }).then(res => {
        if(!res.ok) {
            return res.json().then(e => Promise.reject(e))
        }
        return res.json()
    }).then(data => {
        //handle ingredient add to db
        let formatedIng = ingredients.map(ingredient => {
            return {
                recipeid: data.id,
                title: ingredient.title,
                amount: ingredient.amount
            }
        })
        let requests = formatedIng.map(ingredient => {
            return fetch(`${API_BASE_URL}/ingredients`, {
                method: 'POST',
                body: JSON.stringify(ingredient),
                headers: {
                    'authorization': `bearer ${tokenService.getAuthToken()}`,
                    'content-type': 'application/json'
                }
            })
        })
        Promise.all(requests)
            .then(responses => {
                return responses
            })
            .then(responses => Promise.all(responses.map(r => r.json())))

        //handle step add to db
        let formattedSteps = directions.map(dir => {
            return {
                recipeid: data.id,
                text: dir
            }
        })
        let stepRequests = formattedSteps.map(step => {
            return fetch(`${API_BASE_URL}/steps`, {
                method: 'POST',
                body: JSON.stringify(step),
                headers: {
                    'authorization': `bearer ${tokenService.getAuthToken()}`,
                    'content-type': 'application/json'
                }
            })
        })
        Promise.all(stepRequests)
            .then(responses => {
                return responses
            })
            .then(responses => Promise.all(responses.map(r => r.json())))

        //handle recipeTags add to db
        let formatRecTags = targetTagsId.map(tagid => {
            return {
                recipeid: data.id,
                tagid: tagid
            }
        }) 
        let recTagRequests = formatRecTags.map(recTag => {
            return fetch(`${API_BASE_URL}/recipetags`, {
                method: 'POST',
                body: JSON.stringify(recTag),
                headers: {
                    'authorization': `bearer ${tokenService.getAuthToken()}`,
                    'content-type': 'application/json'
                }
            })
        })
        Promise.all(recTagRequests)
            .then(responses => {
                return responses
            })
            .then(responses => Promise.all(responses.map(r => r.json())))
            this.props.history.push('/explore')
    }).catch(error => console.error(error))
}

handleText = (e) => {
    let ingredients = [...this.state.ingredients]
    ingredients[e.target.dataset.id][e.target.className] = e.target.value
    this.setState({ ingredients })
}

handleDirText = e => {
    let directions = [...this.state.directions]
    directions[e.target.dataset.id] = e.target.value
    this.setState({
        directions
    })
}

handleDelete = (i) => e => {
    e.preventDefault()
    let ingredients = [
        ...this.state.ingredients.slice(0, i),
        ...this.state.ingredients.slice(i + 1)
    ]
    this.setState({
        ingredients
    })
}

handleDirDelete = (i) => e => {
    e.preventDefault()
    let directions = [
        ...this.state.directions.slice(0, i),
        ...this.state.directions.slice(i + 1)
    ]
    this.setState({
        directions
    })
}

addIngredient = e => {
    this.setState((prevState) => ({
        ingredients: [...prevState.ingredients, {title:"", amount:""}]
    }))
}

addDirection = e => {
    let directions = this.state.directions.concat([''])
    this.setState({
        directions
    })
}

handleTagChange = (e) => {
    const isChecked = e.target.checked;
    const checkedValue = e.target.value;
    if(isChecked) {
        this.setState({
            tags: [...this.state.tags, checkedValue]
        })
    } else {
        const newValues = this.state.tags.filter(tag => 
        tag !== checkedValue  
        )
        this.setState({
            tags: newValues
        })
    }
}

handleCatChange = (e) => {
    this.setState({category: e.target.value})
}

handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
}

  render() {
    const {user, tags} = this.context;
    return (
        <>
            <header className="landing-nav">
                <h1 onClick={() => this.props.history.push('/explore')}>CookIt</h1>
                <button onClick={() => this.props.history.push(`/user/${user.id}`)}>My Recipes</button>
                <button onClick={() => this.props.history.push('/add-recipe')}>Add Recipe</button>
                <button onClick={() => this.logout()}>Log Out</button>
            </header>
            <div>
                <h2>Add Recipe</h2>
                <section className="add-recipe">
                    <form onSubmit={this.handleSubmit}>
                        <p>Note: Please upload your image to<a href="https://imgur.com/" target="_blank" rel="noreferrer noopener">imgur</a>and use the image url for you recipe photo.</p>
                        <label htmlFor="imageurl">Image Url:</label>
                        <input name="imageurl" id="imageurl" type="text" value={this.state.imageurl} onChange={this.handleChange} required />
                        <br />
                        <label htmlFor="name">Recipe Name:</label>
                        <input name="name" id="name" type="text" value={this.state.name} onChange={this.handleChange} required/>
                        <br />
                        <label htmlFor="description">Description:</label>
                        <input name="description" id="description" type="text" value={this.state.description} onChange={this.handleChange} required/>
                        <br />
                        <div className="ingredients">
                            <h3>Ingredients:</h3>
                            {this.state.ingredients.map((ingredient, index) => {
                                let titleId = `title-${index}`, amountId = `amount=${index}` 
                                return (
                                    <div key={index}>
                                        <label htmlFor={titleId}>Ingredient:</label>
                                        <input name={titleId} id={titleId} data-id={index} type="text" className="title" onChange={this.handleText} value={ingredient.title}  required />
                                        <label htmlFor={amountId}>Amount:</label>
                                        <input name={amountId} id={amountId} data-id={index} type="text" className="amount" onChange={this.handleText} value={ingredient.amount} required />
                                        <button onClick={this.handleDelete(index)}>X</button>
                                    </div>
                                )
                            })}
                            <button onClick={this.addIngredient}>Add Ingredient</button>
                        </div>
                        <div className="directions">
                            <h2>Directions:</h2>
                            {this.state.directions.map((direction, index) => {
                                let dirId = `dir-${index}` 
                                return (
                                    <div key={index}>
                                        <label htmlFor={dirId}>Step {index + 1}</label>
                                        <input name={dirId} id={dirId} data-id={index} className="direction" type="text" onChange={this.handleDirText} value={direction} required />
                                        <button onClick={this.handleDirDelete(index)}>X</button>
                                    </div>
                                )
                            })}
                            <button onClick={this.addDirection}>Add Direction</button>
                        </div>
                        <br />
                        <label htmlFor="category">Category:</label>
                        <select name="category" id="category" onChange={this.handleCatChange} required>
                            <option value="breakfast">breakfast</option>
                            <option value="entree">entree</option>
                            <option value="dessert">dessert</option>
                            <option value="snack">snack</option>
                            <option value="side">side</option>
                            <option value="drink">drink</option>
                        </select>
                        <br />
                        <div className="dietary">
                            {tags.map(tag =>
                                <label key={tag.id}><input type="checkbox" id={tag.title} name={tag.title} value={tag.title} onChange={this.handleTagChange} />{tag.title}</label>
                            )}
                        </div>
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                </section>
            </div>
        </>
    );
  }
}

export default AddRecipe;