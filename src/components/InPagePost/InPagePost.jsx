// import styles from "./InPagePost.module.css";

import { Link } from "react-router";

function InPagePost({ post }) {
  return (
    <>
      <div>
        <Link to={`/posts/${post.id}`}>
          <h3>{post.title}</h3>
          <p>Pub: {post.uploadedAt}</p>
          <p>By {post.author.user.username}</p>
        </Link>
      </div>
    </>
  );
}

export default InPagePost;
