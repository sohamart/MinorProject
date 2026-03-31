import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Loading from '../../components/loading/loading'
import { AuthContextData } from '../../context/AuthContext'

const Student = () => {
  const navigate = useNavigate()
  const { loggedinStudent, loading } = useContext(AuthContextData)

  useEffect(() => {
    if (!loading && !loggedinStudent) {
      navigate("/login")
    }
  }, [loggedinStudent, loading])

  // ⛔ Wait until auth check complete
  if (loading) return <Loading />

  // ⛔ Stop rendering to avoid flicker
  if (!loggedinStudent) return null

  return (
    <Outlet context={{ loggedinName: loggedinStudent?.name }} />
  )
}

export default Student