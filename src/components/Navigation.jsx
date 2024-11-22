import React from "react";

export const Navigation = ({ currentPage, navigate }) => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("home");
            }}
            className={currentPage === "home" ? "text-blue-600" : ""}
          >
            home
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("about");
            }}
            className={currentPage === "about" ? "text-blue-600" : ""}
          >
            about
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("work");
            }}
            className={currentPage === "work" ? "text-blue-600" : ""}
          >
            work
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("contact");
            }}
            className={currentPage === "contact" ? "text-blue-600" : ""}
          >
            contact
          </a>
        </li>
      </ul>
    </nav>
  );
};
