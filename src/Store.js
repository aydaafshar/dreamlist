import { configureStore, createSlice } from "@reduxjs/toolkit";

const inputSlice = createSlice({
  name: "commentInput",
  initialState: {},
  reducers: {
    onChange: (state, action) => {
      state[action.payload.id.toString()] = action.payload.value;
    },
  },
});

const dreamSlice = createSlice({
  name: "dreams",
  initialState: [],
  reducers: {
    addDream: (state, action) => {
      state.push(action.payload);
    },
    addComment: (state, action) => {
      const dream = state.find(
        (dreamText) => dreamText.id === action.payload.dreamId
      );
      if (dream) {
        dream.comments.push({ ...action.payload.comment, isEditing: false });
      }
    },
    onChange2: (state, action) => {
      const dream = state.find(
        (dreamText) => dreamText.id === action.payload.dreamId
      );
      if (dream) {
        const comment = dream.comments.find(
          (comment) => comment.id === action.payload.commentId
        );
        comment.commentText = action.payload.commentText;
      }
    },
    setEditingFlag: (state, action) => {
      const dream = state.find(
        (dreamText) => dreamText.id === action.payload.dreamId
      );
      if (dream) {
        const comment = dream.comments.find(
          (comment) => comment.id === action.payload.commentId
        );
        comment.isEditing = action.payload.isEditing;
        if (action.payload.commentText) {
          comment.commentText = action.payload.commentText;
        }
      }
    },
    commentRemove: (state, action) => {
      const dream = state.find(
        (dreamText) => dreamText.id === action.payload.dreamId
      );
      if (dream) {
        dream.comments = dream.comments.filter(
          (comment) => comment.id !== action.payload.commentId
        );
      }
    },
  },
});
export const {
  addDream,
  addComment,
  onChange2,
  setEditingFlag,
  commentRemove,
} = dreamSlice.actions;
export const { onChange } = inputSlice.actions;
export const store = configureStore({
  reducer: {
    dreams: dreamSlice.reducer,
    commentInput: inputSlice.reducer,
  },
});
