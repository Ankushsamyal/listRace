import React from 'react'
import './style.css'
import BlogCards from './BlogCards'

function Blogpage() {
  return (
    <div className='Blog-main-box'>
      <div className="Blog-lable">
        <h2 className='Blog-header'>
          news and articles</h2>
        <div className="Blog-subheader">Always upto date with our latest News and Articles</div>
      </div>
      <BlogCards/>
    </div>
  )
}

export default Blogpage