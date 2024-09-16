import React, { useState } from 'react'
import * as yup from 'yup';
import api from '../Service/ApiService'
import ApiRoutes from '../Utils/ApiRoutes';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

function Login() {

    let navigate = useNavigate();

    let [initiate, setInitiate] = useState({
        email: '',
        password: ''
    })

    const userSchema = yup.object().shape({
        email: yup.string().required('Required'),
        password: yup.string().required('Required')
    });

    const handleLogin = async(values)=>{
        try {
            let response = await api.post(ApiRoutes.LoginUser.path, values, {authenticate: ApiRoutes.LoginUser.authenticate});
            toast.success(response.message);
            sessionStorage.setItem('token', response.token)
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
            handleLogin(values);
        }
    })

  return <div className='cover'>
    <div className="login-container">
        <h1>Login</h1>
        <p className='text-align-center'>Don't have an account? <Link to='/signUp' className='url'>SignUp</Link></p>
        <form className='login-form' onSubmit={formik.handleSubmit}>
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
            <p className='text-align-center'>Forgot Password? Click <Link to='/forgotPassword' className='url'>Here</Link></p>
            <button type='submit'>Submit</button>
        </form>
    </div>
  </div>
}

export default Login