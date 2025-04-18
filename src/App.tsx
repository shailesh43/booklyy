
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Bookshelf from "./pages/Bookshelf";
import Add from "./pages/Add";
import NotFound from "./pages/NotFound";
import Navbar from "@/components/Navbar";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { BookProvider } from "@/context/BookContext";

export default function App() {
  return (
    <BookProvider>
      <BrowserRouter>
        <div className="relative min-h-screen bg-background pb-8">
          <Navbar />
          <main className="pt-24 container max-w-5xl mx-auto">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/bookshelf" element={<Bookshelf />} />
              <Route path="/add" element={<Add />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </main>
        </div>
      </BrowserRouter>
    </BookProvider>
  );
}
