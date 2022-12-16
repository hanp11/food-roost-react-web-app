import React from "react";
import './index.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDrumstickBite} from "@fortawesome/free-solid-svg-icons";

const HomeComponent = () => {
  return (
      <>
        <ul className="list-group">
          <li className="list-group-item">
            <h1 className="wd-food-roost text-center">
              Food Roost
              <FontAwesomeIcon className="ps-1" icon={faDrumstickBite} />
            </h1>
          </li>
          <li className="list-group-item">
            <h2 className="wd-page-title">Home</h2>
            <span>Discover recipes to help you make healthy eating choices.</span>
          </li>
          <li className="list-group-item">
            <h3 className="wd-sub-heading-title">Recipe of the Day</h3>
          </li>
        </ul>
      </>
  );
};

export default HomeComponent;