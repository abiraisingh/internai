import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
min-h-screen
bg-gray-50 dark:bg-gradient-to-b dark:from-black dark:via-gray-950 dark:to-black
text-gray-900 dark:text-white
transition-colors duration-300
"
    >
      <Navbar />

      <main
        className="
        max-w-7xl
        mx-auto
        px-6
        py-10
        "
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
