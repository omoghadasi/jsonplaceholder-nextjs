import Head from "next/head";
import AlbumsSlider from "../components/albums/AlbumsSlider";
import CommentsSlider from "../components/comments/CommentsSlider";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import PostsSlider from "../components/posts/PostsSlider";
import StatAll from "../components/stat/AllStat";
import UsersSlider from "../components/users/UsersSlider";
import PhotosSlider from "../components/photos/PhotosSlider";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <Hero />
      <StatAll />
      <PostsSlider />
      <UsersSlider />
      <CommentsSlider />
      <div className="flex justify-between items-start">
        <div className="w-2/3 pr-5">
          <PhotosSlider />
        </div>
        <div className="w-1/3">
          <AlbumsSlider />
        </div>
      </div>
      <Footer />
    </div>
  );
}
