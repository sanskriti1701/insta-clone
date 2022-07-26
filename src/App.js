import './App.css';
import React, { useState, useEffect } from 'react';
import Post from './Post';
import { db } from './firebase';
import Modal from '@mui/material/Modal';
import { Button } from '@material-ui/core'
import { Input } from '@material-ui/core';
import { auth } from './firebase';
import ImageUpload from './ImageUpload'
import InstagramEmbed from 'react-instagram-embed';

<script async="" defer="defer" src="//platform.instagram.com/en_US/embeds.js"></script>

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //usern logged in
        console.log(authUser);

        setUser(authUser);
      }
      else {
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user, username]);


  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, [])

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));

    setOpen(false);
  }

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <form>
          <center className="app__signup">
            <img
              className="app__headerImage"
              src="https://logos-world.net/wp-content/uploads/2020/04/Instagram-Logo.png" alt=""
            />

            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" onClick={signUp}>SIGN In</Button>

          </center>
        </form>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <form>
          <center className="app__signup">
            <img
              className="app__headerImage"
              src="https://logos-world.net/wp-content/uploads/2020/04/Instagram-Logo.png" alt=""
            />

            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" onClick={signIn}>SIGN In</Button>

          </center>
        </form>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://logos-world.net/wp-content/uploads/2020/04/Instagram-Logo.png" alt=""
        />

        {user ? (
          <Button onClick={() => auth.signOut()}>Log Out</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>SIGN UP</Button>
          </div>
        )}
      </div>

      <div className="app__posts">
        <div className="app__postsLeft">

          {
            posts.map(({ id, post }) => (
              < Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            ))
          }
        </div>

        {/* <div className="app__postsRight"> */}


          <InstagramEmbed
            url='https://www.instagr.am/p/Zw9o4/'
            clientAccessToken='a6f7ec215a10c6f0811144eb95b10875'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => { console.log("hi") }}
            onSuccess={() => { }}
            onAfterRender={() => { }}
            onFailure={() => { }}
          />
        {/* </div> */}

      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )}


    </div>
  );
}


export default App;
