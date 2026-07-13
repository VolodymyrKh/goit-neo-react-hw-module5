import css from "./Loader.module.css";

function Loader() {
  return (
    <div className={css.wrapper}>
      <span className={css.spinner} aria-label="Loading" />
    </div>
  );
}

export default Loader;
