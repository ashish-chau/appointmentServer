import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { Link, useNavigate, useParams } from "react-router-dom"

export function DeteteTask(){

    let navigate = useNavigate()

    const[cookies, setCookie, removeCookie] = useCookies('userid')

    

    const[appointments,setApppointmets ] =useState([{Appointment_Id:0, Title:'', Description:'', Date:new Date(), UserId:'', UserName:''}]);
    let params = useParams();
    console.log(params)

    useEffect(()=>{
        if(cookies['userid']===undefined){
            navigate('/login')
        }else{
            axios.get(`http://127.0.0.1:6060/view-task/${params.id}`).then((response)=>{
                setApppointmets(response.data);
                console.log(response.data)
            })
        }
       
    },[])


    function deleteTask(){
        axios.delete(`http://127.0.0.1:6060/delete-task/${params.id}`).then(()=>{
            
        navigate('/dashboard')
        })
    }


   





    return(
        <div className="bg-light text-dark p-3">
            <h3>Detele Task</h3>
            <dl>
                <dt>Title</dt>
                <dd>{appointments[0].Title}</dd>
                <dt>Description</dt>
                <dd>{appointments[0].Description}</dd>
                <dt>Date</dt>
                <dd>{moment(appointments[0].Date).format('dddd MMMM Do, YYYY')}</dd> 
            </dl>
            <button onClick={deleteTask}  className="btn btn-danger">Yes</button>
            <Link to="/dashboard" className="ms-3 btn btn-warning">No</Link>
        </div>
    )
}