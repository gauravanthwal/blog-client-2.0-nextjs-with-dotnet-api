import React from "react";
import moment from "moment";

const Commnets = ({ comments, handleDeleteComment, handleUpdateComment }) => {
  return (
    <div>
      <div>
        {comments.length > 0 &&
          comments?.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              handleDeleteComment={handleDeleteComment}
              handleUpdateComment={handleUpdateComment}
            />
          ))}
        {comments?.length === 0 && (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

const Comment = ({ comment, handleDeleteComment, handleUpdateComment }) => {
  const [newComment, setNewComment] = React.useState(comment?.content);
  const inputRef = React.useRef(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your comment?"
    );
    if (!isConfirmed) return;

    handleDeleteComment(comment.id);
  };

  const handleUpdate = () => {
    if (newComment && newComment.trim() !== "") {
      handleUpdateComment(comment.id, newComment);
      setIsEditing(false); 
    }
  };

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      const el = inputRef.current;
      el.focus();
      // move cursor to the end
      const length = el.value.length;
      el.setSelectionRange(length, length);
    }
  }, [isEditing]);

  return (
    <>
      <div
        key={comment.id}
        className="bg-gray-50 p-2 pb-0 my-4 rounded-md border-l-4 border-gray-400"
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-400">{comment?.user?.email}</p>
          <p className="text-xs text-gray-500">
            {moment(comment?.createdAt).fromNow()}
          </p>
        </div>

        {isEditing ? (
          <>
            <div className="flex flex-col items-start justify-between mb-2">
              <textarea
                className="appearance-none resize-none outline-none bg-transparent focus:outline-none focus:ring-0"
                name=""
                id=""
                ref={inputRef}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <div className="flex gap-2 mb-2">
                <button onClick={handleUpdate} className="text-xs bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded-md text-white cursor-pointer">Save</button>
                <button className="text-xs cursor-pointer" onClick={() => setIsEditing(!isEditing)}>Cancel</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-700 font-semibold">{comment?.content}</p>
            <div className="flex gap-2 mt-2 pb-1">
              <button
                onClick={handleEdit}
                className="text-xs text-gray-600 font-semibold  rounded-md px-2 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-xs text-red-600 font-semibold rounded-md px-2 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Commnets;
