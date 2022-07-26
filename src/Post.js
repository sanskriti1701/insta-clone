import React, { useEffect, useState } from 'react';
import './Post.css';
import Avatar from '@mui/material/Avatar';
import { db } from './firebase';
import firebase from 'firebase/compat';

function Post({ user, postId, username, caption, imageUrl }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState([]);

    useEffect(() => {

        if (postId) {
            let unsubscribe;
            if (postId) {
                unsubscribe = db
                    .collection("posts")
                    .doc(postId)
                    .collection("comments")
                    .orderBy('timestamp','desc')
                    .onSnapshot((snapshot) => {
                        setComments(snapshot.docs.map((doc) => doc.data()))
                    })
            }

          


            return () => {
                unsubscribe();
            }
        }

        }, [postId])

        const postComment = (e) => {
                e.preventDefault();

                db.collection("posts").doc(postId).collection("comments").add( {
                    test: comment,
                    username: user.displayName,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
                setComment('')
        }

    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt='Manas'
                    src="./public/1.jpeg" />
                <h3>{username}</h3>

            </div>


            <img className="post__image" src={imageUrl} alt="post" />
            {/* image */}

            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>

            <div className="post__comments">
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username} </strong>{comment.test}
                    </p>
                    
                ))}
            </div>

        <form className="post__commentBox">
            <input 
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment} 
            onChange={(e) => setComment(e.target.value)}
            />
            <button
            className="post__button"
            
            disabled={!comment}
            type="submit"
            onClick={postComment}
            >
                Post
            </button>
        </form>
        </div>
    )
}

export default Post
