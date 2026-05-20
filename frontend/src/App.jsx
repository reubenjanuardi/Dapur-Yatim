import { BrowserRouter } from 'react-router-dom'
import Router from './router.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-surface">
        <Navbar />
        <main className="flex-1">
          <Router />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
