import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FunctionAddUser } from "../Redux/Action";

const Adduser = () => {
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [password, setPassword] = useState("");
  const [role, rolechange] = useState("Admin");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const userobj = { name, email, password, role };
    dispatch(FunctionAddUser(userobj));
    navigate("/user");
  };


  function validateForm(e) {
    e.preventDefault();
    // Check if the First Name is an Empty string or not.

    if (name.length == 0) {
      setNameError(" Name can not be empty");
      return;
    }

    // Check if the Email is an Empty string or not.

    if (email.length == 0) {
      setEmailError("Email Address can not be empty");
      return;
    }

    if (password.length < 8) {
      setPasswordError(
        "Password must contain greater than or equal to 8 characters."
      );
      return;
    }
    const alphanumericRegex = /^[a-zA-Z0-9]+$/i;
    const result = alphanumericRegex.test(password);
    if (result === false) {
      setPasswordError("Password should contain alphanumeric values");
      return;
    }
    handlesubmit(e);
  }

  return (
    <div>
      <form onSubmit={(e) => validateForm(e)}>
        <div className="card">
          <div className="card-header" style={{ textAlign: "left" }}>
            <h2>Add User</h2>
          </div>
          <div className="card-body" style={{ textAlign: "left" }}>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    value={name}
                    onChange={(e) => {
                      namechange(e.target.value);
                      if (name.length == 0) {
                        setNameError("Name can not be empty");
                      } else {
                        setNameError("");
                      }
                    }}
                    className="form-control"
                    required
                  ></input>
                  <span style={{ color: "red" }}>{nameError}</span>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    value={email}
                    onChange={(e) => {
                      emailchange(e.target.value);
                      if (email.length == 0) {
                        setEmailError("Email Address can not be empty");
                      } else {
                        setEmailError("");
                      }
                    }}
                    className="form-control"
                    required
                  ></input>
                  <span style={{ color: "red" }}>{emailError}</span>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Password</label>
                  <input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (e.target.length < 8) {
                        setPasswordError(
                          "Password must contain greater than or equal to 8 characters."
                        );
                      } else {
                        setPasswordError("");
                      }
                      const alphanumericRegex = /^[a-zA-Z0-9]+$/i;
                      const result = alphanumericRegex.test(e.target.value);
                      if (result === false) {
                        setPasswordError(
                          "Password should contain alphanumeric values"
                        );
                      }
                    }}
                    className="form-control"
                    required
                  ></input>
                  <span style={{ color: "red" }}>{passwordError}</span>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Role</label>
                  <select
                    value={role}
                    onChange={(e) => rolechange(e.target.value)}
                    className="form-control"
                    required
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="client">Client</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer" style={{ textAlign: "left" }}>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={validateForm}
            >
              Submit
            </button>{" "}
            |
            <Link className="btn btn-danger" to={"/user"}>
              Back
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Adduser;
