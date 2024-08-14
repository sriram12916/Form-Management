import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginThunkAction } from '../Redux/Thunk/LoginThunk';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import icon from '../assets/icon.jpg'
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const LoginPage = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const navi = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = useSelector(state => state.LoginReducer?.data)
  const auth_Token = login?.data?.jwt
  console.log("lpage", auth_Token)

  const loginToast = useSelector(state => state.LoginReducer)

  console.log("loginToast", loginToast)

  useEffect(() => {
    if (auth_Token) {
      localStorage.setItem('token', auth_Token)
    }
  }, [auth_Token])

  const handleChange = async (e) => {
    e.preventDefault();

    try {
      const api = await dispatch(LoginThunkAction({ userName, password }))


      if (LoginThunkAction.fulfilled.match(api)) {
        const message = api.payload.data.message
        console.log("message", message);
        navi('/manage')
      
        setTimeout(() => {
          toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }, 1000)

      } 
      else if (LoginThunkAction.rejected.match(api)) {
        const rejectMessage = api.payload.error.message
        console.log("rejectMessage", rejectMessage);
        toast.error(rejectMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } 
    }
    catch (error) {
      console.log('error', error)
    }

    const newErrors = {};
    if (!userName) newErrors.name = "User Name is Required!"
    if (!password) newErrors.password = "Password is Required!"
    setErrors(newErrors);
    setUserName('');
    setPassword('')
  }


  return (
    <>
      <div className="root">
        <div class='container-lg '>
          <div className="form_panel">
            <img src={icon} style={{ height: "80px", width: "83px", marginLeft: "39%" }} />
            <h3 className='head'>Login</h3>
            <form className='panel'>
              <label class='class-label'>User Name*</label>
              <br></br>
              <input
                class='form-control'
                type='text'
                name='name'
                value={userName}
                placeholder='User Name'
                onChange={(e) => setUserName(e.target.value)}
              />
              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
              <br></br>
              <label class='class-label'>Password*</label>
              <br></br>
              <div style={{ position: 'relative', }}>
                <input
                  class='form-control'
                  type={showPassword ? 'text' : 'password'}
                  name='paswword'
                  value={password}
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingRight: '6.5rem' }}
                />
                <span onClick={togglePasswordVisibility}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                  }}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

              <div className=""><a href=''> <p className='fp'> Forgot Password?</p></a> </div>
              <button type='submit' onClick={handleChange} class=' btn btn-success' >Submit</button>
              <ToastContainer />
            </form>
            <div className='logo'> &copy;<span >Ebrain Technologies</span></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage




