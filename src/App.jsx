import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Menu as MenuIcon, 
  X, 
  ChefHat, 
  Coffee, 
  Utensils,
  Heart,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import './App.css';

// Import images
import interior1 from './assets/interior/interior_1.jpg';
import interior3 from './assets/interior/interior_3.jpg';
import interior6 from './assets/interior/interior_6.jpg';
import food1 from './assets/food/food_1.jpg';
import food4 from './assets/food/food_4.jpg';
import food7 from './assets/food/food_7.jpg';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      const sections = ['home', 'about', 'menu', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const menuItems = [
    {
      category: "Brunch Classics",
      items: [
        { name: "Classic Benedict", price: "€10.50", description: "Poached eggs, hollandaise sauce, English muffin" },
        { name: "Salmon Benedict", price: "€11.50", description: "Smoked salmon, poached eggs, hollandaise" },
        { name: "Avocado Benedict", price: "€10.00", description: "Fresh avocado, poached eggs, hollandaise" },
        { name: "Classic Pancakes", price: "€8.00", description: "Fluffy pancakes with maple syrup" },
        { name: "Red Fruits Pancakes", price: "€9.00", description: "Pancakes with fresh berries" },
        { name: "Avocado Toast", price: "€8.50", description: "Sourdough bread, smashed avocado, lime" }
      ]
    },
    {
      category: "Spanish Specialties",
      items: [
        { name: "Paella de Marisco", price: "€16.00", description: "Traditional seafood paella" },
        { name: "Paella de Pollo", price: "€14.00", description: "Chicken paella with saffron rice" },
        { name: "Paella Vegetal", price: "€13.00", description: "Vegetarian paella with seasonal vegetables" },
        { name: "Patatas Bravas", price: "€6.00", description: "Crispy potatoes with spicy tomato sauce" },
        { name: "Gambas al Ajillo", price: "€12.00", description: "Garlic shrimp in olive oil" },
        { name: "Pulpo a la Gallega", price: "€15.00", description: "Galician-style octopus" }
      ]
    },
    {
      category: "Fresh & Healthy",
      items: [
        { name: "House Salad", price: "€8.50", description: "Mixed greens, tomatoes, cucumber, vinaigrette" },
        { name: "Chicken Salad", price: "€9.50", description: "Grilled chicken, mixed greens, avocado" },
        { name: "Veggie Burger", price: "€9.00", description: "Plant-based patty with fresh vegetables" },
        { name: "Chicken Wrap", price: "€9.00", description: "Grilled chicken, vegetables, tortilla wrap" },
        { name: "Veggie Wrap", price: "€8.50", description: "Fresh vegetables and hummus wrap" }
      ]
    }
  ];

  const galleryImages = [
    { src: interior1, alt: "Restaurant Interior" },
    { src: food1, alt: "Signature Dish" },
    { src: interior3, alt: "Cozy Atmosphere" },
    { src: food4, alt: "Fresh Ingredients" },
    { src: interior6, alt: "Dining Area" },
    { src: food7, alt: "Artisan Coffee" }
  ];

  const AnimatedSection = ({ children, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Loading Animation */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="loading-spinner"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="text-2xl font-bold text-gradient"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Colibri Brunch & Bistro
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'menu', 'gallery', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`nav-link capitalize transition-colors hover:text-primary ${
                    activeSection === item ? 'text-primary active' : 'text-foreground'
                  }`}
                >
                  {item}
                </button>
              ))}
              <Button className="btn-primary hover:scale-105 transition-transform">
                Reserve Table
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white/95 backdrop-blur-md border-t border-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                {['home', 'about', 'menu', 'gallery', 'contact'].map((item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left capitalize py-2 hover:text-primary transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                  </motion.button>
                ))}
                <Button className="w-full btn-primary">
                  Reserve Table
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${interior1})`,
            y: y
          }}
        />
        <div className="absolute inset-0 hero-gradient" />
        
        <motion.div 
          className="relative z-10 text-center text-white px-4"
          style={{ opacity }}
        >
          <motion.h1 
            className="heading-xl mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Where Barcelona
            <br />
            <span className="text-accent">Meets Brunch</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Experience the finest brunch in Barceloneta with fresh ingredients, 
            authentic flavors, and Mediterranean warmth.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              size="lg" 
              className="btn-primary px-8 py-4 text-lg"
              onClick={() => scrollToSection('menu')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Utensils className="mr-2" size={20} />
              View Menu
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-foreground px-8 py-4 text-lg backdrop-blur-sm"
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin className="mr-2" size={20} />
              Visit Us
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="heading-lg mb-6 text-gradient">
                Our Story
              </h2>
              <p className="text-lg mb-6 text-muted-foreground leading-relaxed">
                Located in the heart of Barcelona's vibrant Barceloneta district, 
                Colibri Brunch & Bistro brings together the best of Mediterranean 
                cuisine with international brunch favorites.
              </p>
              <p className="text-lg mb-8 text-muted-foreground leading-relaxed">
                Our menu is designed to meet the needs of everyone, from completely 
                vegan options to traditional Spanish dishes, including world-renowned 
                varieties of benedict and British breakfast classics.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-4xl font-bold text-primary mb-2">4.6</div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">489 Reviews</div>
                </motion.div>
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-4xl font-bold text-primary mb-2">#230</div>
                  <div className="text-sm text-muted-foreground">
                    of 10,518 Restaurants
                    <br />in Barcelona
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection className="grid grid-cols-2 gap-4">
              <motion.img 
                src={interior3} 
                alt="Restaurant Interior" 
                className="rounded-lg hover-lift"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <motion.img 
                src={food4} 
                alt="Delicious Food" 
                className="rounded-lg hover-lift mt-8"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="section-padding">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="heading-lg mb-6 text-gradient">
              Our Menu
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              From traditional Spanish paellas to international brunch classics, 
              our menu offers something special for every taste and dietary preference.
            </p>
          </AnimatedSection>

          {/* Horizontal Scrolling Menu Categories */}
          <AnimatedSection>
            <div className="overflow-x-auto pb-6">
              <div className="flex gap-8 min-w-max">
                {menuItems.map((category, categoryIndex) => (
                  <motion.div
                    key={category.category}
                    className="flex-shrink-0 w-80"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <motion.h3 
                      className="text-2xl font-bold mb-6 text-primary text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {category.category}
                    </motion.h3>
                    <div className="space-y-4">
                      {category.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Card className="menu-item-card hover-lift h-full">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="text-base font-semibold">{item.name}</h4>
                                <span className="text-lg font-bold text-primary">{item.price}</span>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="text-center mt-16">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { icon: Heart, text: "Vegetarian Friendly", color: "text-red-500" },
                { icon: ChefHat, text: "Vegan Options", color: "text-green-600" },
                { icon: Coffee, text: "Gluten Free", color: "text-amber-600" }
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 bg-secondary/20 px-6 py-3 rounded-full"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(210, 105, 30, 0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <badge.icon className={`w-5 h-5 ${badge.color}`} />
                  <span className="text-sm font-medium">{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="heading-lg mb-6 text-gradient">
              Gallery
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Take a glimpse into our warm atmosphere and beautifully crafted dishes 
              that make every visit memorable.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-64 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="heading-lg mb-6 text-gradient">
              Visit Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Located in the heart of Barceloneta, we're open every day to serve you 
              the best brunch experience in Barcelona.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedSection>
              <Card className="p-8 hover-lift">
                <CardContent className="space-y-8">
                  {[
                    {
                      icon: MapPin,
                      title: "Address",
                      content: (
                        <>
                          Pg. de Joan de Borbó, 6<br />
                          08003 Barcelona, Spain
                        </>
                      )
                    },
                    {
                      icon: Phone,
                      title: "Phone",
                      content: "+34 631 62 72 78"
                    },
                    {
                      icon: Clock,
                      title: "Hours",
                      content: (
                        <>
                          Monday - Sunday<br />
                          8:00 AM - 11:00 PM
                        </>
                      )
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <item.icon className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.content}</p>
                      </div>
                    </motion.div>
                  ))}

                  <div className="pt-6">
                    <Button className="w-full btn-primary text-lg py-3">
                      Make a Reservation
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection className="h-96 bg-muted rounded-lg flex items-center justify-center hover-lift">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg font-semibold">Interactive Map</p>
                <p className="text-sm">Barceloneta, Barcelona</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 text-accent">
                Colibri Brunch & Bistro
              </h3>
              <p className="text-secondary-foreground/80 mb-6 leading-relaxed">
                Barcelona's premier brunch destination in the heart of Barceloneta. 
                Experience Mediterranean warmth with every bite.
              </p>
              <div className="flex space-x-4">
                {[Instagram, Facebook, Twitter].map((Icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-6 h-6 hover:text-accent cursor-pointer transition-colors" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['Home', 'About', 'Menu', 'Gallery', 'Contact'].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block hover:text-accent transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-secondary-foreground/80">
                <p>Pg. de Joan de Borbó, 6</p>
                <p>08003 Barcelona, Spain</p>
                <p>+34 631 62 72 78</p>
                <p>Open Daily: 8:00 AM - 11:00 PM</p>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="border-t border-secondary-foreground/20 mt-12 pt-8 text-center text-secondary-foreground/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2025 Colibri Brunch & Bistro. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default App;