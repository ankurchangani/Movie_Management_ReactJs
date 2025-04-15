import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import PricingPlans from './pages/PricingPlans';
import NotFound from './pages/404page';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import FaviourteMovie from './pages/FaviourteMovie';

function App() {
  const location = useLocation();
  
  const hideLayout = ['/signin', '/signup'];

  const shouldHideLayout = hideLayout.includes(location.pathname.toLowerCase());

  return (
    <>
      {!shouldHideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricingplans" element={<PricingPlans />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/faviourtemovie" element={<FaviourteMovie />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default App;
