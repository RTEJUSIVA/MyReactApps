import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Helper function to make the segment text readable
  const getReadableName = (pathSegment, index) => {
    // Assuming the last segment that is a number is the Detail ID
    if (index === pathnames.length - 1 && !isNaN(pathSegment)) {
      return "Details";
    }
    // Capitalize the first letter and replace hyphens/underscores
    return (
      pathSegment.charAt(0).toUpperCase() +
      pathSegment.slice(1).replace(/-/g, " ")
    );
  };

  return (
    // Container for the breadcrumb: light padding, border bottom for separation
    <nav
      className="bg-gray-50 py-3 border-b border-gray-200"
      aria-label="breadcrumb"
    >
      <ol className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2">
        {/* 1. Always start with Home */}
        <li key="/" className="flex items-center">
          <Link
            to="/"
            className="text-sm font-medium text-gray-500 hover:text-blue-600 transition duration-150"
          >
            Home
          </Link>
        </li>

        {/* 2. Map through the path segments */}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const readableName = getReadableName(value, index);

          return (
            <React.Fragment key={to}>
              {/* Separator (placed before the next segment) */}
              <span className="text-gray-400" aria-hidden="true">
                /
              </span>

              <li className="flex items-center">
                {isLast ? (
                  // Last item (current page) is active text
                  <span className="text-sm font-semibold text-gray-700">
                    {readableName}
                  </span>
                ) : (
                  // Intermediate item is a clickable link
                  <Link
                    to={to}
                    className="text-sm font-medium text-gray-500 hover:text-blue-600 transition duration-150"
                  >
                    {readableName}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
