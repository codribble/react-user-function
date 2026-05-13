import AuthProvider from "@/providers/AuthProvider";
import React from "react";

const Providers = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Providers;
