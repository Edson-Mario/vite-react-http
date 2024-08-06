import {Link} from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='max-sm:justify-end bg-slate-100 border px-14 shadow-sm flex justify-between py-4'>
        <Link to="/" className='max-sm:hidden text-gray-800 text-2xl font-bold'>React Router</Link>
        <ul className='flex gap-6'>
            <li><Link to="/" className='text-gray-800'>Home</Link></li>
            <li><Link to="/register" className='text-gray-800'>Register</Link></li>
            <li><Link to="/post" className='text-gray-800'>Post</Link></li>
        </ul>
    </nav>
  )
}

export default NavBar
