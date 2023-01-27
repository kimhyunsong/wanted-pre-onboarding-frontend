import axios from "axios"
import { useEffect, useState } from "react"
import  { useNavigate } from "react-router-dom"

function SignUp(){
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

  const sendSignUpForm = ((e)=>{
    const reqeustData = {
      "email" : email,
      "password" : password
    }
    axios.post(process.env.REACT_APP_HOST + "auth/signup", reqeustData)
    .then((res)=>{
      navigate('/signin')
    })
    .catch((err)=>{
      alert(err.response.data.message)
    })
  })

  useEffect(()=>{
    if (email.indexOf("@") !== -1 && password.length >= 8) {
      setValidateForm(false)
    } else setValidateForm(true)
  }, [email, password])


  useEffect(()=>{
    if (window.localStorage.getItem("AccessToken")){
      navigate('/todo')
    }
  }, [])

  return (
  <>
    <input data-testid="email-input" value={email} onChange={input_email}/>
    <input data-testid="password-input" type="password" value={password} onChange={input_password}/>
    <button data-testid="signup-button" onClick={sendSignUpForm} disabled={validateForm}>회원가입</button>
  </>
  )
}


export default SignUp