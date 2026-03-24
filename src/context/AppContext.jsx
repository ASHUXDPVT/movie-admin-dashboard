import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [dark, setDark] = useState(false);

  // Load users
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users"));
    if (savedUsers) setUsers(savedUsers);

    const savedTickets = JSON.parse(localStorage.getItem("tickets"));
    if (savedTickets) setTickets(savedTickets);
  }, []);

  // Save users
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Save tickets
  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [tickets]);

  // Theme
  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        tickets,
        setTickets,
        dark,
        setDark,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);