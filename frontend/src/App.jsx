import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import {ToastContainer} from "react-toastify"
import VerifyOtp from './pages/VerifyOtp'
import { AppData } from './context/AppContext'
import Loading from './Loading'
import Register from './pages/Register'
import Verify from './pages/Verify'
import Dashboard from './pages/Dashboard'

function App() {
  const {isAuth, loading} = AppData();

  return (
    <>
      { loading ? (<Loading/>) : (<BrowserRouter>
        <Routes>
          <Route path='/' element={isAuth ? <Home /> : <Login />}></Route>
          <Route path='/login' element={isAuth ? <Home /> : <Login />}></Route>
          <Route path='/verifyotp' element={isAuth ? <Home /> : <VerifyOtp />}></Route>
          <Route path='/register' element={isAuth ? <Home /> : <Register />}></Route>
          <Route path='/token/:token' element={isAuth ? <Home /> : <Verify />}></Route>
          <Route path='/dashboard' element={isAuth ? <Dashboard/> : <Login />}></Route>

        </Routes>
        <ToastContainer />
      </BrowserRouter>)
      }
    </>
  )
}

export default App
