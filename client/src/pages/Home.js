import React from "react";
import ExerciseList from "../components/ExerciseList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <ExerciseList />
      <Cart />
    </div>
  );
};

export default Home;
