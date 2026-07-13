import css from "./App.module.css";

function App() {
  const { app, appHeader, appTitle, appMain, appDescription } = css;
  return (
    <div className={app}>
      <header className={appHeader}>
        <h1 className={appTitle}>React Homework</h1>
      </header>
      <main className={appMain}>
        <p className={appDescription}>
          Start React App!
        </p>
      </main>
    </div>
  );
}

export default App;
