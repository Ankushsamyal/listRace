import React from 'react'
import CardPages from './CardPages'
import './style.css'

function Howitworks() {
  return (
    <div className='HIW-Main_box' >
      <div className="HIW-lable">
        <h2 className='htw-header'>
          how it works</h2>
          <div className="htw-subheader">Learn More about how our website works</div>
      <CardPages />
      </div>
    </div>
  )
}

export default Howitworks