import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { 
  ChefHat, 
  Sparkles, 
  ArrowRight, 
  Camera, 
  Calendar, 
  Leaf, 
  Star, 
  Play,
  Shield,
  Clock,
  Zap,
  Users
} from 'lucide-react';
import heroFood from '@/assets/hero-food.jpg';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);

  const features = [
    { 
      icon: <Camera className="w-6 h-6" />, 
      title: 'Scan Your Fridge', 
      description: 'AI-powered recipe suggestions from your ingredients',
      gradient: 'from-primary/20 to-accent/20'
    },
    { 
      icon: <Calendar className="w-6 h-6" />, 
      title: 'Smart Meal Planning', 
      description: 'Weekly plans that adapt to your schedule',
      gradient: 'from-secondary to-secondary/50'
    },
    { 
      icon: <Leaf className="w-6 h-6" />, 
      title: 'Fresh Ingredients', 
      description: 'Pre-portioned kits delivered to your door',
      gradient: 'from-success/20 to-secondary'
    },
  ];

  const stats = [
    { value: '50+', label: 'Weekly Recipes', icon: <ChefHat className="w-4 h-4" /> },
    { value: '15min', label: 'Avg Prep Time', icon: <Clock className="w-4 h-4" /> },
    { value: '10k+', label: 'Happy Families', icon: <Users className="w-4 h-4" /> },
  ];

  const testimonials = [
    {
      quote: "AnyFeast has transformed how my family eats. The AI suggestions are spot-on!",
      author: "Sarah M.",
      role: "United Family subscriber",
      rating: 5
    },
    {
      quote: "Finally, meal planning that actually understands my dietary needs.",
      author: "James K.",
      role: "Health enthusiast",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <Header variant="default" />

      {/* Hero Section */}
      <div className="relative min-h-[75vh] flex items-end justify-center overflow-hidden">
        {/* Background image with parallax */}
        <motion.div 
          className="absolute inset-0"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <img
            src={heroFood}
            alt="Fresh ingredients on cutting board"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background" />
        </motion.div>

        {/* Floating food elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-24 left-[8%] w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/20 backdrop-blur-md flex items-center justify-center shadow-medium border border-white/20"
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-3xl md:text-4xl">🍅</span>
          </motion.div>
          
          <motion.div
            className="absolute top-36 right-[10%] w-14 h-14 md:w-18 md:h-18 rounded-2xl bg-success/20 backdrop-blur-md flex items-center justify-center shadow-medium border border-white/20"
            animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <span className="text-2xl md:text-3xl">🥑</span>
          </motion.div>
          
          <motion.div
            className="absolute top-52 left-[18%] w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-accent/20 backdrop-blur-md flex items-center justify-center shadow-medium border border-white/20"
            animate={{ y: [0, -12, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <span className="text-xl md:text-2xl">🌶️</span>
          </motion.div>
          
          <motion.div
            className="absolute top-40 right-[25%] w-10 h-10 md:w-12 md:h-12 rounded-xl bg-secondary backdrop-blur-md flex items-center justify-center shadow-soft border border-white/20"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            <span className="text-lg md:text-xl">🧄</span>
          </motion.div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 pb-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-foreground text-sm font-medium shadow-soft">
              <Sparkles className="w-4 h-4 text-primary" />
              Powered by AI • Loved by 10,000+ families
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            Recipe Kits,{' '}
            <span className="text-gradient">Reimagined</span>
            <br className="hidden md:block" />
            <span className="text-primary">by AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Personalized meal kits tailored to your taste, dietary needs, and schedule. 
            Let AI do the planning while you enjoy the cooking.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-6 md:gap-10 mb-8"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-1 text-primary mb-1">
                  {stat.icon}
                  <span className="text-2xl md:text-3xl font-display font-bold">{stat.value}</span>
                </div>
                <span className="text-xs md:text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="container max-w-4xl mx-auto px-4 py-12 space-y-16">
        {/* CTA Section - Primary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <Button
            variant="hero"
            size="xl"
            className="w-full md:w-auto min-w-[300px] text-lg h-16 shadow-glow"
            onClick={onStart}
          >
            <ChefHat className="w-6 h-6" />
            Personalize My Experience
            <ArrowRight className="w-6 h-6" />
          </Button>
          
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Takes 2 minutes
            </span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              No credit card required
            </span>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-foreground">
            Why Choose <span className="text-primary">AnyFeast</span>?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative p-6 rounded-3xl bg-gradient-to-br ${feature.gradient} border border-border/50 shadow-soft overflow-hidden group`}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center text-primary mb-4 shadow-soft group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-foreground">
            Loved by <span className="text-primary">Thousands</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border shadow-soft"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground italic mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Features highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border border-primary/20 overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                AI-Powered
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Let AI Plan Your Meals
              </h2>
              <p className="text-muted-foreground mb-6">
                Our advanced AI learns your preferences, dietary needs, and schedule to create 
                personalized meal plans that you'll actually want to cook.
              </p>
              
              <div className="space-y-3">
                {[
                  'Personalized recipe recommendations',
                  'Smart shopping lists',
                  'Nutritional optimization',
                  'Waste reduction planning'
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center">
              <motion.div
                className="relative w-48 h-48 md:w-64 md:h-64"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                {/* Orbiting elements */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30" />
                <div className="absolute inset-4 rounded-full border border-primary/20" />
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20" />
                
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl gradient-warm flex items-center justify-center shadow-glow">
                    <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-primary-foreground" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-6 py-8"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Ready to Transform Your <span className="text-gradient">Meal Experience</span>?
          </h2>
          
          <Button
            variant="hero"
            size="xl"
            className="w-full md:w-auto min-w-[300px] text-lg h-16"
            onClick={onStart}
          >
            <ChefHat className="w-6 h-6" />
            Get Started Free
            <ArrowRight className="w-6 h-6" />
          </Button>
        </motion.div>

        {/* App store hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4 py-8 border-t border-border"
        >
          <p className="text-sm text-muted-foreground">Full AI capability available on mobile</p>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors">
              <Play className="w-5 h-5" />
              <div className="text-left">
                <p className="text-[10px] leading-none opacity-70">GET IT ON</p>
                <p className="text-sm font-semibold">Google Play</p>
              </div>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <p className="text-[10px] leading-none opacity-70">Download on the</p>
                <p className="text-sm font-semibold">App Store</p>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
