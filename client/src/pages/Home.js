import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");

  function createUser() {
    fetch("/api/auth", {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
  }
  function updateData() {
    fetch("/api/updateData", {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        data: data
      })
    })
  }

  return (
    <div>
      <input id="username" class="border-black border-2" onChange={(e) => {
        setUsername(e.target.value);
      }}>
      </input>
      <input id="password" class="border-black border-2" onChange={(e) => {
        setPassword(e.target.value);
      }}>
      </input>
      <button class="border-black border-2" onClick={createUser}>
        create
      </button>
      <br></br>
      <input id="data" class="border-black border-2" onChange={(e) => {
        setData(e.target.value);
      }}>
      </input>
      <button class="border-black border-2" onClick={updateData}>
        change
      </button>
    </div >
  )
}
export default Home;