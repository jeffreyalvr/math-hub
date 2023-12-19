import "./styles/global.css";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="container flex flex-col gap-6 mx-auto">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
