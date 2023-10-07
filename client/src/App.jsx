import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { SingIn } from './pages/SingIn'
import { SingUp } from './pages/SingUp'
import { Profile } from './pages/Profile'
import { About } from './pages/About'
import { Header } from './components/Header'

export const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SingIn />} />
        <Route path='/sign-up' element={<SingUp />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
