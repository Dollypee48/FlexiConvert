import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-4 mt-8 text-sm text-gray-600">
      <p>
        &copy; {new Date().getFullYear()} FlexiConvert. All rights reserved.
      </p>
    </footer>
  );
}
