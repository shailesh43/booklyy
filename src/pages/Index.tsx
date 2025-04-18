
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-[70vh] items-center justify-center text-center animate-fade-in">
      <BookOpen size={80} className="text-primary mb-4 drop-shadow" />
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
        Welcome to <span className="text-primary">ShelfSpace</span>
      </h1>
      <p className="text-lg sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Your personal bookshelf in the cloud.<br />
        Track books you’ve read, are reading, or dream to read. Organize your growing library and never lose a story again!
      </p>
      <Link
        to="/bookshelf"
        className="px-7 py-3 rounded-lg bg-primary/90 text-white font-semibold shadow-lg text-lg hover:scale-105 transition-all"
      >
        Start Building Your Shelf
      </Link>
    </div>
  );
};

export default Index;
