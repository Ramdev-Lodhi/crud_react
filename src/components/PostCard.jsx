/* eslint-disable react/prop-types */
export const PostCard = ({ curElem, onDeletePost }) => {
  const { id, title, body } = curElem;

  return (
    <div key={id} className="post-card">
      <h5>Title: {title}</h5>
      <p>Body: {body}</p>
      <div className="btn">
        <button style={{ backgroundColor: "green" }}>Edit</button>
        <button
          style={{ backgroundColor: "red" }}
          onClick={() => onDeletePost(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
