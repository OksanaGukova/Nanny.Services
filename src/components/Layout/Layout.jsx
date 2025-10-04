import { Suspense } from "react";


export const Layout = ({ children }) => {
  return (
    <>
      <Suspense fallback={null}>{children}</Suspense>
    </>
  );
};