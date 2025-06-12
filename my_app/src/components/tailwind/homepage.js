import NavBar from "./navBar";
import { checkoutDoc, fetchData } from "../../redux/asyncActions";
import "./css/homepage.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [cartGlow, setCartGlow] = useState(false);
  const dispatch = useDispatch();
  
  const items = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const numOfItems = useSelector((state) => state.basket.itemsInBasket);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // Track last scroll position using useRef
  const lastScrollTopRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsNavVisible(scrollTop <= lastScrollTopRef.current);
      lastScrollTopRef.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCartClick = useCallback(() => {
    setCartGlow(true);
    setTimeout(() => setCartGlow(false), 3000);
  }, []);

  const handleAddToCart = useCallback(
    (item) => {
      if (!item) return;
      dispatch(checkoutDoc(item));
      handleCartClick();
    },
    [dispatch, handleCartClick]
  );

  // Cart icon styling
  const cartIconClasses = `h-6 w-6 transition-all duration-300 ${
    cartGlow ? "text-yellow-500 animate-pulse" : numOfItems > 0 ? "text-rose-500" : "text-rose-600"
  }`;

  if (loading) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <>
      {/* Navbar */}
      <div className={`nav-bar ${isNavVisible ? "visible" : "hidden"} fixed top-0 left-0 right-0 w-full z-50`}>
        <NavBar cartGlow={cartGlow} onCartClick={handleCartClick} />
      </div>

      <div className="min-h-screen bg-rose-50">
        <main className="container mx-auto px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mainContainer">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <h1 className="text-7xl font-light text-black">
                Beauty <span className="text-pink font-roboto">Res</span>tore
              </h1>
              <div className="w-20 h-0.5 bg-black"></div>
              <p className="text-gray-800 max-w-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
                Cras venenatis euismod malesuada. Maecenas tristique finibus augue. Phasellus eget enim erat. Vestibulum
                euismod convallis felis, vel convallis erat. Cras faucibus elit sit amet velit varius, ac sagittis est
                facilisis. Etiam non purus faucibus, ornare augue eget, lacinia lorem. Donec malesuada, nibh et vehicula
                fringilla, ligula urna sagittis libero, eget luctus elit magna in turpis.
              </p>
            </div>

            {/* Right Column - Card Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 flex">
              {items.map((item) => (
                <div
                  className="aspect-[3/4] bg-white rounded-2xl transform hover:scale-105 transition-transform duration-300 flex flex-col justify-center items-center"
                  key={item.id}
                >
                  <img src={item.img} alt={item.text} className="rounded-3xl mb-2 p-1 px-2 pt-2" />
                  <p className="text-lg font-semibold my-1">{item.text}</p>
                  <div className="flex justify-between lg:gap-5 gap-5 mb-2">
                    <div>
                      <button className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded-full mt-2 flex justify-end items-end">
                        <i className="fa-solid fa-info"></i>
                      </button>
                      <p className="">Info</p>
                    </div>
                    <div className="lg:ml-4">
                    <button
  onClick={() => {
    handleAddToCart(item);
  }}
  className={`
    bg-rose-500 hover:bg-rose-600 
    text-white p-2 rounded-full
    transition-all duration-200
    flex items-center justify-center
    ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
  `}
  disabled={loading}
>
  {loading ? (
    <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent" />
  ) : (
    <i className="fa-solid fa-cart-shopping text-sm" />
  )}
</button>
                      <p className="">Add to cart</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
