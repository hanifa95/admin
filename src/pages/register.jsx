import { users } from "../data/user";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";


const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Log = () => {
    const user = users.filter(
      (i) => i.email == email && i.password == password
    );
    console.log(user);
    if (user.length > 0) {
      localStorage.setItem("token", user[0].id);
      navigate("/products");
    } else {
      alert("Invalid email or password");
    }
  };

    const userDetail = () => {
    const data = users.filter((i) => i.id == localStorage.getItem("token"));
  };

  const Token = () =>{
    if(localStorage.getItem('token') != null) {
      // navigate('/products')
    }
  }
  useEffect(() => {
    Token();
  }, []);


  return (
    <div className="container-fluid">
      <div className="row bg-primary p-3">
        <div className="col-2">
          <i class="fa-brands fa-rockrms fs-3 ps-5 text-light"></i>
        </div>
        <div className="col-3">
          <a href="" className="pe-5 text-light text-light fw-bold">
            Dashboard
          </a>
          <a href="" className="pe-5 text-light fw-bold">
            Productos
          </a>
          <a href="" className="text-light fw-bold">
            Ventas
          </a>
        </div>
        <div className="col-5"></div>
        <div className="col-2 text-center">
          <i class="fa-solid fa-bell fs-4 text-light"></i>
        </div>
      </div>

      <div className="row">
        <div className="col-12 border-bottom border-1">
          <h2 className="p-3">Login</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 p-5">
          <h1 className="text-center p-4">Sign in to your account</h1>
          <input
            type="email"
            placeholder="Email address"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <br />
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <br />

           <div className="row">
            <div className="col-6 d-flex ">
            <input type="checkbox" className="ms-2"/>     
            <p className="pt-3 ps-2">Remember me </p>
            </div>
            <div className="col-6 text-end mt-3">
            <p className=" text-primary ">Forget your password ?</p>
            </div>
           </div>
       
          <div className="text-center mt-3">
            <button
              onClick={Log}
              className="btn btn-primary form-control fw-bold "
            >
              Sign in{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
