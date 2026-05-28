import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAdmin } from '../../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import GoatLogo from '../../components/GoatLogo'

const Login = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const { login } = useAdmin()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login(password)) { navigate('/admin/dashboard') }
    else { setError(true); setTimeout(() => setError(false), 2000) }
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <motion.div className="bg-white rounded-3xl p-10 w-full max-w-sm shadow-2xl text-center"
        initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}>
        <div className="flex justify-center mb-4"><GoatLogo size={80} animate={false} /></div>
        <h1 className="font-heading text-2xl font-bold text-primary mb-1">Admin Panel</h1>
        <p className="text-gray-400 text-sm mb-8">Daxil olmaq üçün şifrəni daxil edin</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="password" placeholder="Şifrə" value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary outline-none text-center text-lg tracking-wider"
            autoFocus />
          {error && <motion.p className="text-red-500 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Şifrə yanlışdır</motion.p>}
          <motion.button type="submit"
            className="w-full bg-primary text-white font-bold py-3.5 rounded-xl text-lg"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Daxil Ol
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default Login
