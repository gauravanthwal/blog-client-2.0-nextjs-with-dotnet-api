'use client';
import { useParams } from 'next/navigation';
import React from 'react'

const AddComment = ({handleAddComment}) => {
    const params = useParams();
    const [comment, setComment] = React.useState('');

    const addComment = async (e) => {
        e.preventDefault();
        if (!comment) {
            return;
        }   
        const payload = {
            content: comment,
            blogId: params.blogId
        }
        handleAddComment(payload);
        setComment('');
    }
  return (
    <form className='mt-4 flex gap-2' onSubmit={addComment}>
      <input className='border py-2 px-2 rounded-md flex-1' type="text" value={comment} onChange={e=>setComment(e.target.value)} placeholder='Leave a comment...'/>
      <button className='border py-2 px-4 rounded-md cursor-pointer bg-gray-800 text-white hover:bg-gray-700'>Add Comment</button>
    </form>
  )
}

export default AddComment
