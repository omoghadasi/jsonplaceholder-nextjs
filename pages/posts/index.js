import PostsArchive from "../../components/posts/PostsArchive";
import Navbar from "./../../components/Navbar";
import Footer from "../../components/Footer";
function posts() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <PostsArchive />
      <Footer />
    </div>
  );
}

export default posts;
