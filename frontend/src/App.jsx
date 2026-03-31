import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Student from './pages/student/student'
import HomeStudent from './pages/student/HomeStudent'
import Login from './pages/login/Login'
import HomeTeacher from './pages/Teacher/HomeTeacher'
import Teacher from './pages/Teacher/Teacher'
import HomeAdmin from './pages/Admin/HomeAdmin'
import Admin from './pages/Admin/Admin'
import Home from './pages/home/Home'

const App = () => {
  return (
    <div className='h-screen w-screen flex flex-col items-center bg-amber-50'>
    

    <Routes>
      {/* login */}
      <Route path='/login' element={<Login></Login>}/>
      <Route path='/' element={<Home/>}/>
      
      {/* student route */}
      <Route path="/student" element={<Student/>}>
        <Route path='/student/' element={<HomeStudent/>}/>
      </Route>

      {/* teacher route */}
      <Route path="/teacher" element={<Teacher/>}>
      <Route path='/teacher/' element={<HomeTeacher/>}/>
      </Route>
      <Route path="/admin" element={<Admin/>}>
      <Route path='/admin/' element={<HomeAdmin/>}/>
      </Route>


    </Routes>


    </div>
  )
}

export default App
