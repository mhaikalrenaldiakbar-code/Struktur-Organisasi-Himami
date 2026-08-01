import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Organization from "./pages/Organization";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Footer from "./components/Footer"; 

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Organization />
      <Events />
      <Gallery />
      <Contact />
      <Footer /> 
    </div>
  );
}

export default App;
