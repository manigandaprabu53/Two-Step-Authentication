import React, { useState } from 'react'
import * as yup from 'yup';
import api from '../Service/ApiService'
import ApiRoutes from '../Utils/ApiRoutes';
import toast from 'react-hot-toast';
import {Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

function SignUp() {

  let navigate = useNavigate();

    let [initiate, setInitiate] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const userSchema = yup.object().shape({
        firstName: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
        email: yup.string().required('Required'),
        password: yup.string().required('Required')
    });

    const handleSignUp = async(values)=>{
      try {
          let response = await api.post(ApiRoutes.SignUp.path, values, {authenticate: ApiRoutes.SignUp.authenticate});
          toast.success(response.message);
          navigate('/home');
      } catch (error) {
          toast.error(error.response.data.message) || "Error Occured! Please Try Again"
      }
  }

  let formik = useFormik({
      initialValues: initiate,
      enableReinitialize: true,
      validationSchema: userSchema,
      onSubmit: (values) =>{
        handleSignUp(values);
      }
  })

  return <div className='cover'>
    <div className="login-container">
        <h1>Sign Up</h1>
        <p className='text-align-center'>Already have an account? <Link to='/login' className='url'>Login</Link></p>
        <form className='login-form' onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor="firstName">First Name: </label>
                <input type="text" id='firstName' name='firstName' value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.firstName && formik.errors.firstName ? (<div style={{color: "red"}}>{formik.errors.firstName}</div>) : null}
            </div>

            <div className="form-group">
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" id='lastName' name='lastName' value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.lastName && formik.errors.lastName ? (<div style={{color: "red"}}>{formik.errors.lastName}</div>) : null}
            </div>

            <div className="form-group">
                <label htmlFor="email">Email: </label>
                <input type="email" id='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.email && formik.errors.email ? (<div style={{color: "red"}}>{formik.errors.email}</div>) : null}
            </div>

            <div className="form-group">
                <label htmlFor="password">Password: </label>
                <input type="password" id='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.password && formik.errors.password ? (<div style={{color: "red"}}>{formik.errors.password}</div>) : null}
            </div>
            <button type='submit'>Submit</button>
        </form>
    </div>
  </div>
}

export default SignUp