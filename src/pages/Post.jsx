import { useEffect, useState } from "react";
import { getPost, deletePost } from "../services/PostApi";
import { PostCard } from "../components/PostCard";
import "./Post.css";
import { Form } from "../components/Form";

export const Post = () => {
  const [post, setPost] = useState([]);

  const getPostData = async () => {
    const res = await getPost();
    setPost(res.data);
  };

  const handleDeletePost = async (id) => {
    setPost((prevPosts) => prevPosts.filter((curElem) => curElem.id !== id));
    try {
      const res = await deletePost(id);
      if (res.status !== 200) {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      console.error(error);
      getPostData();
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <>
      <section>
        <Form post={post} setPost={setPost} />
      </section>
      <section>
        <ul className="post-section">
          {post.map((curElem) => (
            <PostCard
              key={curElem.id}
              curElem={curElem}
              onDeletePost={handleDeletePost}
            />
          ))}
        </ul>
      </section>
    </>
  );
};