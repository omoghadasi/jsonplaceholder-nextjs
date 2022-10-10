import Navbar from "./../../components/Navbar";
import { useRouter } from "next/router";
import UserSingle from "../../components/users/UserSingle";
import Footer from "../../components/Footer";

export default function SingleUser() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="container mx-auto">
      <Navbar />
      <UserSingle userId={id} />
      <Footer />
    </div>
  );
}
