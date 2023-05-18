import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import NoPage from "./Pages/NoPage";
import InVoicePage from "./Invoice";
// import Dummy from "./Components/Dummy";

import "bootstrap/dist/css/bootstrap.min.css";
import DataPage from "./Components/DataPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="invoice" element={<InVoicePage />} />
          {/* <Route path="dummy" element={<Dummy />} /> */}
          <Route path="data" element={<DataPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
