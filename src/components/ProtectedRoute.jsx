import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {

    let token = localStorage.getItem("token")

    if (!token) {
        return <Navigate to="/login" />
    }

    return children
}