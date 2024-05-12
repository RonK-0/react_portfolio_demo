import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { setError, setSuccess } from '../../store/StoreAction';
import { StoreContext } from '../../store/StoreContext';

const Toast = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const handleClose = () => {
    setTimeout(()=>{
      dispatch(setSuccess(false))
    },1000)
  }
 
  handleClose()
  return (
    <div className={`fixed top-3 left-1/2 -translate-x-1/2 p-1 px-3 bg-secondary rounded-md border ${store.error ? "border-green-500" : "border-green-500"}`}>
        <div className='flex gap-2 items-center'>
          <FaCheckCircle className={`${store.error ? "text-green-500" : "text-green-500"}`}/> 
          <p className='mb-0 text-xs'>{store.message}</p>
        </div>
    </div>
  )
}

export default Toast