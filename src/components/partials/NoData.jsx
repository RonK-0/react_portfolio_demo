import React from 'react'
import IconNoData from './svg/IconNoData'


const NoData = () => {
  return (
    <div className="flex justify-center items-center flex-col p-2">
        <span className="text-7xl text-gray-400">
          <IconNoData/>
        </span>
        <span className="font-bold text-content/60 text-base">No Data Found</span>
    </div>
  )
}

export default NoData