import { useState } from "react";
import app from "../../firebase/firebase.init";
import {
    GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Login = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSingIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };
  
  const handleGithubSingIn = () => {
    signInWithPopup(auth, githubProvider)
    .then(result => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser);
    })
    .catch(error => {
        console.log(error)
    })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {/* { user ? logout : sign in } */}

      {user ? (
        <button onClick={handleSignOut}>Sign out</button>
      ) : (
        <div>
            <button onClick={handleGoogleSingIn}>Google login</button>
            <button onClick={handleGithubSingIn}>Github login</button>
        </div>
      )}

      {user && (
        <div>
          <h3>User: {user.displayName}</h3>
          <p>Email: {user.email}</p>
          <img src={user.photoURL} alt="user" />
        </div>
      )}
    </div>
  );
};

export default Login;
