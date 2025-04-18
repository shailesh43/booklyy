
const About = () => {
  return (
    <div className="max-w-2xl mx-auto glass p-8 mt-4 animate-fade-in">
      <h2 className="text-3xl font-bold mb-4">About ShelfSpace</h2>
      <p className="text-lg mb-6 text-muted-foreground">
        ShelfSpace helps you track your reading journey. Log books you’ve read, those you’re reading, and titles you’re excited to pick up next. 
        No more losing track or forgetting great stories!
      </p>
      <ul className="mb-6 space-y-2 text-base list-inside list-disc pl-3 text-muted-foreground">
        <li>See your reading history at a glance.</li>
        <li>Organize your “to read” wishlist for the future.</li>
        <li>Reflect on notes and highlights for each book.</li>
        <li>Stay motivated and celebrate your progress!</li>
      </ul>
      <div className="text-right">
        <span className="text-xs text-foreground/60">Built with ❤️ by book lovers</span>
      </div>
    </div>
  );
};

export default About;
