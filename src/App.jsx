import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap"
import Register from "./pages/register";
import Products from "./pages/product";
import Edit from "./pages/edit";
import Detail from "./pages/detail";
import List from "./pages/list";
import Orders from "./pages/orders";
import EditOrder from "./pages/editOrder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path='/edit/:id' element={<Edit/>} />
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path='/list' element={<List/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/editOrder/:id' element={<EditOrder/>} />
        {/* <Route path="/edit/:id" element={<EditOrder />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
