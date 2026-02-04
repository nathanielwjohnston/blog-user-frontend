// import styles from "./Comment.module.css";

function Comment({ comment }) {
  return (
    <>
      <div>
        <h4>{comment.user.username}</h4>
        <p>{comment.content}</p>
        <p>{comment.uploadedAt}</p>
      </div>
    </>
  );
}

export default Comment;
