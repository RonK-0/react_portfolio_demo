import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import Portfolio from "./components/pages/developer/dashboard/portfolio/Portfolio";
import { StoreProvider } from "./store/StoreContext";
import Home from "./components/pages/developer/ui/Home";
import Login from "./components/pages/developer/access/Login";
import ForgotPassword from "./components/pages/developer/access/ForgotPassword";
import CreatePassword from "./components/pages/developer/access/CreatePassword";
import Users from "./components/pages/developer/dashboard/users/User";
import ProtectedRoute from "./components/pages/developer/access/ProtectedRoute";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <Router>
            <Routes>
              <Route
                path="/portfolio"
                element={
                  <ProtectedRoute>
                    <Portfolio />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />
              {/* UI */}
              <Route path="/home" element={<Home />} />

              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/create-password" element={<CreatePassword />} />

              {/* FOR NOT FOUND 404 PAGE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </StoreProvider>
      </QueryClientProvider>
    </>
  );
}
export default App;
