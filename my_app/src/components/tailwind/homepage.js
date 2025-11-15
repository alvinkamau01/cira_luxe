import NavBar from "./navBar";
import { checkoutDoc, fetchData } from "../../redux/asyncActions";
import "./css/homepage.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Heart, ShoppingCart, Info, Star } from "lucide-react";
import { toast } from 'react-toastify';

export default function Home() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [cartGlow, setCartGlow] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());
  const dispatch = useDispatch();
  
  const items = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const numOfItems = useSelector((state) => state.basket.totalItems);
  const cartItems = useSelector((state) => state.basket.itemsInBasket);

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

      // Check if item already exists in cart
      const itemName = item.name || item.text || '';
      const existingItem = cartItems.find(cartItem => cartItem.name === itemName);

      dispatch(checkoutDoc(item));
      handleCartClick();

      if (existingItem) {
        toast.success("Quantity increased in cart");
      } else {
        toast.success("Added to Cart");
      }
    },
    [dispatch, handleCartClick, cartItems]
  );

  const handleWishlistToggle = useCallback((itemId) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(itemId)) {
        newWishlist.delete(itemId);
      } else {
        newWishlist.add(itemId);
      }
      return newWishlist;
    });
  }, []);

  const handleInfoClick = useCallback((item) => {
    // For now, just show an alert. In a real app, this would open a modal or navigate to detail page
    alert(`Info for ${item.text}: This is a beautiful product from our collection.`);
  }, []);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card
                  key={item.id}
                  className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border-0 shadow-lg"
                >
                  <CardHeader className="p-0">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.text}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-white hover:bg-white transition-colors ${
                          wishlist.has(item.id) ? 'text-red-500' : 'text-gray-600'
                        }`}
                        onClick={() => handleWishlistToggle(item.id)}
                      >
                        <Heart className={`h-4 w-4 ${wishlist.has(item.id) ? 'fill-current' : ''}`} />
                      </Button>
                      <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                        New
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {item.text}
                    </CardTitle>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">(4.8)</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      Premium quality beauty product designed for your skin type.
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 hover:bg-gray-50"
                      onClick={() => handleInfoClick(item)}
                    >
                      <Info className="h-4 w-4 mr-1" />
                      Info
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-rose-500 hover:bg-rose-600 text-white"
                      onClick={() => handleAddToCart(item)}
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent" />
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
