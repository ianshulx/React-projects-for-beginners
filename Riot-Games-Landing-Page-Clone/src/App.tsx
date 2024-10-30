import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import "./index.css";

const App = () => {
  return (
    <div className="font-primary">
      <NavBar />

      <Hero />
    </div>
  );
};

export default App;
