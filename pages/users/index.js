import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import UsersArchive from "../../components/users/UsersArchive";
function users() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <UsersArchive />
      <Footer />
    </div>
  );
}

export default users;
