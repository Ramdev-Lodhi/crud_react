/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { postData, updatePost } from "../services/PostApi";

export const Form = ({ post, setPost, updatePostData, setupdatePostData }) => {
  const [addData, setAddData] = useState({ title: "", body: "" });
  let isEmpty = Object.keys(updatePostData).length === 0;
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const addDataPost = async (addData) => {
    const res = await postData(addData);
    console.log(res);
    if (res.status == 201) {
      setPost([res.data, ...post]);
      setAddData({ title: "", body: "" });
    }
  };
  const updateDataPost = async () => {
    const res = await updatePost(updatePostData.id, addData);
    console.log(res);
    if (res.status == 200) {
      setPost((prevPosts) =>
        prevPosts.map((curElem) =>
          curElem.id === updatePostData.id ? res.data : curElem
        )
      );
      setAddData({ title: "", body: "" });
      setupdatePostData({});
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    action === "ADD"
      ? addDataPost()
      : action === "EDIT"
      ? updateDataPost()
      : console.error("Unknown action:", action);
  };

  useEffect(() => {
    updatePostData &&
      setAddData({
        title: updatePostData.title || "",
        body: updatePostData.body || "",
      });
  }, [updatePostData]);

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="title">Title</label>
      <textarea
        type="text"
        name="title"
        id="title"
        placeholder="Add Title"
        autoComplete="off"
        rows="2"
        value={addData.title}
        onChange={handleInputChange}
        required
      />
      {/* <input
        type="text"
        name="title"
        id="title"
        placeholder="Add Title"
        autoComplete="off"
        value={addData.title}
        onChange={handleInputChange}
        required
      /> */}
      <label htmlFor="body">Body</label>
      <textarea
        type="text"
        name="body"
        id="body"
        rows="2"
        placeholder="Add Post"
        autoComplete="off"
        value={addData.body}
        onChange={handleInputChange}
        required
      />
      <button type="submit" value={isEmpty ? "ADD" : "EDIT"}>
        {isEmpty ? "ADD" : "EDIT"}
      </button>
    </form>
  );
};
