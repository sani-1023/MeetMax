// import SignUp from "./pages/SignUp";

// export default function App() {
//   return (
//     <main className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
//       <SignUp />
//     </main>
//   );
// }

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";

function App() {
  return (
    <main className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/signup" />} />

        {/* Auth routes */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
    </main>
  );
}

export default App;
