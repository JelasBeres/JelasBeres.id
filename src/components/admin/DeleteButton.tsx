"use client";

import { Trash2 } from "lucide-react";

export function DeleteButton() {
  return (
    <button
      type="submit"
      className="p-1.5 text-muted hover:text-red-600 hover:bg-red-50 rounded-sm transition-colors"
      title="Delete"
      onClick={(e) => {
        if (!window.confirm("Are you sure you want to delete this article?")) {
          e.preventDefault();
        }
      }}
    >
      <Trash2 size={16} />
    </button>
  );
}
