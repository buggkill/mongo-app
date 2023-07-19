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
import "../styles.css";
const Login = () => {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
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
      name: name,
      lname: lname,
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
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {login && (
          <form onSubmit={handleLogin}>
            <p className="form-title">LOGIN</p>
            <div className="form">
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
              <br />
              <button type="submit">Submit</button>
            </div>
          </form>
        )}
      </div>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {!login && (
          <form onSubmit={handleSignup}>
            <p className="form-title">SIGNUP</p>
            <div className="form">
              {" "}
              <label>Enter name: </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br /> <label>Enter lastname: </label>
              <input
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
              <br />
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
            </div>
          </form>
        )}
      </div>

      <div>
        <p
          style={{ color: login ? "red" : "green" }}
          onClick={() => setLogin(!login)}
        >
          {login
            ? "Not registered yet? Click here to signup"
            : "Already a user? Click here to log in"}
        </p>
      </div>
    </div>
  );
};

export default Login;
