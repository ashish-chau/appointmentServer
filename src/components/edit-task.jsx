import axios from "axios";
import moment from "moment";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";

export function EditTask(){

    const[cookies,setCookies, removeCookies] = useCookies('userid')
    const[appointments,setAppointments] = useState([{Appointment_Id:0,Title:'',Description:'',Date:new Date(), UserId:''}])

    let navigate = useNavigate();

     
     let params = useParams()

    useEffect(()=>{
        axios.get(`http://127.0.0.1:6060/view-task/${params.id}`).then((response)=>{
            const data = response.data;
            console.log(data[0].Date);
            data[0].Date = data[0].Date.slice(0,10)
            console.log(data[0].Date);
            setAppointments(response.data);
            // console.log("response")
            console.log(response.data);
        })
    },[])


    const formik = useFormik({
        initialValues:{
            Appointment_Id:appointments[0].Appointment_Id,
            Title:appointments[0].Title,
            Description:appointments[0].Description,
            Date:appointments[0].Date,
            UserId:appointments[0].UserId

        },
        onSubmit:(udateTask) =>{
            axios.put(`http://127.0.0.1:6060/edit-task/${params.id}`,udateTask ).then(()=>{
                 
                navigate('/dashboard')
                
            });
        },
        enableReinitialize:true
        
    })


    return(
        <div className="d-flex justify-content-center align-content-center">
            
            <form onSubmit={formik.handleSubmit} className="border border-2 border-dark rounded bg-light m-3 p-3 w-25">
            <div className="text-danger h4">
                  {cookies['userid']} - Edit Task
            </div>
                <dl>
                    <dt>Appointment_Id</dt>
                    <dd><input type="number" onChange={formik.handleChange} value={formik.values.Appointment_Id}  name="Appointment_Id"   className="form-control"/></dd>
                    <dt>Title</dt>
                    <dd><input type="text" onChange={formik.handleChange}  value={formik.values.Title} name="Title" className="form-control" /></dd>
                    <dt>Description</dt>
                    <dd><input type="text" onChange={formik.handleChange} value={formik.values.Description}  className="form-control" name="Description" /></dd>
                    <dt>Date</dt>
                    <input type="date" onChange={formik.handleChange} value= {formik.values.Date} className="form-control"  name="Date"/>
                    <dd></dd>
                </dl>
                <button type="sumbit" className="btn btn-warning">Save</button>
                <Link to="/dashboard" className="ms-3">Cancel</Link>
            </form>

        </div>
    )
}