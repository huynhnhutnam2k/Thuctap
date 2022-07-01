import React from "react";
import Nav from "../../components/layout/Nav";
import Situation from "../../components/situation";
import Auth from "../../pages/Login/Login";
// import Pagination from "../../components/pagination";

function Listquestion() {
  return (
    <>
      <Auth />
      <Nav />
      <Situation />
    </>
  );
}

export default Listquestion;
