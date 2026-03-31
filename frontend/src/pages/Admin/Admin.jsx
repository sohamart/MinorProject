import React from 'react'
import { Outlet } from 'react-router'
import { useContext } from 'react'
import Loading from '../../components/loading/loading'

import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { AuthContextData } from '../../context/AuthContext'



const Admin = () => {
 const navigate = useNavigate()
  const { loggedinAdmin, loading } = useContext(AuthContextData)

  useEffect(() => {
    if (!loading && !loggedinAdmin) {
      navigate("/login")
    }
  }, [loggedinAdmin, loading])

  // ⛔ Wait until auth check complete
  if (loading) return <Loading />

  // ⛔ Stop rendering to avoid flicker
  if (!loggedinAdmin) return null

  return (
    <Outlet context={{ loggedinName: loggedinAdmin?.name }} />
  )
}

export default Admin
