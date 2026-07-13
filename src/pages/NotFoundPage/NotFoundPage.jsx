import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <main className={css.container}>
      <h1 className={css.code}>404</h1>
      <p className={css.text}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className={css.link}>
        Go back home
      </Link>
    </main>
  );
}

export default NotFoundPage;
