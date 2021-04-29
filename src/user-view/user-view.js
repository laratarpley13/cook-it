import React, { Component } from 'react';
import { API_BASE_URL } from '../config';
import Context from '../Context';
import tokenService from '../services/token-service';
import './user-view.css';

class UserView extends Component{
  state = {
      pageUser: {},
      recipes: [],
      comments: [],
      recipetags: [],
  }
  static contextType = Context;

  logout = () => {
      tokenService.clearAuthToken();
      this.props.history.push('/')
  }

  commentDelete = (commentId) => {
      //this.props.handleComDelete(commentId)
      const targetComments = this.state.comments.filter(comment => 
        comment.id !== commentId  
      )
      this.setState({comments: targetComments}, () => {
          fetch(`${API_BASE_URL}/comments/${commentId}`, {
              method: 'DELETE',
              headers: {
                  'authorization': `bearer ${tokenService.getAuthToken()}`,
                  'content-type': 'application/json'
              }
          }).then(res => res)
          .catch(error => {
              console.error({error})
          })
      })
  }

  recipeDelete = (recipeId) => {
      //this.props.handleRecDelete(recipeId)
      const targetRecipes = this.state.recipes.filter(recipe =>
        recipe.id !== recipeId  
      )
      this.setState({recipes: targetRecipes}, () => {
          fetch(`${API_BASE_URL}/recipes/${recipeId}`, {
              method: 'DELETE',
              headers: {
                  'authorization': `bearer ${tokenService.getAuthToken()}`,
                  'content-type': 'application/json'
              }
          }).then(res => res)
          .catch(error => {
              console.error({error})
          })
      })
  }

  componentDidMount() {
      const targetUserId = parseInt(this.props.match.params.userId);
      fetch(`${API_BASE_URL}/users/${targetUserId}`, {
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
          this.setState({ pageUser: userRes })
          fetch(`${API_BASE_URL}/recipes/byuser/${targetUserId}`, {
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
              this.setState({ recipes: recRes})
          })
      }).catch(error => console.error(error))

      //get comments
      fetch(`${API_BASE_URL}/comments/byuser/${targetUserId}`, {
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
      }).catch(error => console.error(error))

      //get recipeTags
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

  }

  render() {
    const {user, categories, tags} = this.context;
    return (
        <>
            <header className="landing-nav">
                <h1 onClick={() => this.props.history.push('/explore')}>CookIt</h1>
                <button onClick={() => this.props.history.push(`/user/${user.id}`)}>My Recipes</button>
                <button onClick={() => this.props.history.push('/add-recipe')}>Add Recipe</button>
                <button onClick={() => this.logout()}>Log Out</button>
            </header>
            <div>
                <h2 className="user-title">{this.state.pageUser.nickname}'s Recipes</h2>
                <section className="user-recipes">
                    {this.state.recipes.length === 0 ?
                    <p>{this.state.pageUser.nickname} has no recipes yet</p>
                    : this.state.recipes.map(recipe => 
                        <div key={recipe.id} className="recipe" onClick={() => this.props.history.push(`/recipe/${recipe.id}`)}>
                            <div className="image" style={{backgroundImage: `url(${recipe.imgurl})`}}></div>
                            <h3>{recipe.title}</h3>
                            <p>{recipe.description}</p>
                            <div className="tag-container">
                                {categories.filter(category => category.id === recipe.categoryid).map(filteredCat => 
                                    <span key={filteredCat.id} className="tag category">{filteredCat.title}</span>    
                                )}
                                {this.state.recipetags.filter(r => r.recipeid === recipe.id).map(r => r.tagid).map(tagid => 
                                    <span key={tagid} className="tag">{tags.find(t => t.id === tagid).title}</span>
                                )}
                            </div>
                            {user.id === this.state.pageUser.id ? <button className="delete-rec" onClick={(e) => {
                                e.stopPropagation();
                                this.recipeDelete(recipe.id);
                            }}>Delete</button> : null}
                        </div>
                        )
                    }
                </section>
                <h2 className="user-title">{this.state.pageUser.nickname}'s Recipe Attempts</h2>
                <section className="user-comments">
                    {this.state.comments.length === 0 ?
                    <p>{this.state.pageUser.nickname} has no recipe attempts yet</p> 
                    : this.state.comments.map(comment => 
                        <div key={comment.id} className="comment" onClick={() => this.props.history.push(`/recipe/${comment.recipeid}`)}>
                            <div className="response-img" style={{backgroundImage: `url(${comment.imgurl})`}}></div>
                            <p>{comment.comment}</p>
                            {user.id === this.state.pageUser.id ? <button className="delete-com" onClick={(e) => {
                                e.stopPropagation()
                                this.commentDelete(comment.id);
                            }}>Delete</button> : null}
                        </div>  
                    )
                    }
                </section>
            </div>  
        </>
    );
  }
}

export default UserView;