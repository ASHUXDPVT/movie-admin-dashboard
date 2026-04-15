import React, {
  createContext,
  useEffect,
  useState,
} from "react";

export const AppContext =
  createContext();

export const AppProvider = ({
  children,
}) => {
  const [darkMode, setDarkMode] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "darkMode"
        )
      ) ?? true
    );

  const [movies, setMovies] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "movies"
        )
      ) || []
    );

  const [users, setUsers] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "users"
        )
      ) || []
    );

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(
        darkMode
      )
    );

    if (darkMode) {
      document.documentElement.classList.add(
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem(
      "movies",
      JSON.stringify(
        movies
      )
    );
  }, [movies]);

  useEffect(() => {
    localStorage.setItem(
      "users",
      JSON.stringify(
        users
      )
    );
  }, [users]);

  const toggleTheme = () =>
    setDarkMode(
      !darkMode
    );

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleTheme,
        movies,
        setMovies,
        users,
        setUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};