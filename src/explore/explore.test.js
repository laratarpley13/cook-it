import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Explore from './explore';
import Context from '../Context';

it('renders without crashing', () => {
  const div = document.createElement('div');
  
  const user = {
    id: 1,
    email: "demo@demo.com",
    nickname: "demo"
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
  ]

  const categories = [
    {
      id: 1,
      title: "breakfast"
    },
    {
      id: 2,
      title: "snack"
    }
  ]

  const value = {
    user: user,
    tags: tags,
    categories: categories
  }

  ReactDOM.render(
    <Context.Provider value={value}>
      <BrowserRouter>
        <Explore />
      </BrowserRouter>
    </Context.Provider>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
})