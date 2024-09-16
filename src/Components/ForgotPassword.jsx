import React, { useState } from 'react'
import * as yup from 'yup';
import api from '../Service/ApiService'
import ApiRoutes from '../Utils/ApiRoutes';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

function ForgotPassword() {

  const navigate = useNavigate();

  let [initiate, setInitiate] = useState({
    email: ''
})

  const userSchema = yup.object().shape({
      email: yup.string().required('Required')
  });

  const handleemail = async(values)=>{
    try {
      let response = await api.post(ApiRoutes.ForgotPassword.path, values, {authenticate: ApiRoutes.ForgotPassword.authenticate});
      toast.success(response.message);
      console.log(response)
      navigate('/login')
    } catch (error) {
        toast.error(error.response.data.message) || "Error Occured! Please Try Again"
    }
  }

  let formik = useFormik({
      initialValues: initiate,
      enableReinitialize: true,
      validationSchema: userSchema,
      onSubmit: (values) =>{
          handleemail(values);
      }
  })

  return <div className='cover'>
    <div className="login-container">
        <h1>Forgot Password</h1>
        <form className='login-form' onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email: </label>
                <input type="email" id='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.email && formik.errors.email ? (<div style={{color: "red"}}>{formik.errors.email}</div>) : null}
            </div>

            <button type='submit'>Submit</button>
        </form>
    </div>
  </div>
}

export default ForgotPassword