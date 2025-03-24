import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './navbar/nabar';
import Home from './Components/home/Home';
import Contact from './Components/contact/Contact';
import Blogpage from './Components/blog/Blog';
import Explore from './Components/explore/Explore';
import Review from './Components/review/Review';
import Howitworks from './Components/how-it-works/Page';
import HomePageChatBot from './Components/ChatBot/HomePageChatBot';
import HomePageAI from './Components/ChatBot/HomePageAI';

function NavigationWrapper({footerNav , children}){
  return (
    <>
    <Navbar/>
    {children}
    {/* {footerNav &&  */}
    <Navbar footerNav={true}/>
     {/* } */}
    </>
)}
function App() { 

  const router = createBrowserRouter([
    {
      path:'/',
      element:(<NavigationWrapper><Home/></NavigationWrapper>)
    },
    {
      path:'/how-it-works',
      element:(<NavigationWrapper><Howitworks/></NavigationWrapper>)
    },
    {
      path:'/explore',
      element:(<NavigationWrapper><Explore/></NavigationWrapper>)
    },
    {
      path:'/review',
      element:(<NavigationWrapper><Review/></NavigationWrapper>)
    },
    {
      path:'/blog',
      element:(<NavigationWrapper><Blogpage/></NavigationWrapper>)
    },
    {
      path:'/contact',
      element:(<NavigationWrapper><Contact/></NavigationWrapper>)
    },
    {
      path:'/ChatBot',
      element:(<NavigationWrapper><HomePageChatBot/></NavigationWrapper>)
    }, 
    {
      path:'/AI',
      element:(<NavigationWrapper><HomePageAI/></NavigationWrapper>)
    }
  ])
  return (

    <div >
     <RouterProvider router={router}/>
     
    </div>
  );
}

export default App;
