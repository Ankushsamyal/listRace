import React from 'react'
import './style.css'
import ReviewCard from './ReviewCard'
import ReviewNumber from './ReviewNumber'

function Review() {
  return (
    <div>
     <div className='Review-Main-Box'>
      <div className="Review-lablReview-Main-Box">
        <h2 className='Review-header'>
          clients reviews</h2>
        <div className="htw-subheader">What our client say about us</div>
      </div>
      <ReviewCard/>
    </div>
      <ReviewNumber/>
    </div>
  )
}

export default Review