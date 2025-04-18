
import * as React from "react";
import { useBooks, Book } from "@/context/BookContext";
import BookCard from "@/components/BookCard";
import EditBookDialog from "@/components/EditBookDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const statusOptions = [
  { value: "all", label: "All" },
  { value: "read", label: "Read" },
  { value: "reading", label: "Currently Reading" },
  { value: "wishlist", label: "Want to Read" },
];

export default function Bookshelf() {
  const { books, deleteBook, updateBook } = useBooks();
  const [editBook, setEditBook] = React.useState<Book | null>(null);

  function filtered(type: string) {
    if (type === "all") return books;
    return books.filter(b => b.status === type);
  }

  const [tab, setTab] = React.useState("all");

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold">My Bookshelf</h2>
        <Link
          to="/add"
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg font-semibold shadow transition"
        >
          <Plus size={18} /> Add Book
        </Link>
      </div>
      <Tabs defaultValue="all" value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="mb-4 glass">
          {statusOptions.map(o => (
            <TabsTrigger value={o.value} key={o.value} className="text-lg">{o.label}</TabsTrigger>
          ))}
        </TabsList>
        {statusOptions.map(o => (
          <TabsContent value={o.value} key={o.value}>
            {filtered(o.value).length === 0 ? (
              <div className="py-28 text-center text-muted-foreground flex flex-col items-center gap-2">
                <span className="text-4xl mb-2">📚</span>
                {o.value === "all"
                  ? <>No books yet.<br /><Link to="/add" className="text-primary underline">Add your first book!</Link></>
                  : <>No {o.label.toLowerCase()} books yet.</>}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-8">
                {filtered(o.value).map(book => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onEdit={() => setEditBook(book)}
                    onDelete={() => {
                      if (window.confirm("Are you sure you want to delete this book?")) {
                        deleteBook(book.id);
                        toast({ title: "Book deleted." });
                      }
                    }}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      {editBook && (
        <EditBookDialog
          open={!!editBook}
          book={editBook}
          onClose={() => setEditBook(null)}
          onSave={b => {
            updateBook(b);
            toast({ title: "Book updated!" });
          }}
        />
      )}
    </div>
  );
}
