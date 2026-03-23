import { Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./Header";
import AppNotice from "../AppNotice";

const Footer = lazy(() => import("./Footer"));

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-[#31468e] border-t-transparent rounded-full animate-spin"></div></div>}>
          <Outlet />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-24 bg-slate-900" />}>
        <Footer />
      </Suspense>
      <AppNotice />
    </>
  );
};

export default Layout;
