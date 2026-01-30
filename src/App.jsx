import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { BottomNav } from "@/widgets/BottomNav/BottomNav.jsx";
import { Footer } from "@/widgets/Footer/index.js";
import { Header } from "@/widgets/Header";

import { SearchPage } from "@/pages/search/ui/SearchPage.jsx";
import { ProductPage } from "@/pages/product/ui/ProductPage.jsx";

const NotFoundPage = () => <Navigate to="/" replace />;

const App = () => {
  return (
    <BrowserRouter>
      <Header cartCount={2} userName="Алексей" />
      
      <main>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      
      <Footer />
      <BottomNav cartCount={1} />
    </BrowserRouter>
  );
};

export default App;
