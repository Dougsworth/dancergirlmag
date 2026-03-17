import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, Music, Heart, Calendar } from "lucide-react";
import { StandardLayout } from "@/components/StandardLayout";

export default function NotFound() {
  return (
    <StandardLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full shadow-2xl border-primary/20 bg-white/80 dark:bg-black/20 backdrop-blur-sm">
          <CardContent className="text-center p-12">
            {/* Animated Dancing Figure */}
            <div className="mb-8 relative">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Music className="w-16 h-16 text-white animate-bounce" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary/20 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary/20 rounded-full animate-ping delay-75"></div>
            </div>

            {/* Error Message */}
            <div className="space-y-4 mb-8">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                404
              </h1>
              <h2 className="text-3xl font-secondary font-bold text-foreground">
                Oops! This page is off the beat! 🎵
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                Looks like you've danced your way to a page that doesn't exist. 
                Don't worry, let's get you back to the rhythm!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link to="/">
                <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg transition-all duration-300 hover:scale-105">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Homepage
                </Button>
              </Link>
              
              <Link to="/articles">
                <Button variant="outline" className="border-primary/30 hover:bg-primary/10 transition-all duration-300">
                  <Search className="w-4 h-4 mr-2" />
                  Explore Articles
                </Button>
              </Link>
              
              <Link to="/dancers-of-the-month">
                <Button variant="outline" className="border-secondary/30 hover:bg-secondary/10 transition-all duration-300">
                  <Heart className="w-4 h-4 mr-2" />
                  Meet Our Dancers
                </Button>
              </Link>
              
              <Link to="/events">
                <Button variant="outline" className="border-primary/30 hover:bg-primary/10 transition-all duration-300">
                  <Calendar className="w-4 h-4 mr-2" />
                  Dance Events
                </Button>
              </Link>
            </div>

            {/* Fun Caribbean-themed message */}
            <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20 mb-6">
              <p className="text-sm text-muted-foreground italic">
                🌴 "In Caribbean dance, every step has a purpose. Let's find your next step!" 🌴
              </p>
            </div>

            {/* Navigation Help */}
            <div className="text-xs text-muted-foreground">
              <p>Lost? Try using the navigation menu above or search for what you're looking for!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
}
