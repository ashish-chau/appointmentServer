import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";



export function RegisterUser(){

 const[msg,setMsg] =useState('');
 const[validClass, setValidClass]= useState('');



    let navigate = useNavigate()
    const formik = useFormik({
        initialValues:{
            UserId:'',
            UserName:"",
            Password:"",
            Email:"",
            mobile:""
        },
        onSubmit:(user)=>{
            axios.post(`http://127.0.0.1:6060/register-user` , user).then(()=>{
                    alert("User Registeer Successfully")
                    navigate('/login')

            })

        }
    })

    function VeryfyUser(e){
      axios.get(`http://127.0.0.1:6060/get-users`).then((response)=>{
                for(var user of response.data){
                    if(user.UserId === e.target.value){
                        setMsg("Already taken")
                        setValidClass("text-danger");
                        break;
                    }else{
                        setMsg("Available")
                        setValidClass("text-success");
                    }
                }
      })
    }

    

    return(
        <div  className="d-flex justify-content-center align-content-center">
            
             <form onSubmit={formik.handleSubmit} className="border border-2 border-dark rounded bg-light m-3 p-3" style={{width:"400px"}}>
                <div className="bi bi-person-fill h2"> User Registration <Link className="btn btn-close ms-3" to="/"></Link></div>
             
                <dl>
                    
                    <dt>UserId/UserName </dt>
                    <dd> <input type="text" name="UserId" className="form-control" onKeyUp={VeryfyUser} onChange={formik.handleChange} /></dd>
                    <dd className={validClass}>{msg}</dd>
                    <dt>Name</dt>
                    <dd><input type="text" name="UserName" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt>Email</dt>
                    <dd><input type="email" name="Email" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt>Mobile</dt>
                    <dd><input type="number" name="Mobile" className="form-control" onChange={formik.handleChange} /></dd>
                    <button type="submit" className="btn btn-warning mt-2 w-100">Submit</button>
                </dl>
                <div>
                    <Link to='/login' className="text-decoration-none"> <span className="text-success">Exiting User Login</span> </Link>
                </div>
             </form>
        </div>
    )
}