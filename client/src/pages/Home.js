import React from "react";
import ExerciseList from "../components/ExerciseList";
import CategoryMenu from "../components/CategoryMenu";
import Routine from "../components/Routine";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <ExerciseList />
    </div>
  );
};

export default Home;
