import { Toaster } from "react-hot-toast";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import AuthProvider from "./contexts/AuthContext";
import Router from "./Router/router";

function App() {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Router />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
