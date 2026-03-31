import React from 'react'
import { Outlet } from 'react-router'
import { useContext } from 'react'

import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { AuthContextData } from '../../context/AuthContext'
import Loading from '../../components/loading/loading'

const Teacher = () => {
  const navigate = useNavigate()
  const { loggedinTeacher, loading } = useContext(AuthContextData)

  useEffect(() => {
    if (!loading && !loggedinTeacher) {
      navigate("/login")
    }
  }, [loggedinTeacher, loading])

  // ⛔ Wait until auth check complete
  if (loading) return <Loading />

  // ⛔ Stop rendering to avoid flicker
  if (!loggedinTeacher) return null

  return (
    <Outlet context={{ loggedinName: loggedinTeacher?.name }} />
  )
}

export default Teacher

