import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

const GalaxyPortfolio = lazy(() => import("./pages/GalaxyPortfolio"));

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617] text-sm text-slate-300">
      Loading galaxy mode…
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/galaxy"
          element={
            <Suspense fallback={<RouteFallback />}>
              <GalaxyPortfolio />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
