import React, { useEffect, useState } from "react";
import fire from "./firebase";
import Login from "./Login";
import NavBar from "./NavBar";
import Home from "./Home";
import "./UserAuth.css";

const UserAuth = () => {
  const [user, setUser] = useState("sv");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailerror, setEmailerror] = useState("");
  const [pwderror, setPwderror] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailerror("");
    setPwderror("");
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailerror(err.message);
            break;
          case "auth/wrong-password":
            setPwderror(err.message);
            break;
        }
      });
  };

  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailerror(err.message);
            break;
          case "auth/weak-password":
            setPwderror(err.message);
            break;
        }
      });
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <>
      {user ? (
        <div>
          <NavBar handleLogout={handleLogout} />
          <Home user={user} />
        </div>
      ) : (
        <div className="App">
          <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailerror={emailerror}
            pwderror={pwderror}
          />
        </div>
      )}
    </>
  );
};

export default UserAuth;
