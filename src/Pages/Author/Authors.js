import React, { useState, useEffect, Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";
import routes from "../../routes/routes";
import networkRequests from "../../services/networkRequests";
import { AuthorContext } from "../../Store/AuthorProvider";
import { LOAD_AUTHORS } from "../../actions/actions";

const Authors = () => {
  // const [authors, setAuthors] = useState([]);
  const history = useHistory();
  const authorContext = useContext(AuthorContext);
  const { authorState, authorDispatch } = authorContext;
  const { authors } = authorState;
  /**
   * `useEffect` with empty array as second argument
   * behaves as componentDidMount only
   */
  useEffect(() => {
    networkRequests("/authors")
      .then(result => {
        // setAuthors(result.authors);
        authorDispatch({
          type: LOAD_AUTHORS,
          payload: result.authors
        });
      })
      .catch(error => {
        console.error(error);
        // alert("Something went wrong!");
      });
  }, []);

  return (
    <Fragment>
      {authors.map((author, authorIndex) => {
        const clickedReadMore = () => {
          history.push(routes.author.replace(":authorname", author._id));
        };
        return (
          <Fragment key={authorIndex}>
            <p onClick={clickedReadMore}>{author.firstName}</p>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default Authors;
