import React, { useState } from 'react'
import TopBar from './TopBar'
import Table from 'react-bootstrap/Table';
import toast from 'react-hot-toast';
import { Button } from 'react-bootstrap';
import ApiRoutes from '../Utils/ApiRoutes';
import api from '../Service/ApiService'
import UseLogout from '../Hooks/UseLogout';
import config from '../Utils/config';

function URLDate() {

    let logout = UseLogout();
    let [tdata, setTdata] = useState([]);
    let [cal, setCal] = useState();

    const handledata = async()=>{
        try {
            let data = {day: cal}
            let response = await api.post(ApiRoutes.DayData.path, data, {authenticate: ApiRoutes.DayData.authenticate})
            setTdata(response.data);
            if(response.data.length>0){
              toast.success("Data Found");
            }else{
              toast.error("Data Not Available")
            }
        } catch (error) {
            toast.error(error.response.data.message) || "Error Occured! Please Try Again"
            if(error.response.status === 401)
                logout();
        }
    }

  return <>
    <TopBar/>
    <div className="cal-wrapper">
      <h1>Get Data By Day</h1>
      <form>
        <div className="form-group">
          <label htmlFor="cal">Select Date: </label>
          <input type="date" id='cal' onChange={(e)=>setCal(e.target.value)}/>
          <Button variant='success' onClick={()=>handledata()}>Submit</Button>
        </div>
      </form>
    </div>
    <div className='table-wrapper'>
      <Table striped bordered hover fixed>
        <thead>
          <tr>
            <th>Long URL</th>
            <th>Short URl</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {
            tdata.map((e)=>{
              return <tr key={e.id}>
                <td>{e.longUrl}</td>
                <td>{`${config.BASE_URL}redirect/${e.shortUrl}`}</td>
                <td>{e.clicks}</td>
              </tr>
            })
          } 
        </tbody>
      </Table>
    </div>
  </>
}

export default URLDate