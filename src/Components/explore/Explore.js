import React from 'react'
import './style.css'
import ExploreCards from './ExploreCards'

function Explore() {
  return (
    <div className='E-Main-Box'>
       <div className="e-lable">
        <h2 className='e-header'>
        explore</h2>
          <div className="htw-subheader">Explore New place, food, culture around the world and many more</div>
      </div>
      <ExploreCards/> 
      </div>
  )
}

export default Explore