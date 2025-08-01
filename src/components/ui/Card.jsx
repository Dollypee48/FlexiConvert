import React from "react";
import PropTypes from "prop-types";

export function Card({ children, className = "" }) {
  return (
    <section
      className={`bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out ${className}`}
      role="region"
      aria-label="Card section"
    >
      {children}
    </section>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
