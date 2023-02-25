import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
export default function Posts() {
  const cookie = new Cookies();
  const [posts, setPosts]=useState([])
  
  console.log("This is my  COOKIE==>>",cookie.get("Authtoken"))
  const handleDeletePost= async(id)=>{
    //
    await axios.delete(`http://localhost:8080/posts/delete/${id}`).then((res)=>{
      setPosts(posts.filter(post=>{
        return post.id!==id;
      }))
      console.log("The post has been deleted successfully")
      console.log("This is the status we are receiving",res.status)
    })
  }
  
  useEffect(()=>{
    const fetchPosts=async()=>{
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
      const response=  await axios.get("http://localhost:8080/posts/all")
      setPosts(response.data.slice(0, 15))
      
      console.log("these aree my posts", response.data)

    }
    fetchPosts();
  },[])
  return (
    <div className="w-full h-full">
      <div className="w-[50%] mx-auto mt-20 rounded-xl p-4 flex justify-between items-center bg-slate-700 shadow-xl">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="">ToDos</h1>
          {posts&&posts.map((post)=>(

          <div key={post.id} className=" bg-slate-400 w-full flex shadow-xl shadow-black/30 flex-col justify-center m-4 rounded-xl p-4 items-start">
              <h1 className="text-left text-md font-semibold underline">Title: {post.title}</h1>
              <p className="ml-1 text-sm">{post.body}</p>
                 <div className=" flex gap-2 mt-2">
                 <button className="rounded-xl px-6 py-2 font-semibold text-white hover:scale-105 ease-in-out duration-300 bg-blue-600"> Edit</button>
                 <button onClick={function(){handleDeletePost(post.id)}} className="rounded-xl px-6 py-2 font-semibold text-white hover:scale-105 ease-in-out duration-300 bg-red-600"> Delete</button>
                 </div>
          </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}
