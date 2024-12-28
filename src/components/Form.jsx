/* eslint-disable react/prop-types */
import { useState } from "react";
import { postData } from "../services/PostApi";

export const Form = ({ post, setPost }) => {
  const [addData, setAddData] = useState({ title: "", body: "" });
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
      setPost([...post, res.data]);
      setAddData({ title: "", body: "" });
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    addDataPost(addData);
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Add Title"
        autoComplete="off"
        value={addData.title}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="body">Body</label>
      <textarea
        type="text"
        name="body"
        id="body"
        rows="1"
        placeholder="Add Post"
        autoComplete="off"
        value={addData.body}
        onChange={handleInputChange}
        required
      />
      <button type="submit">ADD</button>
    </form>
  );
};
