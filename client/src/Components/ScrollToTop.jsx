import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Her sayfa değişiminde scroll'u en başa al
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Görüntülemediğimiz bir bileşen olduğu için null döndürürüz
}

export default ScrollToTop;
