import React, { useState } from "react";
import login, { getAllPost } from "../Services/apiCalls";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const cookie = new Cookies();
  const navigate= useNavigate()
  const [token, setToken] = useState("");
  const [data, setData] = useState();
  const [loginCr, setLoginCr] = useState({
    userName: "",
    password: "",
  });
  // this is our interceptor for axios
  axios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${cookie.get("Authtoken")}`;
      console.log("this is my cookie", cookie.get("Authtoken"));
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  console.log("This is my Data", data);
  const handleOnChange = (e) => {
    e.preventDefault();
    //console.log("This is my event",e)
    setLoginCr({ ...loginCr, [e.target.name]: e.target.value });
    //console.log("these are my credentials", loginCr)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("username", loginCr.userName);
    console.log("password", loginCr.password);
    const response = await login(loginCr)
      .then(async (response) => {
        setToken(response.data.token);
        cookie.set("Authtoken", response.data.token, { path: "/" }); // setting the cookie
        // console.log("cookie ",response.data.token)
        // const dataa = await axios.get("http://localhost:8080/posts/all");
        // console.log("yeeeesss " + dataa.data);
        // setData(dataa.data);
        navigate("/posts")
      })
      .catch((e) => console.log("Error ", e));
  };
  return (
    <div className=" w-full h-full mt-40  flex justify-center items-center">
      <div className=" w-[40%] flex flex-col rounded-xl pt-3 border border-gray-500   mx-auto">
        <h1 className=" text-center text-2xl font-semibold text-slate-400">
          {" "}
          Login{" "}
        </h1>
        <div>
          <form className="p-5 w-full" onSubmit={(e) => handleSubmit(e)}>
            <div className="flex items-center w-full">
              <label htmlFor="" className="text-slate-600 w-24">
                UserName
              </label>
              <input
                type="text"
                name="userName"
                autoComplete="off"
                autoSave="off"
                value={loginCr.userName}
                onChange={(e) => {
                  handleOnChange(e);
                }}
                className="w-full ml-2 border rounded-xl border-slate-500 px-4 py-2"
                placeholder="Enter UserName"
              />
            </div>

            <div className="flex items-center mt-5 w-full">
              <label htmlFor="" className="text-slate-600  w-24">
                Password{" "}
              </label>
              <input
                type="password"
                name="password"
                autoSave="off"
                autoComplete="off"
                value={loginCr.password}
                onChange={(e) => {
                  handleOnChange(e);
                }}
                className="w-full ml-2 border rounded-xl border-slate-500 px-5 py-2"
                placeholder="Password"
              />
            </div>
            <div className="mt-2 flex flex-col ml-[90px]">
              <button className="text-slate-100  bg-blue-600 px-6 py-2 rounded-xl">
                {" "}
                Login In
              </button>
              <p className=" text-blue-600 text-sm font-semibold">
                Create Account if you dont have one
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
