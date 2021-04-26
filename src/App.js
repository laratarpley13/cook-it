import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../src/services/token-service';
import Context from './Context';
import Landing from './landing/landing';
import SignIn from './sign-in/sign-in';
import SignUp from './sign-up/sign-up';
import Explore from './explore/explore';
import UserView from './user-view/user-view';
import RecipeView from './recipe-view/recipe-view';
import AddRecipe from './add-recipe/add-recipe';
//import EditRecipe from './edit-recipe/edit-recipe';
import AddComment from './add-comment/add-comment';
import { API_BASE_URL } from './config';
//import EditComment from './edit-comment/edit-comment';
import DummyData from './store';
import tokenService from '../src/services/token-service';

class App extends Component {
  state = {
    user: {
      id: 1,
      email: "demo@demo.com",
      nickname: "Demo Cook",
    },
    recipes: DummyData.recipes,
    allUsers: DummyData.users,
    ingredients: DummyData.ingredients,
    steps: DummyData.steps,
    comments: DummyData.comments,
    categories: DummyData.categories,
    tags: DummyData.tags,
    recipeTags: DummyData.recipeTags,
  }

  handleRecipeAdd = (name, imageurl, description, ingredients, directions, category, tags) => {
    let targetCatId = this.state.categories.filter(cat => cat.title === category);
    targetCatId = targetCatId[0].id;

    const newRecId = this.state.recipes.length + 1;

    console.log(ingredients); //debugging
    console.log(directions); //debugging

    const newRecipe = {
      id: newRecId,
      userId: this.state.user.id,
      categoryId: targetCatId,
      title: name,
      description: description,
      imgUrl: imageurl 
    }

    this.setState({
      recipes: [...this.state.recipes, newRecipe]
    })
    console.log(newRecipe);

    let ingCount = this.state.ingredients.length

    let formattedIng = ingredients.map(ingredient => {
      ingCount ++;
      return ({
        id: ingCount,
        recipeId: newRecId,
        title: ingredient.title,
        amount: ingredient.amount
      })
    })

    this.setState({
      ingredients: this.state.ingredients.concat(formattedIng)
    });

    let stepCount = this.state.steps.length

    let formattedSteps = directions.map(dir => {
      stepCount ++;
      return ({
        id: stepCount,
        recipeId: newRecId,
        text: dir,
      })
    })

    this.setState({
      steps: this.state.steps.concat(formattedSteps)
    });

    let targetTags = [];
    for(let i=0; i<this.state.tags.length; i++) {
      for(let j=0; j<tags.length; j++) {
        if(this.state.tags[i].title === tags[j]) {
          targetTags.push(this.state.tags[i])
        }
      }
    }

    let formattedRecId = targetTags.map(tag => {
      return {
        recipeId: newRecId,
        tagId: tag.id
      }
    })

    this.setState({
      recipeTags: this.state.recipeTags.concat(formattedRecId)
    });    
  }

  handleCommentAdd = (imageurl, comment, recipeId) => {
    const formattedCom = {
      id: this.state.comments.length,
      recipeId: recipeId,
      userId: this.state.user.id,
      comment: comment,
      imgUrl: imageurl
    }

    this.setState({
      comments: [...this.state.comments, formattedCom]
    })
  }

  handleComDelete = (commentId) => {
    console.log(commentId); //debugging
    const newComments = this.state.comments.filter(comment => comment.id !== commentId)
    this.setState({
      comments: newComments
    }, () => console.log(this.state.comments))
  }

  handleRecDelete = (recipeId) => {
    console.log(recipeId) //debugging
    const newRecipes = this.state.recipes.filter(recipe =>
      recipe.id !== recipeId  
    )
    this.setState({
      recipes: newRecipes
    }, () => console.log(this.state.recipes))
  }

  componentDidMount() {
    if(TokenService.getAuthToken()) {
      fetch(`${API_BASE_URL}/categories`, {
        method: 'GET',
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken}`
        }
      }).then((catRes) => {
        if(!catRes.ok) {
          return catRes.json().then(e => Promise.reject(e))
        }
        return catRes.json()
      }).then((catRes) => {
        console.log(catRes)
        fetch(`${API_BASE_URL}/tags`, {
          method: 'GET',
          headers: {
            'authorization': `bearer ${tokenService.getAuthToken}`
          }
        }).then((tagRes) => {
          if(!tagRes.ok) {
            return tagRes.json().then(e => Promise.reject(e))
          }
          return tagRes.json()
        }).then((tagRes) => {
          console.log(tagRes)
          fetch(`${API_BASE_URL}/recipetags`)
        })
      })
    }
  }

  render() {
    console.log(this.state);
    const value = {
      user: this.state.user,
      recipes: this.state.recipes,
      allUsers: this.state.allUsers,
      ingredients: this.state.ingredients,
      steps: this.state.steps,
      comments: this.state.comments,
      categories: this.state.categories,
      tags: this.state.tags,
      recipeTags: this.state.recipeTags,
    }
    return (
      <Context.Provider value={value}>
        <main className='App'>
          <Route exact path='/'
            render={(props) => 
              <Landing
                {...props}
              />
            }
          />
          <Route path='/sign-up'
            render={(props) => 
              <SignUp
                {...props}
              />
            }
          />
          <Route path='/sign-in'
            render={(props) => 
              <SignIn
                {...props}
              />
            }
          />
          <Route path='/explore'
            render={(props) => (
              TokenService.hasAuthToken()
                ? <Explore
                    {...props}
                  />
                : <Redirect 
                    to={{
                      pathname: '/sign-in',
                      state: { from: props.location }
                    }}
                  />
            )}
          />
          <Route path='/user/:userId'
            render={(props) => (
              TokenService.hasAuthToken()
              ? <UserView 
                  {...props}
                  handleRecDelete = {this.handleRecDelete}
                  handleComDelete = {this.handleComDelete}
                />
              : <Redirect 
                  to={{
                    pathname: '/sign-in',
                    state: { from: props.location }
                  }}
                />
            )}          
          />
          <Route path='/recipe/:recipeId'
            render={(props) => (
              TokenService.hasAuthToken()
              ? <RecipeView 
                  {...props}
                />
              : <Redirect 
                  to={{
                    pathname: '/sign-in',
                    state: { from: props.location }
                  }}
                />
            )}          
          />
          <Route path='/add-recipe'
            render={(props) => (
              TokenService.hasAuthToken()
              ? <AddRecipe 
                  {...props}
                  handleRecipeAdd={this.handleRecipeAdd}
                />
              : <Redirect 
                  to={{
                    pathname: '/sign-in',
                    state: { from: props.location }
                  }}
                />
            )}
          />
          <Route path='/add-comment/:recipeId'
            render={(props) => (
              TokenService.hasAuthToken()
              ? <AddComment 
                  {...props}
                  handleCommentAdd = {this.handleCommentAdd}
                />
              : <Redirect 
                  to={{
                    pathname: '/sign-in',
                    state: { from: props.location }
                  }}
                />
            )}
          />
        </main>
      </Context.Provider>
    );
  }
}

export default App;
