import Navbar from "./../../components/Navbar";
import { useRouter } from "next/router";
function SinglePost() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="container mx-auto">
      <Navbar />
      {id}
    </div>
  );
}

export default SinglePost;
