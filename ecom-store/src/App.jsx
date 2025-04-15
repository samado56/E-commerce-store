import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
      </Routes>
    </>
  );
}

export default App;
