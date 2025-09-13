import { Suspense } from "react";
import AppBar from "../AppBar/AppBar";


export const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      <Suspense fallback={null}>{children}</Suspense>
    </>
  );
};