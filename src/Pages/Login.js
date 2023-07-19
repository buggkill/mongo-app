import React, { useState } from "react";
import { firestore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
const Login = () => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});
  const [errmsg, setErrmsg] = useState("");
  const ref = collection(firestore, "users");

  const handleLogin = async (e) => {
    e.preventDefault();
    const queryRef = query(
      ref,
      where("email", "==", email),
      where("password", "==", password)
    );
    const querySnapshot = await getDocs(queryRef);

    try {
      console.log("data=>>", querySnapshot, queryRef);
      const documentsData = querySnapshot.docs.map((doc) => doc.data());
      setData(documentsData);
      if (documentsData.length === 0) {
        console.log("user not found");
      } else {
        console.log("user found", documentsData);
      }
    } catch (e) {
      console.log(e);
      setErrmsg(e);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    let data = {
      email: email,
      password: password,
    };
    try {
      addDoc(ref, data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        {login && (
          <form onSubmit={handleLogin}>
            LOGIN
            <label>Enter email: </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label>Enter password: </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
      <div>
        {!login && (
          <form onSubmit={handleSignup}>
            SIGNUP
            <label>Enter email: </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label>Enter password: </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
      <div>
        <label
          style={{ color: login ? "red" : "green" }}
          onClick={() => setLogin(!login)}
        >
          {login
            ? "Not registered yet? Click here to signup"
            : "Already a user? Click here to log in"}
        </label>
      </div>
    </div>
  );
};

export default Login;
