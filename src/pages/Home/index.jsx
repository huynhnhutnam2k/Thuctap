import Nav from "../../components/layout/Nav";
import Situation from "../../components/situation";
import Auth from "../../pages/Login/Login";
import Pagination from "../../components/pagination";
import { useState } from "react";

function Home() {
  const [departId, setDepartId] = useState("");
  // console.log(departId);
  return (
    <div className="home">
      <Auth />
      <Nav departId={departId} setDepartId={setDepartId} />
      <Situation departId={departId} setDepartId={setDepartId} />
      {/* <Pagination /> */}
    </div>
  );
}
export default Home;
