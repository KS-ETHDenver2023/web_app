import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main.js";
import NotFound from "./pages/NotFound.js";
import ZKbob from "./pages/ZKbob.js";
import GenerateProof from "./pages/GenerateProof.js";
import VerifyProof from "./pages/VerifyProof.js";
import Renting from "./pages/second/Renting.js";

function AppRoutes() {

    return (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/zkbob" element={<ZKbob />} />
        <Route path="/generateproof" element={<GenerateProof />} />
        <Route path="/verifyproof" element={<VerifyProof />} />
        <Route path="/renting" element={<Renting />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    );
  }
  
  export default AppRoutes;