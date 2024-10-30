import styles from "./App.module.css";
import Footer from "./components/Footer/Footer";
import Generator from "./components/Generator/Generator";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className={styles.container}>
      <Navbar />
      <Generator />
      <Footer />
    </div>
  );
}

export default App;
