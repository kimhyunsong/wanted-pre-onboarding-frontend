import axios from "axios"
import { useEffect, useState } from "react"
import  { redirect, useNavigate } from "react-router-dom"
import axiosInstance from "./httpService";

function SignIn(){
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [validateForm, setValidateForm] = useState(true)
  const input_email = ((e)=>{
    setEmail(e.target.value)
  })

  const input_password = ((e)=>{
    setPassword(e.target.value)
  })

  const sendSignInForm = ((e)=>{
    const reqeustData = {
      "email" : email,
      "password" : password
    }
    axiosInstance.post(process.env.REACT_APP_HOST + "auth/signin", reqeustData)
    .then((res)=>{
      window.localStorage.setItem("AccessToken", res.data.access_token)
      navigate('/todo')
    })
    .catch((err)=>{
      alert(err.response.data.message)
    })
  })
  useEffect(()=>{
    if (window.localStorage.getItem("AccessToken")){
      setTimeout(navigate('/todo'), 100)
    }
  }, [])

  useEffect(()=>{
    if (email.indexOf("@") !== -1 && password.length >= 8) {
      setValidateForm(false)
    } else {
      setValidateForm(true);
    } 
  }, [email, password])

  return (
  <>
    <input data-testid="email-input" value={email} onChange={input_email}/>
    <input data-testid="password-input" type="password" value={password} onChange={input_password}/>
    <button data-testid="signin-button" onClick={sendSignInForm} disabled={validateForm}>로그인</button>
  </>
  )
}


export default SignIn;