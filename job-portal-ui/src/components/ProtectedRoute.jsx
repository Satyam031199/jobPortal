import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const ProtectedRoute = ({children}) => {
    const {user} = UserAuth()
    if(!user){
        toast.error('You need to login first')
        return <Navigate to='/login'/>
    }
  return (
    children
  )
}

export default ProtectedRoute