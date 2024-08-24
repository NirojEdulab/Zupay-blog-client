export const options = [
  "bold",
  "italic",
  "|",
  "ul",
  "ol",
  "|",
  "font",
  "fontsize",
  "|",
  "outdent",
  "indent",
  "align",
  "|",
  "hr",
  "|",
  "fullsize",
  "brush",
  "|",
  "table",
  "link",
  "|",
  "undo",
  "redo",
];

export const API_URL = import.meta.env.VITE_SERVER_API_URL;

export const breadcrumbConfig = {
  "/": ["Home"],
  "/components": ["Home", "Components"],
  "/posts/:id": ["Home", "Posts", "Post Details"],
  "/create": ["Home", "Create Post"],
  "/posts/:id/edit": ["Home", "Edit Post"],
  "/profile/:id": ["Home", "Profile"],
  // Add more routes as needed
};
