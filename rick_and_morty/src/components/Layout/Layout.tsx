import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { Sidebar } from "@components/Sidebar";

import classes from "./Layout.module.scss";
import { ToastContainer } from "react-toastify";

type Props = {
  children: JSX.Element;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={10000}
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className={classes.content}>
        <Sidebar />
        <div className={classes.main}>
          <main>{children}</main>
        </div>
      </div>
      <Footer />
    </>
  );
};
