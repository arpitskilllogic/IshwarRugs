import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import ModernNavigation from "@/components/modern-navigation";
import ModernFooter from "@/components/modern-footer";
import Home from "@/pages/home";
import Collections from "@/pages/collections";
import CollectionDetail from "@/pages/collection-detail";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ModernNavigation />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/collections" component={Collections} />
          <Route path="/collections/:slug" component={CollectionDetail} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <ModernFooter />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ishwar-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
