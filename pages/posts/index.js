import PostsArchive from "../../components/posts/PostsArchive";
import Navbar from "./../../components/Navbar";
function posts() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <PostsArchive />
    </div>
  );
}

export default posts;
