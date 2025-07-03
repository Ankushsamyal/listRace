
import React, { useLayoutEffect } from 'react';
import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom';
import Home from './pages/home/HomePage';
import Signup from './pages/login_signup/signup/SignUp';
import Blogpage from './pages/blog/HomePage';
import Howitworks from './pages/how-it-works/HowItWork';
import Explore from './pages/explore/ExplorePage';
import Review from './pages/review/ReviewPage';
import Contact from './pages/contact/ContactPage';
import { AuthProvider } from './component/AuthProvider';
import ProfilePage from './pages/login_signup/profile Page/ProfilePages';
import Login from './pages/login_signup/login/LogInPage';
import { CssBaseline } from '@mui/material';
import Navbar from './pages/navbar/nabar'
import HomePageChatBot from './chatBot/HomePageChatBot';

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
      { path: '/chatbot', element: <NavigationWrapper><HomePageChatBot /></NavigationWrapper> },
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
        <RouterProvider router={router} future={{ v7_startTransition: true }}/>
      </AuthProvider>
    </div>
  );
}

export default App;
