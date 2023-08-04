import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FunctionAddUser, FunctionAddMultipleUser } from "../Redux/Action";

const AddMultipleUser = () => {
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [data, setData] = useState([
    { name: "", email: "", password: "", role: "" },
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddInputFields = () => {
    setData([...data, { name: "", email: "", password: "", role: "" }]);
  };

  const handleDeleteInputFields = (i) => {
    const deleteUser = [...data];
    deleteUser.splice(i, 1);
    setData(deleteUser);
  };

  const handleMultipleUser = (e) => {
    e.preventDefault();
    data.forEach((userData, index) => {
      setTimeout(() => {
        dispatch(FunctionAddMultipleUser(userData));
      }, index * 1000);
    });
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
    handleAddInputFields();
  }

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onChangeVal = [...data];
    onChangeVal[i][name] = value;
    setData(onChangeVal);
  };
  return (
    <div>
      <form onSubmit={(e) => handleMultipleUser(e)}>
        <div className="card">
          <div className="card-header" style={{ textAlign: "left" }}>
            <h2>Add User</h2>
          </div>
          <div className="card-body" style={{ textAlign: "left" }}>
            {data.map((val, i) => (
              <div className="row" key={val + i}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      height: "30px",
                      width: "30px",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "gray",
                      borderRadius: "50%",
                      marginTop: "10px",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{
                      textAlign: "right",
                      cursor: "pointer",
                      float: "right",
                      fontSize: "24px",
                      fontWeight: "600",
                      height: "30px",
                      width: "30px",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "red",
                      marginTop: "10px",
                      paddingBottom: "5px",
                    }}
                    onClick={() => handleDeleteInputFields(i)}
                  >
                    x
                  </span>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      name="name"
                      value={val.name}
                      onChange={(e) => {
                        handleChange(e, i);
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
                      name="email"
                      value={val.email}
                      onChange={(e) => {
                        handleChange(e, i);
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
                      value={val.password}
                      name="password"
                      onChange={(e) => {
                        handleChange(e, i);
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
                      name="role"
                      value={val.role}
                      onChange={(e) => {
                        handleChange(e, i);
                      }}
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
            ))}
            <button
              style={{ float: "right", marginTop: "10px" }}
              className="btn btn-secondary"
              type="submit"
              onClick={(e) => validateForm(e)}
            >
              Add another user
            </button>{" "}
          </div>
          <div className="card-footer" style={{ textAlign: "left" }}>
            <button className="btn btn-primary" type="submit">
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

export default AddMultipleUser;
