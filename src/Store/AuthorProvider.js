import React, { createContext, useReducer } from "react";
import { LOAD_AUTHORS, LOAD_AUTHOR_DETAIL } from "../actions/actions";

const author = {
  authors: [],
  authorData: []
};

export const AuthorContext = createContext(author);
const { Provider } = AuthorContext;

const AuthorProvider = ({ children }) => {
  const [authorState, authorDispatch] = useReducer((oldState, action) => {
    switch (action.type) {
      case LOAD_AUTHORS:
        return {
          authors: action.payload
        };
      case LOAD_AUTHOR_DETAIL:
        return {
          authorData: action.payload
        };
      default:
        return oldState;
    }
  }, author);
  return (
    <Provider value={{ authorState, authorDispatch }}>{children}</Provider>
  );
};

export default AuthorProvider;
