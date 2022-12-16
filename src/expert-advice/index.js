import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {findAllExpertAdviceThunk} from "../services/expert-advice-thunk";
import {useDispatch, useSelector} from "react-redux";

const ExpertAdvice = () => {

  const {expertAdvice} = useSelector((state) => state.expertAdvice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findAllExpertAdviceThunk())
  }, [dispatch]);

  return (
      <>
        <ul className="list-group">
          <li className="list-group-item">
            <h1 className="wd-page-title">Expert Advice</h1>
          </li>
          <li className="list-group-item">
            {expertAdvice.map(advice =>
                <>
                  <div>
                    <Link to={`/profile/${advice.user._id}`} className="fw-bold pe-1 text-decoration-none">{advice.user.fullName} ({advice.user.username})
                    </Link>
                    &middot;
                    <span className="ps-1 fw-normal text-secondary">{new Date(advice.date).toLocaleDateString("en-US", {
                      timeZone: 'UTC',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                    <div className="mt-2 mb-2">{advice.content}</div>
                    Recipe: <Link to={`/details/${advice.recipe.edamamId}`}>{advice.recipe.label}</Link>
                  </div>
                  <hr/>
                </>
            )}
          </li>
        </ul>
      </>
  );
}

export default ExpertAdvice;