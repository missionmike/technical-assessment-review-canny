import "./css/_App.css";

import Header from "./Header";
import PostList from "./PostList";
import PostSort from "./PostSort";
import React from "react";

const App = () => (
  <div className="app">
    <Header />
    <PostSort />
    <PostList />
  </div>
);

export default App;
