import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, BarChart3, CloudSun, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroImage from '@/assets/hero-farm.jpg';

const Index = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Data-Driven Insights',
      description: 'Analyze soil nutrients and conditions for precise recommendations.',
    },
    {
      icon: CloudSun,
      title: 'Weather Integration',
      description: 'Real-time weather data to optimize planting decisions.',
    },
    {
      icon: Sprout,
      title: 'Smart Recommendations',
      description: 'ML-powered crop suggestions tailored to your land.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-16 min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Agricultural farmland"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-up">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Smart Farming Solutions</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Grow Smarter with{' '}
              <span className="text-gradient-primary">AI-Powered</span> Crop Guidance
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
              AgroGuide uses advanced machine learning and real-time weather data to recommend 
              the perfect crops for your soil conditions. Make data-driven decisions for better yields.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button asChild variant="hero" size="lg">
                <Link to="/recommend">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Why Choose AgroGuide?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Empowering farmers with technology to make informed decisions and maximize crop yields.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-8 rounded-2xl bg-gradient-card shadow-card border border-border/50 hover:shadow-elevated transition-shadow duration-300 animate-fade-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-hero p-12 md:p-16 text-center">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary-foreground rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">
                Ready to Optimize Your Harvest?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Enter your soil data and get personalized crop recommendations in seconds.
              </p>
              <Button asChild variant="secondary" size="lg">
                <Link to="/recommend">
                  Start Analyzing
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;