import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './navbar/nabar';
// import './App.css'
import Home from './Components/home/Home';
import Contact from './Components/contact/Contact';
import Blogpage from './Components/blog/Blog';
import Explore from './Components/explore/Explore';
import Review from './Components/review/Review';
import Howitworks from './Components/how-it-works/Page';


function App() { 

  const router = createBrowserRouter([
    {
      path:'/',
      element:(<> <Navbar/> <Home/> <Navbar footerNav={true}/></>)
    },
    {
      path:'/how-it-works',
      element:(<> <Navbar/> <Howitworks/> <Navbar footerNav={true}/></>)
    },
    {
      path:'/explore',
      element:(<> <Navbar/> <Explore/> <Navbar footerNav={true}/></>)
    },
    {
      path:'/review',
      element:(<> <Navbar/> <Review/> <Navbar footerNav={true}/></>)
    },
    {
      path:'/blog',
      element:(<> <Navbar/> <Blogpage/> <Navbar footerNav={true}/></>)
    },
    {
      path:'/contact',
      element:(<> <Navbar/> <Contact/> <Navbar footerNav={true}/></>)
    }
  ])
  return (

    <div >
     <RouterProvider router={router}></RouterProvider>
     
    </div>
  );
}

export default App;
