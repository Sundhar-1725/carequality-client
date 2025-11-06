import { Route, Routes } from 'react-router-dom'
import './App.css'
import Sidebar from './sidebar/sidebar'
import allRoutes from './Routes/allroutes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <>
      <Sidebar>
        <Routes>
          {
            allRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))
          }
        </Routes>
      </Sidebar>
      <ToastContainer theme='dark' autoClose={1000}/>
    </>
  )
}

export default App
