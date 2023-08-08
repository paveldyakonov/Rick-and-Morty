import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { Sidebar } from "@components/Sidebar";
import classes from "./Layout.module.scss";

type Props = {
  children: JSX.Element;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <div className={classes.content}>
        <Sidebar />
        <div className={classes.main}>
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};
