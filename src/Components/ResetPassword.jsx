import axios from 'axios';
import React, { useState } from 'react'
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';

function ResetPassword() {

  const navigate = useNavigate();

  let [initiate, setInitiate] = useState({
    password: ''
})

  const userSchema = yup.object().shape({
    password: yup.string().required('Required')
  });
  let {token} = useParams();
  const handlepassword = async(values)=>{
    try {
      console.log(values)
      let response = await axios.post(`http://localhost:8000/users/resetPassword/${token}`, values);
      toast.success(response.data.message);
      console.log(response)
      navigate('/login')
    } catch (error) {
        console.log(error.message)
        toast.error(error.response.data.message) || "Error Occured! Please Try Again"
    }
  }

  let formik = useFormik({
      initialValues: initiate,
      enableReinitialize: true,
      validationSchema: userSchema,
      onSubmit: (values) =>{
        handlepassword(values);
      }
  })

  return <div className='cover'>
    <div className="login-container">
        <h1>Reset Password</h1>
        <form className='login-form' onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor="password">Enter New Password: </label>
                <input type="text" id='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.password && formik.errors.password ? (<div style={{color: "red"}}>{formik.errors.password}</div>) : null}
            </div>

            <button type='submit'>Submit</button>
        </form>
    </div>
  </div>
}

export default ResetPassword