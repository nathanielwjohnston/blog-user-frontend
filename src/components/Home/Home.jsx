// import styles from "./Home.module.css";

import { useEffect, useState } from "react";
import InPagePost from "../InPagePost/InPagePost";

import { API_URL } from "../../config";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(`${API_URL}/user-api/posts`);
        if (res.ok) {
          const fetchedPosts = await res.json();
          setPosts(fetchedPosts);
        } else {
          throw new Error("Not received");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, []);

  return (
    <>
      <div>Home</div>
      {posts.map((post) => {
        return <InPagePost key={post.id} post={post} />;
      })}
    </>
  );
}

export default Home;
