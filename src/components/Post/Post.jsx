// import styles from "./Post.module.css";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Comment from "../Comment/Comment";

// TODO: re add setAuth for users attempting
// to make a comment
function Post() {
  const location = useLocation();
  const [, postId] = location.pathname.split("posts/");

  const [post, setPost] = useState();

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
          {post.comments.map((comment) => {
            return <Comment key={comment.id} comment={comment} />;
          })}
        </div>
      )}
    </>
  );
}

export default Post;
