
import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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

const DUMMY_BOOKS_RAW = [
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    coverUrl: "https://m.media-amazon.com/images/I/41wYbyr3LLL._SY445_SX342_.jpg",
    status: "Read",
    notes: "Explores two systems of thought: fast, intuitive thinking vs slow, rational thinking."
  },
  {
    title: "Man’s Search for Meaning",
    author: "Viktor E. Frankl",
    coverUrl: "https://m.media-amazon.com/images/I/51XkU9VxKYL._SY445_SX342_.jpg",
    status: "Read",
    notes: "Memoir and psychological insight from a Holocaust survivor."
  },
  {
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    coverUrl: "https://m.media-amazon.com/images/I/51pV8xNf0oL._SY445_SX342_.jpg",
    status: "Want To Read",
    notes: "Explains how trauma reshapes the body and mind."
  },
  {
    title: "Flow: The Psychology of Optimal Experience",
    author: "Mihaly Csikszentmihalyi",
    coverUrl: "https://m.media-amazon.com/images/I/41y5bL2ZK6L._SY445_SX342_.jpg",
    status: "Currently Reading",
    notes: "Discusses the mental state of being deeply immersed in an activity."
  },
  {
    title: "Influence: The Psychology of Persuasion",
    author: "Robert B. Cialdini",
    coverUrl: "https://m.media-amazon.com/images/I/51xSgUu2H-L._SY445_SX342_.jpg",
    status: "Read",
    notes: "Covers key techniques used to influence people’s decisions."
  },
  {
    title: "Vagabond",
    author: "Takehiko Inoue",
    coverUrl: "https://m.media-amazon.com/images/I/81tP8FbaDSL.jpg",
    status: "Read",
    notes: "A beautifully illustrated manga based on the life of samurai Miyamoto Musashi."
  },
  {
    title: "Berserk",
    author: "Kentaro Miura",
    coverUrl: "https://m.media-amazon.com/images/I/91+fUXeD24L.jpg",
    status: "Want To Read",
    notes: "Dark fantasy manga known for its mature themes and complex characters."
  },
  {
    title: "Death Note",
    author: "Tsugumi Ohba, Takeshi Obata",
    coverUrl: "https://m.media-amazon.com/images/I/71tbalAHYCL.jpg",
    status: "Read",
    notes: "A psychological battle between a genius student and a detective."
  },
  {
    title: "Fullmetal Alchemist",
    author: "Hiromu Arakawa",
    coverUrl: "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg",
    status: "Read",
    notes: "Explores alchemy, brotherhood, and the law of equivalent exchange."
  },
  {
    title: "Monster",
    author: "Naoki Urasawa",
    coverUrl: "https://m.media-amazon.com/images/I/91rurETMguL.jpg",
    status: "Currently Reading",
    notes: "Thriller manga about a doctor chasing a serial killer he once saved."
  },
  {
    title: "A Mathematician’s Apology",
    author: "G. H. Hardy",
    coverUrl: "https://m.media-amazon.com/images/I/41FkgWq0B2L.jpg",
    status: "Want To Read",
    notes: "A reflective essay on the beauty and purpose of mathematics."
  },
  {
    title: "Gödel, Escher, Bach: An Eternal Golden Braid",
    author: "Douglas R. Hofstadter",
    coverUrl: "https://m.media-amazon.com/images/I/71n1yPULguL.jpg",
    status: "Want To Read",
    notes: "A deep dive into logic, consciousness, and self-reference."
  },
  {
    title: "The Elements of Law: Natural and Politic",
    author: "Thomas Hobbes",
    coverUrl: "https://m.media-amazon.com/images/I/71AUYtZOLQL.jpg",
    status: "Currently Reading",
    notes: "A foundational text in political philosophy and legal theory."
  },
  {
    title: "The Concept of Law",
    author: "H. L. A. Hart",
    coverUrl: "https://m.media-amazon.com/images/I/41LOEwW78kL.jpg",
    status: "Want To Read",
    notes: "Influential work in legal positivism and philosophy of law."
  },
  {
    title: "The Mathematical Experience",
    author: "Philip J. Davis, Reuben Hersh",
    coverUrl: "https://m.media-amazon.com/images/I/51w7tF4KKyL.jpg",
    status: "Read",
    notes: "An accessible and reflective look into the life of mathematics."
  }
];

// Map normalized status
function normalizeStatus(status: string): BookStatus {
  const s = status.toLowerCase();
  if (s.includes("want")) return "wishlist";
  if (s.includes("currently")) return "reading";
  if (s === "read") return "read";
  if (s === "reading") return "reading";
  if (s === "wishlist") return "wishlist";
  return "wishlist";
}

// Convert dummy books to Book shape (with ids and normalized status)
const DUMMY_BOOKS: Book[] = DUMMY_BOOKS_RAW.map(b => ({
  ...b,
  id: uuidv4(),
  status: normalizeStatus(b.status)
}));

export const BookProvider = ({ children }: { children: React.ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);

  // Load from storage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DUMMY_BOOKS));
      setBooks(DUMMY_BOOKS);
    } else {
      setBooks(raw ? JSON.parse(raw) : []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
