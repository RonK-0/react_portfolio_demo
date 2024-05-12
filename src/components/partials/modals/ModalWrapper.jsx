import React from 'react'

const ModalWrapper = ({children, position}) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-screen flex items-center z-30 ${position === "center" ? "justify-center" : "justify-end"}`}>
        <div className="backdrop absolute top-0 left-0 w-full h-full bg-black/90 -z-10"></div>
        {children}
    </div>
  )
}

export default ModalWrapper