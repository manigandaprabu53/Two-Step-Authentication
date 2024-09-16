import React, { useState } from 'react'
import TopBar from './TopBar'
import Table from 'react-bootstrap/Table';
import toast from 'react-hot-toast';
import { Button } from 'react-bootstrap';
import ApiRoutes from '../Utils/ApiRoutes';
import api from '../Service/ApiService'
import UseLogout from '../Hooks/UseLogout';
import config from '../Utils/config';

function URLMonth() {

  let logout = UseLogout();

  let [tdata, setTdata] = useState([]);
  let [cal, setCal] = useState();

  const handledata = async()=>{
    try {
        let data = {dat: cal}
        let response = await api.post(ApiRoutes.MonthData.path, data, {authenticate: ApiRoutes.MonthData.authenticate})
        setTdata(response.data)
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
      <h1>Get Data By Month</h1>
      <form>
        <div className="form-group">
          <label htmlFor="cal">Enter Month: </label>
          <input type="month" id='cal' onChange={(e)=>setCal(e.target.value)}/>
          {/* <button className='cal'>Submit</button> */}
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

export default URLMonth