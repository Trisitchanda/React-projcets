import React from 'react'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function Route() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Route
