import React, { useState, useEffect, Fragment, useContext } from "react";
import Post from "../../Components/Post";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { AuthorContext } from "../../Store/AuthorProvider";
import routes from "../../routes/routes";
import networkRequest from "../../services/networkRequests";
import { LOAD_AUTHOR_DETAIL } from "../../actions/actions";

const AuthorPage = () => {
  const { authorname } = useParams();
  const [authorPost, setAuthorPost] = useState([]);
  // const authorContext = useContext(AuthorContext);
  // const { authorState, authorDispatch } = authorContext;
  // const { authorData } = authorState;

  const history = useHistory();
  useEffect(() => {
    networkRequest(`/authors/${authorname}`)
      .then(result => {
        console.log(result);
        const { author = {} } = result;
        console.log("-------------");
        console.log(author);
        setAuthorPost(author);
      //   authorDispatch({
      //     type: LOAD_AUTHOR_DETAIL,
      //     payload: result.author
      //   });
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <Fragment>
      {authorPost.map((post, postIndex) => {
        const clickedMore = () => {
          history.push(routes.post.replace(":id", post.id));
        };
        return (
          <Fragment key={postIndex}>
            <Post
              title={post.title}
              author={post.author}
              content={post.content}
              isOnlySummary={true}
            />
            <Button onClick={clickedMore} color="primary">
              Read More
            </Button>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default AuthorPage;
