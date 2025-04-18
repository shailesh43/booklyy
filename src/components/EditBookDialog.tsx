
import * as React from "react";
import { Book } from "@/context/BookContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BookForm from "./BookForm";

type Props = {
  open: boolean;
  onClose: () => void;
  book: Book | null;
  onSave: (updated: Book) => void;
};

export default function EditBookDialog({ open, onClose, book, onSave }: Props) {
  if (!book) return null;
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>
        <BookForm
          initial={book}
          onSubmit={b => {
            onSave(b);
            onClose();
          }}
          submitText="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
}
