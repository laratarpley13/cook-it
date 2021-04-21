import React, { Component } from 'react';
import Context from '../Context';
import './user-view.css';

class UserView extends Component{
  state = {
      pageUser: {},
      recipes: [],
      comments: [],
  }
  static contextType = Context;

  logout = () => {
      //TokenService.clearAuthToken();
      this.props.history.push('/')
  }

  commentDelete = (commentId) => {
      this.props.handleComDelete(commentId)
      const targetComments = this.state.comments.filter(comment => 
        comment.id !== commentId  
      )
      this.setState({comments: targetComments})
  }

  recipeDelete = (recipeId) => {
      this.props.handleRecDelete(recipeId)
      const targetRecipes = this.state.recipes.filter(recipe =>
        recipe.id !== recipeId  
      )
      this.setState({recipes: targetRecipes})
  }

  componentDidMount() {
      const targetUserId = parseInt(this.props.match.params.userId);
      const targetUser = this.context.allUsers.filter(user => user.id === targetUserId);
      this.setState({ pageUser: targetUser[0] });
      const targetRec = this.context.recipes.filter(recipe => recipe.userId === targetUserId);
      this.setState({ recipes: targetRec });
      const targetComments = this.context.comments.filter(comment => comment.userId === targetUserId);
      this.setState({ comments: targetComments });
  }

  render() {
    const {user, categories, tags, recipeTags} = this.context;
    return (
        <>
            <header className="landing-nav">
                <h1 onClick={() => this.props.history.push('/explore')}>CookIt</h1>
                <button onClick={() => this.props.history.push(`/user/${user.id}`)}>My Recipes</button>
                <button onClick={() => this.props.history.push('/add-recipe')}>Add Recipe</button>
                <button onClick={() => this.logout()}>Log Out</button>
            </header>
            <div>
                <h2>{this.state.pageUser.nickname}'s Recipes</h2>
                <section className="user-recipes">
                    {this.state.recipes.length === 0 ?
                    <p>{this.state.pageUser.nickname} has no recipes yet</p>
                    : this.state.recipes.map(recipe => 
                        <div key={recipe.id} className="recipe" onClick={() => this.props.history.push(`/recipe/${recipe.id}`)}>
                            <div className="image" style={{backgroundImage: `url(${recipe.imgUrl})`}}></div>
                            <h3>{recipe.title}</h3>
                            <p>{recipe.description}</p>
                            <div className="tag-container">
                                {categories.filter(category => category.id === recipe.categoryId).map(filteredCat => 
                                    <span key={filteredCat.id} className="tag category">{filteredCat.title}</span>    
                                )}
                                {recipeTags.filter(r => r.recipeId === recipe.id).map(r => r.tagId).map(tagId => 
                                    <span key={tagId} className="tag">{tags.find(t => t.id === tagId).title}</span>
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
                <h2>{this.state.pageUser.nickname}'s Recipe Attempts</h2>
                <section className="user-comments">
                    {this.state.comments.length === 0 ?
                    <p>{this.state.pageUser.nickname} has no recipe attempts yet</p> 
                    : this.state.comments.map(comment => 
                        <div key={comment.id} className="comment" onClick={() => this.props.history.push(`/recipe/${comment.recipeId}`)}>
                            <div className="response-img" style={{backgroundImage: `url(${comment.imgUrl})`}}></div>
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