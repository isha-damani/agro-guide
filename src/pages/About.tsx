import { Link } from 'react-router-dom';
import { Database, Cloud, Brain, ArrowRight, Server, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  const techStack = [
    {
      icon: Brain,
      title: 'Machine Learning Model',
      description: 'Trained on comprehensive agricultural datasets including soil composition, climate data, and historical crop yields to predict optimal crops.',
    },
    {
      icon: Database,
      title: 'Dataset',
      description: 'Utilizes curated datasets with thousands of soil samples containing NPK values, pH levels, temperature, humidity, and rainfall data.',
    },
    {
      icon: Cloud,
      title: 'Weather API Integration',
      description: 'Real-time weather data fetched from reliable APIs to enhance predictions with current atmospheric conditions.',
    },
    {
      icon: Server,
      title: 'REST API Backend',
      description: 'Clean separation of concerns with a REST API handling all ML predictions and weather data processing.',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Input Soil Data',
      description: 'Enter your soil nutrient levels (N, P, K) and pH value.',
    },
    {
      step: '02',
      title: 'Add Weather Info',
      description: 'Provide temperature, rainfall, and location details.',
    },
    {
      step: '03',
      title: 'AI Analysis',
      description: 'Our ML model processes your data against trained patterns.',
    },
    {
      step: '04',
      title: 'Get Recommendation',
      description: 'Receive the optimal crop suggestion with growing tips.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Layers className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">About the Project</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
              How AgroGuide Works
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              AgroGuide combines machine learning with real-time weather data to provide 
              farmers with accurate, data-driven crop recommendations based on their 
              specific soil conditions and local climate.
            </p>
          </div>

          {/* How It Works */}
          <section className="mb-20">
            <h2 className="text-2xl font-serif font-bold text-foreground text-center mb-12">
              The Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {workflowSteps.map((item, index) => (
                <div
                  key={item.step}
                  className="relative animate-fade-up"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <Card className="p-6 bg-gradient-card shadow-card border-0 h-full">
                    <span className="text-5xl font-serif font-bold text-primary/20 mb-4 block">
                      {item.step}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                  
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-primary/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="mb-20">
            <h2 className="text-2xl font-serif font-bold text-foreground text-center mb-12">
              Technology Stack
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {techStack.map((tech, index) => (
                <Card
                  key={tech.title}
                  className="p-6 bg-gradient-card shadow-card border-0 animate-fade-up"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center flex-shrink-0">
                      <tech.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {tech.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* API Info */}
          <section className="mb-20">
            <Card className="p-8 md:p-12 bg-muted/50 border-0 max-w-4xl mx-auto">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                API Endpoints
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-card border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-primary text-primary-foreground">
                      POST
                    </span>
                    <code className="text-sm font-mono text-foreground">/api/recommend</code>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Accepts soil parameters (N, P, K, pH, temperature, rainfall, city) and returns crop recommendation with advisory.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-card border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-accent text-accent-foreground">
                      GET
                    </span>
                    <code className="text-sm font-mono text-foreground">/api/weather?city=</code>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Fetches current weather data for the specified city including temperature and humidity.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* CTA */}
          <section className="text-center">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
              Ready to Try It Out?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Experience the power of AI-driven agriculture. Enter your soil data and get personalized recommendations.
            </p>
            <Button asChild variant="hero" size="lg">
              <Link to="/recommend">
                Get Recommendation
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;