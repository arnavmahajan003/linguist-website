import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Kids from './pages/Kids';
import Adults from './pages/Adults';
import About from './pages/About';
import Teachers from './pages/Teachers';
import Contacts from './pages/Contacts';
import Privacy from './pages/Privacy';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || undefined}>
      <ScrollToTop />
      <a className="skip-link" href="#main">Перейти к содержанию</a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kursy" element={<Courses />} />
          <Route path="/detyam" element={<Kids />} />
          <Route path="/vzroslym" element={<Adults />} />
          <Route path="/o-tsentre" element={<About />} />
          <Route path="/prepodavateli" element={<Teachers />} />
          <Route path="/kontakty" element={<Contacts />} />
          <Route path="/konfidentsialnost" element={<Privacy />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
