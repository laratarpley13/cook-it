import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
//import TokenService from '../src/services/token-service';
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
//import EditComment from './edit-comment/edit-comment';
import DummyData from './store';

class App extends Component {
  state = {
    user: {
      id: 1,
      email: "demo@demo.com",
      nickname: "Demo Cook",
    },
    categories: DummyData.categories,
    tags: DummyData.tags,
    recipeTags: DummyData.recipeTags,
  }

  render() {
    console.log(this.state);
    const value = {
      user: this.state.user,
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
            render={(props) => 
              <Explore
                {...props}
              />
            }
          />
          <Route path='/user/:userId'
            render={(props) => 
              <UserView 
                {...props}
              />
            }          
          />
          <Route path='/recipe/:recipeId'
            render={(props) => 
              <RecipeView 
                {...props}
              />
            }          
          />
          <Route path='/add-recipe'
            render={(props) => 
              <AddRecipe 
                {...props}
              />
            }
          />
          <Route path='/add-comment'
            render={(props) => 
              <AddComment 
                {...props}
              />
            }
          />
        </main>
      </Context.Provider>
    );
  }
}

export default App;
