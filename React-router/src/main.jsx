import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Route from './Route.jsx'
import Home from './components/Home/Home'
import About from './components/About/About'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Route/>,
    children:[{
      path: "",
      element: <Home/>,
    },{
      path: "about",
      element: <About/>
    }]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
