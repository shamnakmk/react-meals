import React, { Fragment } from "react";
import MealsSummery from "./MealsSummery";
import AvailableMeals from "./AvailableMeals";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummery />
      <AvailableMeals />
    </Fragment>
  );
};
export default Meals;
