import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Star, Heart, User, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import './App.css';

// Import images
import rattanFurniture1 from './assets/rattan_furniture_1.jpg';
import rattanFurniture2 from './assets/rattan_furniture_2.jpg';
import rattanFurniture3 from './assets/rattan_furniture_3.jpg';

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary">
              Andra's Garden Heaven
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-primary transition-colors">Shop</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">About</Link>
            <Link to="/blog" className="text-gray-700 hover:text-primary transition-colors">Blog</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">Contact</Link>
          </nav>

          {/* Search and Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="pl-10 w-64"
              />
            </div>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {cartItems}
                </Badge>
              )}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-primary">Home</Link>
              <Link to="/shop" className="block px-3 py-2 text-gray-700 hover:text-primary">Shop</Link>
              <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-primary">About</Link>
              <Link to="/blog" className="block px-3 py-2 text-gray-700 hover:text-primary">Blog</Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-primary">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-blue-50">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(28, 66, 25, 0.4), rgba(28, 66, 25, 0.4)), url(${rattanFurniture1})`,
        }}
      />
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Handcrafted Rattan Furniture
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Transform your space into a garden paradise with our exquisite collection of handmade rattan furniture
        </p>
        <div className="space-x-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
            Shop Collection
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-3">
            Learn Our Story
          </Button>
        </div>
      </div>
    </section>
  );
};

// Featured Products Component
const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Garden Paradise Set",
      price: "£899",
      originalPrice: "£1,199",
      image: rattanFurniture1,
      rating: 5,
      reviews: 24,
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Cozy Conversation Set",
      price: "£649",
      originalPrice: "£799",
      image: rattanFurniture2,
      rating: 4.8,
      reviews: 18,
      badge: "New Arrival"
    },
    {
      id: 3,
      name: "Elegant Dining Collection",
      price: "£1,299",
      originalPrice: "£1,599",
      image: rattanFurniture3,
      rating: 4.9,
      reviews: 32,
      badge: "Premium"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most popular handcrafted rattan furniture pieces, loved by customers across Glasgow and beyond
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-white">
                    {product.badge}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Brand Story Component
const BrandStory = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6">
              Welcome to Andra's Garden Heaven, where the timeless beauty of nature meets the artistry of handmade craftsmanship. 
              Based in Glasgow, we specialize in creating exquisite rattan furniture that transforms any space into a serene sanctuary.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Each piece is meticulously crafted by skilled artisans who pour their expertise and dedication into every weave and curve. 
              We believe that affordability should never compromise quality, bringing you the finest rattan furniture at accessible prices.
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              Learn More About Us
            </Button>
          </div>
          <div className="relative">
            <img 
              src={rattanFurniture2} 
              alt="Handcrafted rattan furniture" 
              className="rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Customer Reviews Component
const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Mitchell",
      location: "Glasgow",
      rating: 5,
      comment: "Absolutely love my new garden set! The quality is exceptional and it looks beautiful in my garden.",
      product: "Garden Paradise Set"
    },
    {
      id: 2,
      name: "James Robertson",
      location: "Edinburgh",
      rating: 5,
      comment: "Fast delivery and excellent customer service. The furniture exceeded my expectations.",
      product: "Cozy Conversation Set"
    },
    {
      id: 3,
      name: "Emma Thompson",
      location: "Stirling",
      rating: 4.8,
      comment: "Beautiful craftsmanship and very comfortable. Perfect for our patio dining area.",
      product: "Elegant Dining Collection"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600">
            Join thousands of satisfied customers who have transformed their spaces with our furniture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card key={review.id} className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(review.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{review.comment}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.location}</p>
                  <p className="text-sm text-primary">{review.product}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Andra's Garden Heaven</h3>
            <p className="text-gray-300 mb-4">
              Handcrafted rattan furniture for your perfect garden paradise. Quality, affordability, and natural beauty combined.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-white hover:text-primary">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-primary">
                <Mail className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-primary">
                <MapPin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-gray-300 hover:text-white transition-colors">Shop All</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-gray-300 hover:text-white transition-colors">Returns</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/care" className="text-gray-300 hover:text-white transition-colors">Care Instructions</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
            <p className="text-gray-300 mb-4">Subscribe for updates and special offers</p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Andra's Garden Heaven. All rights reserved. | Glasgow, Scotland
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={
            <main>
              <HeroSection />
              <FeaturedProducts />
              <BrandStory />
              <CustomerReviews />
            </main>
          } />
          {/* Add other routes here */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

