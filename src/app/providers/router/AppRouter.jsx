import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import  App  from "@/App.jsx";

import { SearchPage } from "@/pages/search/ui/SearchPage.jsx";
import { ProductPage } from "@/pages/product/ui/ProductPage.jsx";

const NotFoundPage = () => <Navigate to="/" replace />;

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<App/>}>
        <Route path="/" element={<SearchPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        
    
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
