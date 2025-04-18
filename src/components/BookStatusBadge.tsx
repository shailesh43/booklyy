
import React from "react";
import { BookStatus } from "@/context/BookContext";

export default function BookStatusBadge({ status }: { status: BookStatus }) {
  const map: Record<BookStatus, { text: string; color: string }> = {
    read: { text: "Read", color: "bg-green-600/80 text-white" },
    reading: { text: "Reading", color: "bg-yellow-500/80 text-yellow-950" },
    wishlist: { text: "Want to Read", color: "bg-violet-600/60 text-white" }
  };
  const { text, color } = map[status];
  return (
    <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${color}`}>{text}</span>
  );
}
