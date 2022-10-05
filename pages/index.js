import Head from "next/head";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import PostsSlider from "../components/posts/PostsSlider";
import StatAll from "../components/stat/AllStat";
import UsersSlider from "../components/users/UsersSlider";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <Hero />
      <StatAll />
      <PostsSlider />
      <UsersSlider />
      <Footer />
    </div>
  );
}
