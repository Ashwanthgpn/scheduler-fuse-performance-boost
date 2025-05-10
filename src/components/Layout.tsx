
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        links={[
          { href: "/", label: "Dashboard" },
          { href: "/simulation", label: "Simulation" },
          { href: "/publications", label: "Publications" },
        ]} 
      />
      <main className="flex-grow bg-gray-50">
        {isMounted ? children : <div>Loading...</div>}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
