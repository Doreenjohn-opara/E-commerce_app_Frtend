import React from "react";
import { useLocation, Link } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {paths.map((path, index) => {
          const fullPath = `/${paths.slice(0, index + 1).join("/")}`;
          const isLast = index === paths.length - 1;

          return (
            <li key={index} className={`breadcrumb-item ${isLast ? "active" : ""}`}>
              {isLast ? (
                path
              ) : (
                <Link to={fullPath}>{path.replace(/-/g, " ")}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
