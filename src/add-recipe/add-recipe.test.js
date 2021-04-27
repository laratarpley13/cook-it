import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AddRecipe from './add-recipe';
import Context from '../Context'

it('renders without crashing', () => {
  const div = document.createElement('div');

  const user = {
      id: 1,
      email: "demo@demo.com",
      nickname: "Demo"
  }

  const tags = [
      {
          id: 1,
          title: "vegan"
      },
      {
          id: 2,
          title: "gluten-free"
      }
  ];

  const value = {
      user: user,
      tags: tags
  }

  ReactDOM.render(
    <Context.Provider value={value}>
      <BrowserRouter>
        <AddRecipe />
      </BrowserRouter>
    </Context.Provider>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
})