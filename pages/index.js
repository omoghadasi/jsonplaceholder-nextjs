import Head from "next/head";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import StatAll from "../components/StatAll";

export default function Home() {
  return (
    <>
      <div className="container mx-auto">
        <Navbar />
        <Hero />
        <StatAll />
        <Footer />
      </div>
    </>
  );
}
