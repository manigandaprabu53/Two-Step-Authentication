import React, { useState } from 'react'
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import api from '../Service/ApiService'
import ApiRoutes from '../Utils/ApiRoutes';
import useLogout from '../../src/Hooks/UseLogout'
import TopBar from './TopBar';

function Home() {

  let [text, setText] = useState('');
  let [title, setTitle] = useState('');

  let logout = useLogout();
  let [initiate, setInitiate] = useState({
    longUrl: ''
  })

  const urlSchema = yup.object().shape({
      longUrl: yup.string().required('Required')
  });

  const handleUrl = async(values)=>{
    try {
        let response = await api.post(ApiRoutes.ShortenUrl.path, values, {authenticate: ApiRoutes.ShortenUrl.authenticate})
        let d = document.getElementById('append');
        d.style.padding = '20px';
        setTitle("Below Is The Short URL")
        setText(response.ShortURL)
        toast.success(response.message)
    } catch (error) {
      toast.error(error.response.data.message) || "Error Occured! Please Try Again"
      if(error.response.status === 401)
          logout()
    }
  }

  let formik = useFormik({
      initialValues: initiate,
      enableReinitialize: true,
      validationSchema: urlSchema,
      onSubmit: (values) =>{
          handleUrl(values);
      }
  })

  return <>
    <TopBar/>
    <div className="reset-container">
      <h1>URL Shortner</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="url">Enter URL: </label>&nbsp; &nbsp;
          <input type="text" id='longUrl' name='longUrl'value={formik.values.longUrl} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.touched.longUrl && formik.errors.longUrl ? (<div style={{color: "red"}}>{formik.errors.longUrl}</div>) : null}
        </div>

        <button type='submit'>Generate URL</button>
        <br/>
      </form>
      <div id='append'>
        <h4>{title}</h4>
        <p><a href={text} target='_blank'>{text}</a></p>
      </div>
    </div>
  </>
}

export default Home