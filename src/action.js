import { ADD_COMMENT, ADD_DREAM } from "./actionTypes";
export const addDream = (dream) => ({
  type: ADD_DREAM,
  payload: {
    id: Math.floor(Math.random()),
    dream,
    comment,
  },
});

export const addComment = (dream) => ({
  type: addComment,
  payload: {
    id: Math.floor(Math.random()),
    comment,
  },
});
