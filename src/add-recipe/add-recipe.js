import React, { Component } from 'react';
import Context from '../Context';
import './add-recipe.css';

class AddRecipe extends Component {
  state = {
      ingredients: [{title: "Ingredient here", amount: "amount here"}],
      directions: ['First Step here']
  }
  static contextType = Context;
  
  logout = () => {
    //TokenService.clearAuthToken();
    this.props.history.push('/')
  }

  handleText = (i) => e => {
      let ingredients = [...this.state.ingredients]
      ingredients[i] = e.target.value
      this.setState({
          ingredients
      })
  }

  handleDirText = (i) => e => {
    let directions = [...this.state.directions]
    directions[i] = e.target.value
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
      e.preventDefault()
      let ingredients = this.state.ingredients.concat([''])
      this.setState({
          ingredients
      })
  }

  addDirection = e => {
    e.preventDefault()
    let directions = this.state.directions.concat([''])
    this.setState({
        directions
  })
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
                    <form>
                        <p>Note: Please upload your image to<a href="https://imgur.com/">imgur</a>and use the image url for you recipe photo.</p>
                        <label htmlFor="img-url">Image Url:</label>
                        <input name="img-url" id="img-url" type="text" required />
                        <br />
                        <label htmlFor="description">Description:</label>
                        <input name="description" id="description" type="text" required/>
                        <br />
                        <div className="ingredients">
                            <label htmlFor="ingredients">Ingredients:</label>
                            {this.state.ingredients.map((ingredient, index) => {
                                let titleId = `title-${index}`, amountId = `amount=${index}` 
                                return (
                                    <div key={index}>
                                        <label htmlFor={titleId}>Ingredient:</label>
                                        <input name={titleId} id={titleId} type="text" onChange={this.handleText(index)} value={ingredient} />
                                        <label htmlFor={amountId}>Amount:</label>
                                        <input name={amountId} id={amountId} type="text" onChange={this.handleText(index)} value={ingredient} />
                                        <button onClick={this.handleDelete(index)}>X</button>
                                    </div>
                                )
                            })}
                            <button onClick={this.addIngredient}>Add Ingredient</button>
                        </div>
                        <div className="directions">
                            <label htmlFor="directions">Directions:</label>
                            {this.state.directions.map((direction, index) => 
                                <div key={index}>
                                    <input name="direction" id="direction" type="text" onChange={this.handleDirText(index)} value={direction} />
                                    <button onClick={this.handleDirDelete(index)}>X</button>
                                </div>
                            )}
                            <button onClick={this.addDirection}>Add Direction</button>
                        </div>
                        {/* <input name="ingredients" id="ingredients" type="text" /> */}
                        <br />
                        <label htmlFor="directions">Directions:</label>
                        <input name="directions" id="directions" type="text" />
                        <br />
                        <label htmlFor="category">Category:</label>
                        <select name="category" id="category" required>
                            <option value="breakfast">breakfast</option>
                            <option value="lunch">lunch</option>
                            <option value="dinner">dinner</option>
                            <option value="snack">snack</option>
                            <option value="side">side</option>
                            <option value="drink">drink</option>
                        </select>
                        <br />
                        <div className="dietary">
                            {tags.map(tag =>
                                <label key={tag.id}><input type="checkbox" id={tag.title} name={tag.title} value={tag.title}/>{tag.title}</label>
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