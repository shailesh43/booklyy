
import React, { createContext, useContext, useEffect, useState } from "react";

export type BookStatus = "read" | "reading" | "wishlist";

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  status: BookStatus;
  notes?: string;
}

interface BookContextType {
  books: Book[];
  addBook: (b: Book) => void;
  updateBook: (b: Book) => void;
  deleteBook: (id: string) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export function useBooks() {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error("useBooks must be used within BookProvider");
  return ctx;
}

const STORAGE_KEY = "shelfspace_books";

export const BookProvider = ({ children }: { children: React.ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);

  // Load from storage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    setBooks(raw ? JSON.parse(raw) : []);
  }, []);

  // Sync to storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const addBook = (book: Book) => setBooks(prev => [book, ...prev]);
  const updateBook = (book: Book) =>
    setBooks(prev => prev.map(b => (b.id === book.id ? book : b)));
  const deleteBook = (id: string) =>
    setBooks(prev => prev.filter(b => b.id !== id));

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
};
