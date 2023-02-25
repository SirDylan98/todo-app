import axios from "axios";

const baseUrl="http://localhost:8080/api/v1/auth/login"

 const login =(loginCredentials)=>{

    return axios.post( baseUrl,loginCredentials)
}
// export const axiosInstance = axios.create({
//     url,
//     headers: { Authorization: token },
//   });
export const getAllPost =(token)=>{
    let url = "http://localhost:8080/posts/"
    axios.interceptors.request.use(
        config=>{
            config.headers.Authorization=`Bearer ${token}`;
            return config;
        },error=>{
            return Promise.reject(error)
        }
    );
    // put the token in the header
    //console.log("this is my token",token)
   
  
   let headers={ Authorization: `Bearer ${token}` }
 

    return axios.get(url)    
}

export default login;