import { RxDashboard } from "react-icons/rx"; 
import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineCalendar, HiOutlineDocument  } from "react-icons/hi";
import { CiSettings } from "react-icons/ci";
import { LiaSignalSolid } from "react-icons/lia";
// import Logo from "./svg/Logo";
import Star from "./svg/Star";
import { FaUser } from "react-icons/fa";

const Navigation = () => {
  return (
    <aside className='px-4 py-6 w-[250px] h-screen border-r-2 border-line fixed top-0 left-0'>
        <div className="flex items-center gap-4">
          {/* <Logo/> */}
          <Star/>
          <h2 className="mb-0 mt-0.5">Purtfulioe</h2>
        </div>

        <ul className='nav'>
            <li className='nav-link active'><Link to={'/portfolio'}><RxDashboard /> Portfolio</Link></li>
            <li className='nav-link'><Link to={'/users'}><FaUser /> Users</Link></li>
            <li className='nav-link'><Link to={'#'}><HiOutlineCalendar /> Calendar</Link></li>
            <li className='nav-link'><Link to={'#'}><HiOutlineDocument /> Database</Link></li>
            <li className='nav-link'><Link to={'#'}><LiaSignalSolid /> Attendance</Link></li>
            <li className='nav-link'><Link to={'#'}><CiSettings /> Settings</Link></li>
        </ul>
    </aside>
  )
}

export default Navigation