import axios from "axios"
import moment from "moment";
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom"

export function Dashboard(){

    const[appoinments, setAppointments] = useState([{Appointment_Id:0, Title:'', Description:'', Date:new Date(), UserId:'', UserName:''}]);

    const[item,setItem]=useState('')

    const[cookies,setCookie, removeCookie] =useCookies('userid')
    let navigate = useNavigate()

    function HandleSignout(){
        removeCookie('userid')
        navigate('/login')
    }

     useEffect(()=>{
        if(cookies['userid']==undefined){
            navigate('/login');
        }else{
            axios.get(`http://127.0.0.1:6060/view-tasks/${cookies['userid']}`)
            .then(response=>{
                console.log(response.data);
                setAppointments(response.data);
            })
        }
     },[])

     function handleDeleteChange(){
        axios.delete(`http://127.0.0.1:6060/delete-task/`).then(response=>{
            console.log(response)
        })
        
     }

    return(
        <div className="bg-light p-3 m-3">
            <h3 className="text-dark f-1 d-flex justify-content-between"> <span>{cookies[ 'userid' ]} User Dashboard - Your Appointments</span>  <button onClick={HandleSignout} className="btn btn-dark">Sign Out</button> </h3>
            

            <Link to="/add-task" className="btn btn-primary mb-3">Add Appoinment</Link>

             {
                appoinments.map(appoinment=>
                    <div className="alert alert-success alert-dismissible">
                        <button className="btn btn-close" data-bs-dismiss="alert"></button>
                        <h2>{appoinment.Title}</h2>
                        <p>{appoinment.Description}</p>
                        <p>{moment(appoinment.Date).format('dddd MMMM Do YYYY, hh:mm:ss a')}</p>
                        <Link to={`/edit-task/${appoinment.Appointment_Id} `} className="btn btn-warning bi bi-pen-fill">Edit</Link>
                        <Link to={`/delete-task/${appoinment.Appointment_Id}`} className="btn btn-danger bi bi-trash ms-3">Delete</Link>
                        
                    </div>
                )
            } 

        </div>
    )
}