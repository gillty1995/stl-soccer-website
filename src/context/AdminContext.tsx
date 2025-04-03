"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AdminContextType = {
  adminLoggedIn: boolean;
  setAdminLoggedIn: (loggedIn: boolean) => void;
};

const AdminContext = createContext<AdminContextType>({
  adminLoggedIn: false,
  setAdminLoggedIn: () => {},
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  return (
    <AdminContext.Provider value={{ adminLoggedIn, setAdminLoggedIn }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
