// import styles from "./Post.module.css";

import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import Comment from "../Comment/Comment";

// TODO: re add setAuth for users attempting
// to make a comment
function Post() {
  const { setAuth, auth } = useOutletContext();
  const location = useLocation();
  const [, postId] = location.pathname.split("posts/");

  const [post, setPost] = useState();
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/user-api/posts/${postId}`,
        );
        if (res.ok) {
          const fetchedPost = await res.json();
          setPost(fetchedPost);
        } else {
          throw new Error("Not received");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPost();
  }, [postId]);

  function updateComment(e) {
    setNewComment(e.target.value);
  }

  function addCommentToPost(comment) {
    setPost({ ...post, comments: [...post.comments, comment] });
    setNewComment("");
  }

  async function makeComment(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3000/user-api/comments", {
        method: "POST",
        // Don't want to add user id here, otherwise
        // you could falsely post on someone else's
        // behalf
        body: JSON.stringify({
          commentContent: newComment,
          postId: postId,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });

      if (res.ok) {
        const comment = await res.json();
        console.log(comment);
        addCommentToPost(comment);
      } else {
        // TODO: this is causing fake logout bug
        setAuth(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function removeComment(commentId) {
    const newComments = post.comments.filter(
      (comment) => comment.id !== commentId,
    );

    setPost({ ...post, comments: [...newComments] });
  }

  function editComment(commentId, updatedComment) {
    const updatedComments = post.comments.map((comment) => {
      if (comment.id === commentId) {
        return updatedComment;
      } else {
        return comment;
      }
    });

    setPost({ ...post, comments: [...updatedComments] });
  }

  return (
    <>
      {!post && <div>Loading...</div>}
      {post && (
        <div>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Pub: {post.uploadedAt}</p>
          <p>By {post.author.user.username}</p>
          <h4>Comments:</h4>
          {auth && (
            <div>
              <form>
                <label>
                  <input
                    type="text"
                    placeholder="Write your comment ..."
                    value={newComment}
                    onChange={updateComment}
                  />
                </label>
                <button type="button" onClick={makeComment}>
                  Make comment
                </button>
              </form>
            </div>
          )}
          {post.comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                userId={comment.user.id}
                commentId={comment.id}
                removeComment={removeComment}
                editComment={editComment}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default Post;
