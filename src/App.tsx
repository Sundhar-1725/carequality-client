import { Route, Routes } from 'react-router-dom'
import './App.css'
import Sidebar from './sidebar/sidebar'
import allRoutes from './Routes/allroutes'

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
    </>
  )
}

export default App
