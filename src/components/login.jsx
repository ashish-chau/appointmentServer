import { Link, useNavigate } from "react-router-dom";
import{useFormik} from "formik";
import axios from "axios";
import { useCookies } from "react-cookie";

export function Login(){

    let navigate = useNavigate()

    const[Cookies, setCookie, removeCookie] = useCookies('userid');


    const formik = useFormik({
        initialValues:{
            UserId:'',
            Password:''
        },
        onSubmit:(user)=>{
            axios.get(`http://127.0.0.1:6060/get-users`).then((response)=>{
                    var client = response.data.find(record => record.UserId === user.UserId);
                    if(client)
                        {
                            if(user.Password === client.Password){
                                setCookie("userid", user.UserId)
                                navigate('/dashboard')
                            }else{
                                navigate('/invalid')
                            }
                        }else{
                            navigate('/invalid')
                        }

                    
            })

        }
    })

    return(
        <div className="d-flex justify-content-center align-content-center">
            <form onSubmit={formik.handleSubmit} className="border border-2 border-dark rounded bg-light m-3 p-3" style={{width:"400px"}}>
            <div className="bi bi-person-fill h2">Login <Link to="/" className="btn btn-close" style={{marginLeft:'200px'}}></Link></div>
            <dl>
                <dt>UserId</dt>
                <dd><input type="text" className="form-control" name="UserId" onChange={formik.handleChange} /></dd>
                <dt>Password</dt>
                <dd><input type="password" className="form-control" name="Password" onChange={formik.handleChange}/></dd>
                <button type="submit" className="btn btn-dark w-100 mt-2">Login</button>
                <div className="m-2">
                    <Link to='/register' className="text-decoration-none">Not Register <span className="text-success text-decoration-underline me-1">Create an account</span></Link>
                </div>
            </dl>
            </form>
        </div>
    )
}