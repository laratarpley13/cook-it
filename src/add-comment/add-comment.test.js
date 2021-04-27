import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AddComment from './add-comment';
import Context from '../Context'

it('renders without crashing', () => {
  const div = document.createElement('div');

  const user = {
      id: 1,
      email: "demo@demo.com",
      nickname: "demo"
  }

  const value = {
      user: user
  }

  ReactDOM.render(
    <Context.Provider value={value}>
      <BrowserRouter>
        <AddComment />
      </BrowserRouter>
    </Context.Provider>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
})