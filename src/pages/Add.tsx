
import React from "react";
import BookForm from "@/components/BookForm";
import { useBooks } from "@/context/BookContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export default function Add() {
  const { addBook } = useBooks();
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto glass p-8 shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Add a New Book</h2>
      <BookForm
        onSubmit={book => {
          addBook(book);
          toast({ title: "Book added!" });
          navigate("/bookshelf");
        }}
      />
    </div>
  );
}
