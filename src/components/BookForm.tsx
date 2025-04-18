
import React, { useState } from "react";
import { Book, BookStatus } from "@/context/BookContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type Props = {
  initial?: Book;
  onSubmit: (b: Book) => void;
  submitText?: string;
};

const statusOptions: { value: BookStatus; label: string }[] = [
  { value: "read", label: "Read" },
  { value: "reading", label: "Currently Reading" },
  { value: "wishlist", label: "Want to Read" }
];

export default function BookForm({ initial, onSubmit, submitText }: Props) {
  const [form, setForm] = useState<Book>(
    initial ?? { id: uuidv4(), title: "", author: "", coverUrl: "", status: "wishlist", notes: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={e => {
        e.preventDefault();
        if (!form.title.trim() || !form.author.trim()) {
          toast({ title: "Please provide both title and author", description: "", variant: "destructive" });
          return;
        }
        onSubmit(form);
      }}
    >
      <Input name="title" placeholder="Book title" value={form.title} onChange={handleChange} required />
      <Input name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
      <Input name="coverUrl" placeholder="Cover image URL" value={form.coverUrl} onChange={handleChange} />
      <Select
        value={form.status}
        onValueChange={val => setForm(f => ({ ...f, status: val as BookStatus }))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Choose status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map(opt => (
            <SelectItem value={opt.value} key={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} rows={3} />
      <Button type="submit" className="mt-2">{submitText || "Add Book"}</Button>
    </form>
  );
}
