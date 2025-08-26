import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/Home";
import CreatePostPage from "./pages/CreatePost";
import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <main className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/signup" />} />

            {/* Auth routes */}
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/createPost"
              element={
                <ProtectedRoute>
                  <CreatePostPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </main>
  );
}

export default App;
