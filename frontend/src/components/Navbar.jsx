const Navbar = () => {
  return (
    <nav className="bg-green-800 text-white shadow-md ">
      <div className="flex items-center justify-center py-2 md:py-4 px-3 md:px-6 gap-2 md:gap-4">
        <img
          className="w-6 h-6 md:w-10 md:h-10 rounded-full object-cover border-2 border-white transition-transform duration-300 hover:scale-105"
          src="/images/logo.png"
          alt="Logo"
        />
        <p className="font-bold font-mono text-2xl sm:text-2xl md:text-4xl tracking-wide text-center">
          MAKTABATUS SALAM
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
