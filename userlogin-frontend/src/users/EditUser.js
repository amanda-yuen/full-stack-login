import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  // add information and push into database = store information inside the state
  let navigate = useNavigate();

  const {id} = useParams();

  const [user, setUser] = useState({
    //initialise the object
    name: "",
    username: "",
    email: "",
  });

  // deconstruct the object made above in the {}
  const { name, username, email } = user;

  // pass/put the value into the object
  //  e = event : can be any name
  // only called when input is changed
  const onInputChange = (e) => {
    // since we're only giving the name field, we need to add the spread operator ...user
    // spread operator - keep adding the new object
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() =>{
    loadUser();
  }, []);

  //   post data into database and display data into the home page
  const onSubmit = async (e) => {
    e.preventDefault(); //stop default url showing
    await axios.put(`http://localhost:8080/user/${id}`, user); //get id from current route
    navigate("/"); //navigate back to home page /
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`)
    setUser(result.data);
  }

  // link using value in inputs
  return (
    <div className="container">
      <div className="row">
        {/* col-mediumsize-width-6span, offset-mediumsize-3 padding-4 margin-top-2*/}
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>
          {/* textcenter margin-4 */}

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              {/* marginbottom-3 */}
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              {/* marginbottom-4 */}
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              {/* marginbottom-4 */}
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-danger mx-2" to='/'>
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
