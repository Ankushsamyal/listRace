
import React, { useLayoutEffect } from 'react';
import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom';
import Home from './components/home/HomePage';
import Signup from './Login_Signup/signup/SignUp';
import Blogpage from './components/blog/HomePage';
import Howitworks from './components/how-it-works/HowItWork';
import Explore from './components/explore/ExplorePage';
import Review from './components/review/ReviewPage';
import Contact from './components/contact/ContactPage';
import { AuthProvider } from './commonComponents/AuthProvider';
import ProfilePage from './Login_Signup/profile Page/ProfilePages';
import Navbar from './navbar/nabar';
import Login from './Login_Signup/login/LogInPage';
import { CssBaseline } from '@mui/material';

function ScrollToTop() {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

function NavigationWrapper({ children }) {
  return (
    <>
      <Navbar/>
      <ScrollToTop />
      <CssBaseline/>
      {children}
      <Navbar footerNav={true} />
    </>
  );
}

function App() {
  //  const navigate = useNavigate();
  // const user = localStorage.getItem('userId')
  // if(!user){
      
    
  // }
  const router = createBrowserRouter(
    [
      { path: '/', element: <NavigationWrapper><Home /></NavigationWrapper> },
      { path: '/how-it-works', element: <NavigationWrapper><Howitworks /></NavigationWrapper> },
      { path: '/explore', element: <NavigationWrapper><Explore /></NavigationWrapper> },
      { path: '/review', element: <NavigationWrapper><Review /></NavigationWrapper> },
      { path: '/blog', element: <NavigationWrapper><Blogpage /></NavigationWrapper> },
      { path: '/contact', element: <NavigationWrapper><Contact /></NavigationWrapper> },
      { path: '/login', element: <NavigationWrapper><Login /></NavigationWrapper> },
      { path: '/signup', element: <NavigationWrapper><Signup /></NavigationWrapper> },
      { path: '/profile', element: <NavigationWrapper><ProfilePage /></NavigationWrapper> },
    ],
    {
      future: {
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      },
    }
  );
  

  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
