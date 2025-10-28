import { Shield, MapPin, AlertTriangle, Users, Activity, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-tourism.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Digital Tourist ID",
      description: "Blockchain-secured digital identity for seamless and safe tourism",
    },
    {
      icon: MapPin,
      title: "Smart Geo-Fencing",
      description: "Real-time alerts when entering restricted or high-risk zones",
    },
    {
      icon: AlertTriangle,
      title: "Emergency Response",
      description: "One-tap panic button with instant location sharing to authorities",
    },
    {
      icon: Activity,
      title: "AI Safety Scoring",
      description: "Personalized safety assessment based on travel patterns and locations",
    },
    {
      icon: Users,
      title: "Authority Dashboard",
      description: "Real-time monitoring and incident management for tourism officials",
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "10+ Indian languages plus English for inclusive accessibility",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">SafeTourism</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate("/tourist-app")}>
                Tourist App
              </Button>
              <Button variant="ghost" onClick={() => navigate("/admin")}>
                Admin Portal
              </Button>
              <Button variant="hero" onClick={() => navigate("/register")}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background z-0" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Smart Tourist Safety
              <span className="block text-primary mt-2">Monitoring System</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering safe and secure tourism in India with AI-powered monitoring,
              blockchain identity, and real-time emergency response
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button variant="hero" size="lg" onClick={() => navigate("/register")}>
                Register as Tourist
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/tourist-app")}>
                Launch Tourist App
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-12 max-w-2xl mx-auto">
              <Card className="p-6 text-center border-primary/20 shadow-[var(--shadow-soft)]">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground mt-1">Monitoring</div>
              </Card>
              <Card className="p-6 text-center border-success/20 shadow-[var(--shadow-soft)]">
                <div className="text-3xl font-bold text-success">AI</div>
                <div className="text-sm text-muted-foreground mt-1">Powered</div>
              </Card>
              <Card className="p-6 text-center border-accent/20 shadow-[var(--shadow-soft)]">
                <div className="text-3xl font-bold text-accent">Instant</div>
                <div className="text-sm text-muted-foreground mt-1">Alerts</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Comprehensive Safety Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced technology protecting tourists across India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-[var(--shadow-medium)] transition-all duration-300 border-border/50"
                >
                  <div className="rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Simple, secure, and effective</p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Register</h3>
              <p className="text-muted-foreground">
                Create your digital tourist ID with secure verification
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-success">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Travel Safe</h3>
              <p className="text-muted-foreground">
                Real-time monitoring and alerts keep you informed
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Stay Protected</h3>
              <p className="text-muted-foreground">
                Instant emergency response when you need it most
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to Experience Safe Tourism?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of tourists who trust our platform for their safety
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button variant="hero" size="lg" onClick={() => navigate("/register")}>
              Register Now
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/admin")}>
              Admin Login
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-muted/20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 SafeTourism. Securing tourism across India.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
