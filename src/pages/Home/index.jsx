import Nav from "../../components/layout/Nav";
import Situation from "../../components/situation";
import Auth from "../../pages/Login/Login";

function Home() {

    return (
        <div className="home">
            <Auth />
            <Nav />
            <Situation />
        </div>
    );
}

export default Home;