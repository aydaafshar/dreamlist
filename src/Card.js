import React, { useState } from "react";
import {
  addComment,
  addDream,
  onChange,
  onChange2,
  setEditingFlag,
  commentRemove,
} from "./Store";
import { useDispatch, useSelector } from "react-redux";

function Card() {
  const [newDream, setNewDream] = useState("");

  const [editComment, setEditComment] = useState("");

  const dispatch = useDispatch();
  const dreams = useSelector((state) => state.dreams);
  const values = useSelector((state) => state.commentInput);

  console.log(dreams);
  const handleInput = (e) => {
    setNewDream(e.target.value);
  };
  const addHandle = () => {
    if (newDream.trim() !== "") {
      dispatch(
        addDream({
          id: Math.random(),
          dreamText: newDream,
          comments: [],
        })
      );
      setNewDream("");
    }
  };
  const handleComent = (e, dreamId) => {
    dispatch(
      onChange({
        id: dreamId,
        value: e.target.value,
      })
    );
  };

  const HandleAddComment = (idx) => {
    if (values[idx.toString()].trim() !== "") {
      dispatch(
        addComment({
          dreamId: idx,
          comment: {
            id: Math.random(),
            commentText: values[idx.toString()],
          },
        })
      );
      dispatch(
        onChange({
          id: idx,
          value: "",
        })
      );
    }
  };
  const handleEditComment = (commentId, dreamId) => {
    dispatch(
      setEditingFlag({
        dreamId,
        commentId,
        isEditing: true,
      })
    );
  };
  const handleRemove = (commentId, dreamId) => {
    dispatch(
      commentRemove({
        dreamId,
        commentId,
      })
    );
  };

  const handleSave = (commentId, dreamId) => {
    dispatch(
      setEditingFlag({
        dreamId,
        commentId,
        isEditing: false,
        commentText: values[commentId.toString()],
      })
    );
  };
  const handleonchangecomment = (e, commentId) => {
    dispatch(
      onChange({
        id: commentId,
        value: e.target.value,
      })
    );
  };
  return (
    <div className="container">
      <div className="header">
        <input
          type="text"
          className="input"
          placeholder="add your fucking dream"
          onChange={handleInput}
          value={newDream}
        />
        <button className="btn" onClick={addHandle}>
          add
        </button>
      </div>

      <div className="dreams">
        {dreams.map((dream) => (
          <div className="dream" key={dream.id}>
            <p>{dream.dreamText}</p>
            <div className="comment">
              <input
                className="input-c"
                type="text"
                placeholder="add your comment to fucking dream"
                onChange={(e) => handleComent(e, dream.id)}
                value={values[dream.id.toString()]}
              />
              <button
                className="btn-c"
                onClick={() => HandleAddComment(dream.id)}
              >
                add
              </button>
            </div>
            <div className=" comments">
              <ul>
                {dream.comments.map((comment) => (
                  <li key={comment.id}>
                    {comment.isEditing ? (
                      <>
                        <input
                          className="input"
                          type="text"
                          value={values[comment.id.toString()]}
                          onChange={(e) => handleonchangecomment(e, comment.id)}
                        />

                        <button
                          className="btn-list"
                          onClick={() => handleSave(comment.id, dream.id)}
                        >
                          save
                        </button>
                      </>
                    ) : (
                      <>
                        {comment.commentText}
                        <button
                          className="btn-list"
                          onClick={() => handleRemove(comment.id, dream.id)}
                        >
                          -
                        </button>
                        <button
                          className="btn-list"
                          onClick={() =>
                            handleEditComment(comment.id, dream.id)
                          }
                        >
                          edit
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
