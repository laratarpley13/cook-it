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

    ingredients.map(ingredient => this.setState({
      ingredients: [...this.state.ingredients, {
        id: this.state.ingredients.length + 1,
        recipeId: newRecId,
        title: ingredient.title,
        amount: ingredient.amount
      }]
    }))

    directions.map(dir => this.setState({
      directions: [...this.state.steps, {
        id: this.state.steps.length + 1,
        recipeId: newRecId,
        text: dir,
      }]
    }))

    let targetTags = [];
    for(let i=0; i<this.state.tags.length; i++) {
      for(let j=0; j<tags.length; j++) {
        if(this.state.tags[i].title === tags[j]) {
          targetTags.push(this.state.tags[i])
        }
      }
    }
    
    targetTags.map(tag => {
      this.setState({
        recipeTags: [...this.state.recipeTags, {
          recipeId: newRecId,
          tagId: tag.id
        }]
      })
    })
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
                handleRecipeAdd={this.handleRecipeAdd}
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
