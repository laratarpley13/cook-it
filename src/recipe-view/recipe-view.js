import React, { Component } from 'react';
import { API_BASE_URL } from '../config';
import Context from '../Context';
import tokenService from '../services/token-service';
import TokenService from '../services/token-service';
import './recipe-view.css';

class RecipeView extends Component{
  state = {
      recipe: {},
      comments: [],
      ingredients: [],
      steps: [],
      creator: {},
      users: [],
  }
  static contextType = Context;

  logout = () => {
      TokenService.clearAuthToken();
      this.props.history.push('/')
  }

  componentDidMount() {
    const targetRecId = parseInt(this.props.match.params.recipeId);
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
        fetch(`${API_BASE_URL}/recipes/${targetRecId}`, {
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
            this.setState({ recipe: recRes })
            fetch(`${API_BASE_URL}/ingredients/${targetRecId}`, {
                method: 'GET',
                headers: {
                    'authorization': `bearer ${tokenService.getAuthToken()}`
                }
            }).then((ingRes) => {
                if(!ingRes.ok) {
                    return ingRes.json().then(e => Promise.reject(e))
                }
                return ingRes.json()
            }).then((ingRes) => {
                this.setState({ ingredients: ingRes })
                fetch(`${API_BASE_URL}/steps/${targetRecId}`, {
                    method: 'GET',
                    headers: {
                        'authorization': `bearer ${tokenService.getAuthToken()}`
                    }
                }).then((stepsRes) => {
                    if(!stepsRes.ok) {
                        return stepsRes.json().then(e => Promise.reject(e))
                    }
                    return stepsRes.json()
                }).then((stepsRes) => {
                    this.setState({ steps: stepsRes })
                    fetch(`${API_BASE_URL}/comments/${targetRecId}`, {
                        method: 'GET',
                        headers: {
                            'authorization': `bearer ${tokenService.getAuthToken()}`
                        }
                    }).then((comRes) => {
                        if(!comRes.ok) {
                            return comRes.json().then(e => Promise.reject(e))
                        }
                        return comRes.json()
                    }).then((comRes) => {
                        this.setState({ comments: comRes })
                    })
                })
            })
        })
    }).catch(error => console.error(error))
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
                    <div className="image" style={{backgroundImage: `url(${this.state.recipe.imgurl})`}}></div>
                    <h3>{this.state.recipe.title}</h3>
                    {this.state.users.filter(user => this.state.recipe.userid === user.id).map(user => 
                        <h4 key={user.id} className="creator-link" onClick={() => this.props.history.push(`/user/${user.id}`)}>Created by: {user.nickname}</h4>      
                    )}
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
                        {categories.filter(category => category.id === this.state.recipe.categoryid).map(filteredCat => 
                            <span key={filteredCat.id} className="tag category">{filteredCat.title}</span>    
                        )}
                        {recipeTags.filter(r => r.recipeid === this.state.recipe.id).map(r => r.tagid).map(tagid => 
                            <span key={tagid} className="tag">{tags.find(t => t.id === tagid).title}</span>
                        )}
                    </div>
                </div>
                <h3>Comments</h3>
                <button className="add-comment-button" onClick={() => this.props.history.push(`/add-comment/${this.state.recipe.id}`)}>Add Comment</button>
                <section className="comments">
                    {this.state.comments.length === 0 ?
                        <p>No comments yet</p>
                        : this.state.comments.map(comment => 
                            <div key={comment.id} className="comment">
                                <div className="response-img" style={{backgroundImage: `url(${comment.imgurl})`}}></div>
                                {this.state.users.filter(user => user.id === comment.userid).map(filteredUser => 
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