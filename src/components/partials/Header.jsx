import React from 'react'
import { Link } from 'react-router-dom'
import { CiBellOn } from "react-icons/ci";
import { LiaAngleDownSolid, LiaKeySolid, LiaSignOutAltSolid, LiaUserCircle } from "react-icons/lia";

const Header = ({setShowSideBar, showSideBar}) => {
  const handleSideBarShow = () => setShowSideBar(!showSideBar);
  // const [theme, setTheme] = React.useState(null);
  const handleToggleThemeMode = ()=>{
    if(document.querySelector('body').classList.contains('dark')){
      document.querySelector('body').classList.remove('dark');
    }else{
      document.querySelector('body').classList.add('dark')
    }
  }
  
  return (
    <>
      <header className='header px-4 py-4 border-b border-line flex justify-end'>
        <div className='flex justify-end items-center gap-4 w-fit relative'>
          <button className='text-3xl'><CiBellOn /></button>
            <img src="https://via.placeholder.com/40" alt="" className='rounded-full object-cover object-center size-10' />
          <div>
            <button type="button" className='flex items-center gap-5'>Muh. Bambang <LiaAngleDownSolid/></button>

            <div className="header-dropdown absolute bg-secondary p-4 rounded-md right-0 top-[calc(100%+10px)] text-center shadow-sm hidden">
              <img src="https://via.placeholder.com/40" alt="" className='rounded-full object-cover object-center size-10 mx-a' />
              <h4 className='mb-1'>Muh. Bambang</h4>
              <p className='text-sm w-[150px] truncate'>muh.bambang@muhneh.com</p>
              <ul className='flex center gap-5'>
                <li><Link to={'#'} className='text-2xl'><LiaUserCircle/></Link></li>
                <li><Link to={'#'} className='text-2xl'><LiaKeySolid/></Link></li>
                <li><Link to={'#'} className='text-2xl'><LiaSignOutAltSolid/></Link></li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header