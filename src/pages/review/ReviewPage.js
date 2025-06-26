import React from 'react'
import './style.css'
import ReviewCard from './ReviewCard'
import ReviewNumber from './ReviewNumber'
import { REVIEW_CONSTANT } from '../../constant/HeadingConstant'

function Review() {
  return (
    <div>
     <div className='Review-Main-Box'>
      <div className="Review-lablReview-Main-Box">
        <h2 className='Review-header'>{REVIEW_CONSTANT.MAIN_TITLE}</h2>
        <div className="htw-subheader">{REVIEW_CONSTANT.SECONDARY_TITLE}</div>
      </div>
      <ReviewCard/>
    </div>
      <ReviewNumber/>
    </div>
  )
}

export default Review