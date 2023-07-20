import React, { useState, useEffect } from "react";
import { firestore } from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';
// import UserPage from "./UserPage"
// import OtherPage from "./OtherPage"
import "../styles.css";
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
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});
  const [errmsg, setErrmsg] = useState("");
  const [role, setRole]=useState("Select a role");
  const ref = collection(firestore, "users");
  const navigate = useNavigate();


  const [users, setUsers] = useState([]);

  // Function to fetch users from Firestore
  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'users'));
    const usersData = querySnapshot.docs.map((doc) => doc.data());
    setUsers(usersData);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDropdownChange = (event) => {
    setRole(event.target.value);
  };

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

    if(role==="2"){
navigate("/user");
    }
    else if(role==="3")
    {
      navigate("/other");
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    let data = {
      name: name,
      lname: lname,
      email: email,
      password: password,
      role:role,
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
           <div class="form-cont">
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
          </div>
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
          <div class="form-cont">
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
                <select value={role} onChange={handleDropdownChange}>
                          <option value="select a role">Select a Role</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                </select>

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
                 <br />
              <button type="submit">Submit</button>
            </div>
          </form>
          </div>
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

      <div>
        <h2>User List</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {/* Display user information here */}
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Roll:{user.role}</p>
              {/* ... (any other user information you want to display) */}
            </li>
          ))}
        </ul>
      </div>
    </div>
    
  
  );
};

export default Login;
