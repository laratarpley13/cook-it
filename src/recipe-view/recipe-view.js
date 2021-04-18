import React, { Component } from 'react';
import Context from '../Context';
import './recipe-view.css';
import DummyData from '../store';

class RecipeView extends Component{
  state = {
      recipe: {},
      comments: [],
      ingredients: [],
      steps: [],
      creator: {},
      users: DummyData.users,
  }
  static contextType = Context;

  logout = () => {
      //TokenService.clearAuthToken();
      this.props.history.push('/')
  }

  componentDidMount() {
    const targetRecId = parseInt(this.props.match.params.recipeId);
    const targetRec = DummyData.recipes.filter(rec => rec.id === targetRecId);
    this.setState({ recipe: targetRec[0] });
    const targetComments = DummyData.comments.filter(com => com.recipeId === targetRecId);
    this.setState({ comments: targetComments });
    const targetIng = DummyData.ingredients.filter(ing => ing.recipeId === targetRecId);
    this.setState({ ingredients: targetIng })
    const targetDir = DummyData.steps.filter(step => step.recipeId === targetRecId);
    this.setState({ steps: targetDir });
    const targetUser = DummyData.users.filter(user => user.id === targetRec[0].userId)
    this.setState({ creator: targetUser[0] })
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
            <div>
                <div className="full-recipe">
                    <div className="image" style={{backgroundImage: `url(${this.state.recipe.imgUrl})`}}></div>
                    <h3>{this.state.recipe.title}</h3>
                    <h4 className="creator-link" onClick={() => this.props.history.push(`/user/${this.state.creator.id}`)}>Created by: {this.state.creator.nickname}</h4>
                    <p>{this.state.recipe.description}</p>
                    <h4>Ingredients</h4>
                    <ul className="ingredients">
                        {this.state.ingredients.map(ingredient => 
                            <li key={ingredient.id}><p>{ingredient.title}: {ingredient.amount}</p></li>
                        )}
                    </ul>
                    <h4>Directions</h4>
                    <ul className="directions">
                        {this.state.steps.map(step => 
                            <li key={step.id}><p>{step.text}</p></li>    
                        )}
                    </ul>
                    <div className="tag-container">
                        {categories.filter(category => category.id === this.state.recipe.categoryId).map(filteredCat => 
                            <span key={filteredCat.id} className="tag category">{filteredCat.title}</span>    
                        )}
                        {tags.map(tag => {
                            for(let i=0; i<recipeTags.length; i++) {
                                if(tag.id === recipeTags[i].tagId && this.state.recipe.id === recipeTags[i].recipeId) {
                                    return <span key={i} className="tag">{tag.title}</span>
                                }
                            }
                        })}
                    </div>
                </div>
                <h3>Comments</h3>
                <section className="comments">
                    {this.state.comments.length === 0 ?
                        <p>No comments yet</p>
                        : this.state.comments.map(comment => 
                            <div key={comment.id} className="comment">
                                <div className="response-img" style={{backgroundImage: `url(${comment.imgUrl})`}}></div>
                                {this.state.users.filter(user => user.id === comment.userId).map(filteredUser => 
                                    <h4 key={filteredUser.id} className="comment-poster" onClick={() => this.props.history.push(`/user/${filteredUser.id}`)}>By: {filteredUser.nickname}</h4>    
                                )}
                                <p>{comment.comment}</p>
                            </div>    
                        )
                    }
                </section>
            </div>
        </>
    );
  }
}

export default RecipeView;