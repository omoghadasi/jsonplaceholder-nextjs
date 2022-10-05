import Head from "next/head";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import PostsSlider from "../components/posts/PostsSlider";
import StatAll from "../components/stat/AllStat";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "./../slice/usersSlice";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const usersStatus = useSelector((state) => state.users.status);

  useEffect(() => {
    if (usersStatus == "idle") {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, usersStatus]);

  return (
    <div className="container mx-auto">
      <Navbar />
      <Hero />
      <StatAll />
      <PostsSlider />
      <Footer />
    </div>
  );
}
