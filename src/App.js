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
import AddComment from './add-comment/add-comment';
import { API_BASE_URL } from './config';
import tokenService from '../src/services/token-service';

class App extends Component {
  state = {
    user: {},
    categories: [],
    tags: [],
  }

  handleSetCat = (categories) => {
    this.setState({
      categories: categories
    })
  }

  handleSetTags = (tags) => {
    this.setState({
      tags: tags
    })
  }

  handleSetUser = (user) => {
    this.setState({
      user: user
    })
  }

  componentDidMount() {
    if(TokenService.getAuthToken()) {
      fetch(`${API_BASE_URL}/categories`, {
        method: 'GET',
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`
        }
      }).then((catRes) => {
        if(!catRes.ok) {
          return catRes.json().then(e => Promise.reject(e))
        }
        return catRes.json()
      }).then((catRes) => {
        this.handleSetCat(catRes)
        fetch(`${API_BASE_URL}/tags`, {
          method: 'GET',
          headers: {
            'authorization': `bearer ${tokenService.getAuthToken()}`
          }
        }).then((tagRes) => {
          if(!tagRes.ok) {
            return tagRes.json().then(e => Promise.reject(e))
          }
          return tagRes.json()
        }).then((tagRes) => {
          this.handleSetTags(tagRes)
          fetch(`${API_BASE_URL}/users`, {
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
            this.handleSetUser(userRes)
          })
        })
      }).catch(error => console.error(error))
    }
  }

  render() {
    const value = {
      user: this.state.user,
      categories: this.state.categories,
      tags: this.state.tags,
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
                handleSetCat = {this.handleSetCat}
                handleSetTags = {this.handleSetTags}
                handleSetRecTags = {this.handleSetRecTags}
                handleSetUser = {this.handleSetUser}
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