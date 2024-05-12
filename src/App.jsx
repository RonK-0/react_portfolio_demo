import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import Portfolio from "./components/pages/developer/dashboard/portfolio/Portfolio";
import { StoreProvider } from "./store/StoreContext";
import Home from "./components/pages/developer/ui/Home";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <Router>
            <Routes>
              <Route path="/portfolio" element={<Portfolio />} />
              {/* UI */}
              <Route path="/home" element={<Home />} />

              {/* FOR NOT FOUND 404 PAGE */}
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </Router>
        </StoreProvider>
      </QueryClientProvider>

    </>
  )
}
export default App
