import React from 'react'
import './style.css'
import BlogCards from './BlogCards'
import { BLOG_CONSTANT } from '../../constant/HeadingConstant'

function Blogpage() {
  return (
    <div className='Blog-main-box'>
      <div className="Blog-lable">
        <h2 className='Blog-header'>{BLOG_CONSTANT.MAIN_TITLE} </h2>
        <div className="Blog-subheader">{BLOG_CONSTANT.SECONDARY_TITLE}</div>
      </div>
      <BlogCards/>
    </div>
  )
}

export default Blogpage