import { addComment } from "./action";
import { ADD_COMMENT, ADD_DREAM } from "./actionTypes";
const initialState = {
  dreams: [],
};
const dreamReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DREAM:
      return {
        ...state,
        dreams: [...state.dreams, action.payload],
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
  }
};
