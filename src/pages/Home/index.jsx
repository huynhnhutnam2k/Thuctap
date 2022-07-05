import Nav from "../../components/layout/Nav";
import Situation from "../../components/situation";
import Auth from "../../pages/Login/Login";
import Pagination from "../../components/pagination";

function Home() {
  return (
    <div className="home">
      <Auth />
      <Nav />
      <Situation />
      {/* <Pagination /> */}
    </div>
  );
}

export default Home;
