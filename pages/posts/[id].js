import Navbar from "./../../components/Navbar";
import { useRouter } from "next/router";
import PostSingle from "../../components/posts/PostSingle";
import Footer from "../../components/Footer";
function SinglePost() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="container mx-auto">
      <Navbar />
      <PostSingle postId={id} />
      <Footer />
    </div>
  );
}

export default SinglePost;
