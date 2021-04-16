import React, { Component } from 'react';
import Context from '../Context';
import './user-view.css';
import DummyData from '../store';

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

  componentDidMount() {
      const targetUserId = parseInt(this.props.match.params.userId);
      const targetUser = DummyData.users.filter(user => user.id === targetUserId);
      this.setState({ pageUser: targetUser[0] });
      const targetRec = DummyData.recipes.filter(recipe => recipe.userId === targetUserId);
      this.setState({ recipes: targetRec });
      const targetComments = DummyData.comments.filter(comment => comment.userId === targetUserId);
      this.setState({ comments: targetComments });
  }

  render() {
    const {user, categories, tags, recipeTags} = this.context;
    return (
        <>
            <header className="landing-nav">
                <h1>CookIt</h1>
                <button onClick={() => this.props.history.push(`/user/${user.id}`)}>My Recipes</button>
                <button>Add Recipe</button>
                <button onClick={() => this.logout()}>Log Out</button>
            </header>
            <div>
                <h2>{this.state.pageUser.nickname}'s Recipes</h2>
                <section className="user-recipes">
                    {this.state.recipes.map(recipe => 
                        <div key={recipe.id} className="recipe" onClick={() => this.props.history.push(`/recipe/${recipe.id}`)}>
                            <div className="image"></div>
                            <h3>{recipe.title}</h3>
                            <p>{recipe.description}</p>
                            <div className="tag-container">
                                {categories.filter(category => category.id === recipe.categoryId).map(filteredCat => 
                                    <span key={filteredCat.id} className="tag category">{filteredCat.title}</span>    
                                )}
                                {tags.map(tag => {
                                    for(let i=0; i<recipeTags.length; i++) {
                                        if(tag.id === recipeTags[i].tagId && recipe.id === recipeTags[i].recipeId) {
                                            return <span key={i} className="tag">{tag.title}</span>
                                        }
                                    }
                                })}
                            </div>
                            {user.id === this.state.pageUser.id ? <button className="delete-rec">Delete</button> : null}
                        </div>
                    )}
                </section>
                <h2>{this.state.pageUser.nickname}'s Recipe Attempts</h2>
                <section className="user-comments">
                    {this.state.comments.map(comment => 
                        <div key={comment.id} className="comment" onClick={() => this.props.history.push(`/recipe/${comment.recipeId}`)}>
                            <div className="response-img"></div>
                            <p>{comment.comment}</p>
                            {user.id === this.state.pageUser.id ? <button className="delete-com">Delete</button> : null}
                        </div>  
                    )}
                </section>
            </div>  
        </>
    );
  }
}

export default UserView;