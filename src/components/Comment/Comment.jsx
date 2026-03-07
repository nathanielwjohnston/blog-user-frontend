// import styles from "./Comment.module.css";

import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import { API_URL } from "../../config";

function Comment({ comment, userId, commentId, removeComment, editComment }) {
  const { auth } = useOutletContext();
  const [editing, setEditing] = useState(false);

  let user;
  if (auth) {
    user = localStorage.getItem("user");
    user = JSON.parse(user);
  }

  const ownComment = auth && user.id === userId;

  async function deleteComment() {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/user-api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (res.ok) {
        removeComment(commentId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateComment(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const newContent = form.querySelector(".comment-content").value;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/user-api/comments/${commentId}`, {
        method: "PUT",
        body: JSON.stringify({
          content: newContent,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });

      if (res.ok) {
        const comment = await res.json();
        editComment(commentId, comment);
        setEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {editing ? (
        <form onSubmit={updateComment}>
          <label htmlFor={`edit-content-${commentId}`}>Content</label>
          <input
            id={`edit-content-${commentId}`}
            className="comment-content"
            type="text"
            defaultValue={comment.content}
          />
          <button type="submit">Update comment</button>
        </form>
      ) : (
        <div>
          <h4>{comment.user.username}</h4>
          <p>{comment.content}</p>
          <p>{comment.uploadedAt}</p>
        </div>
      )}

      {ownComment && (
        <div>
          <button
            onClick={() => {
              setEditing(true);
            }}
          >
            Edit
          </button>
          <button onClick={deleteComment}>Delete</button>
        </div>
      )}
    </>
  );
}

export default Comment;
