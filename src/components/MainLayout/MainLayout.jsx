import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navigation from "../Navigation/Navigation";
import Loader from "../Loader/Loader";
import css from "./MainLayout.module.css";

function MainLayout() {
  return (
    <>
      <Toaster position="top-right" />
      <Navigation />
      <main className={css.container}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}

export default MainLayout;
