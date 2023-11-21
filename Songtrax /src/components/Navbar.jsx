import { Link } from "react-router-dom";

export default function Navbar({ notHome }) {
  return (
    <nav className="w-screen bg-[linear-gradient(#A42DE8,_#2D3DE8)] text-white px-10 py-6 flex justify-between items-center fixed top-0">
      <section className="flex gap-4">
        {notHome && (
          <Link to={"/"} className="text-3xl font-bold">
            <img className="w-10" src={"/arrow.png"} alt="back arrow" />
          </Link>
        )}
        <Link to={"/"} className="text-3xl font-bold">
          <h2>Songtrax</h2>
        </Link>
      </section>
      <p>
        Create & Share Samples,
        <br className="md:hidden" /> Listen in Mobile App!
      </p>
    </nav>
  );
}
