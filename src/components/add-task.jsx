import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function AddTask(){


    const[cookies,setCookie, removeCookie] = useCookies('userid')
    let navigate = useNavigate()
    const formik = useFormik({
        initialValues:{
            Appointment_Id:0,
            Title:'',
            Description:'',
            Date:'',
            UserId:cookies['userid']
        },
        onSubmit: (task) => {
            axios.post(`http://127.0.0.1:6060/add-task`, task);
            alert("Task added successfully")
            navigate('/dashboard')

        }
    })
    
    return(
        <div className="d-flex justify-content-center align-content-center">
            
            <form onSubmit={formik.handleSubmit} className="border border-2 border-dark rounded bg-light m-3 p-3 w-25" >
            <h2>Add Appointments</h2>
            <div className="text-danger h4">
                  {cookies['userid']} -Add Task
            </div>
                <dl>
                    <dt>Appointment Id</dt>
                    <dd><input type="number" name="Appointment_Id" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Title</dt>
                    <dd><input type="text" name="Title" onChange={formik.handleChange}  className="form-control"/></dd>
                    <dt>Description</dt>
                    <dd>
                        <textarea onChange={formik.handleChange} name="Description" rows="4" cols="40" className="form-control"></textarea>
                    </dd>
                    <dt>Date</dt>
                    <dd><input type="date" name="Date" onChange={formik.handleChange} className="form-control" /></dd>
                </dl>
                <button type="submit" className="btn btn-warning me-2">Submit</button>
                <Link  to="/dashboard" className="btn btn-success">Cancel</Link>

            </form>
        </div>
    )
}