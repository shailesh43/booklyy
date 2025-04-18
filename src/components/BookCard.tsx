
import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import BookStatusBadge from "./BookStatusBadge";
import { Book } from "@/context/BookContext";

type Props = {
  book: Book;
  onEdit: () => void;
  onDelete: () => void;
};

export default function BookCard({ book, onEdit, onDelete }: Props) {
  return (
    <div className="glass p-4 flex flex-col gap-3 shadow-md animate-fade-in">
      <div className="h-40 mb-2 flex justify-center items-center overflow-hidden rounded-lg bg-secondary/10">
        {book.coverUrl ? (
          <img src={book.coverUrl} alt={book.title} className="object-cover w-full h-full" />
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center text-muted-foreground text-lg">
            <span>No cover</span>
          </div>
        )}
      </div>
      <h3 className="font-semibold text-lg leading-tight">{book.title}</h3>
      <p className="text-sm text-muted-foreground"></p>
      <div className="flex flex-wrap gap-1 items-center mb-1">
        <span className="text-xs text-muted-foreground">By {book.author}</span>
        <BookStatusBadge status={book.status} />
      </div>
      {book.notes && (
        <div className="text-xs bg-muted/30 rounded p-2 line-clamp-2">{book.notes}</div>
      )}
      <div className="flex gap-2 mt-auto">
        <button onClick={onEdit} className="p-2 dark:hover:bg-muted/60 hover:bg-secondary/30 rounded transition">
          <Edit2 size={18} />
        </button>
        <button onClick={onDelete} className="p-2 hover:bg-destructive/70 rounded text-destructive transition">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
