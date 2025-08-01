import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

export function Card({ children, className = "", title = "", padded = true }) {
  return (
    <section
      role="region"
      aria-label={title || "Card Section"}
      className={clsx(
        "relative overflow-hidden rounded-2xl border shadow-md transition-all duration-300 ease-in-out",
        "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-xl",
        className
      )}
    >
      {title && (
        <header className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h2>
        </header>
      )}
      <CardContent padded={padded}>{children}</CardContent>
    </section>
  );
}

export function CardContent({ children, className = "", padded = true }) {
  return (
    <div className={clsx(className, padded ? "px-6 py-4" : "")}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  padded: PropTypes.bool,
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padded: PropTypes.bool,
};
