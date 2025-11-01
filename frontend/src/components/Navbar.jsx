const Navbar = () => {
  return (
    <nav>
      <div className="p-1.5 flex justify-center items-center bg-green-800 text-white">
        <img
          className="w-5.5 rounded-full object-cover border-1 border-white-800 md:w-11"
          src="/images/logo.png"
          alt="Logo"
        />
        <p className="ml-1 text-2xl font-bold font-mono md:text-5xl">
          MAKTABATUS SALAM
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
