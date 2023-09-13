import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

// use bootstrap to create a table

export default function Home() {

// create object for storing the user information
// useState: writing initial state as a empty array
// useEffect: tells react that the component needs to do something after the render
//  everytime the page is open, it will load the user information
const [users, setUsers] = useState([])

const {id} = useParams();

useEffect(() => {
    // whenever the page is loaded, this is show in the console.
    // console.log("code with arjun");
    loadUsers();
}, []) // give an empty array so it runs only once when the page loads, otherwise runs unlimited times.

// use async and await - jsx is executed line by line. unless this request is completed,
//  it won't move to next line
const loadUsers = async() => {
    // use the URL we use to get all the data
    const result = await axios.get("http://localhost:8080/users")
    // console.log(result) //logs all result
    // console.log(result.data) //logs only data
    setUsers(result.data);
}

const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/user/${id}`)
    loadUsers()
}

  return (
    <div className="container">
      <div className="py-4">
        {/* padding/margin top: 4 */}
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
{/* add dynamic data from database
- .map creates a new array from calling a function for every array element
- user = individual users, index = counting the number */}
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>{index+1}</th>{/* increase the number of index each time */}
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{/* btn-primary = blue colour, mx-2 = margin left 2*/}
                    <Link className="btn btn-primary mx-2" to={`/viewuser/${user.id}`}>View</Link>
                    <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.id}`}>Edit</Link>
                    <button className="btn btn-danger mx-2" onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
