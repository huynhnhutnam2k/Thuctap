import { getAllSituation } from "../../redux/situationSlice";

function Pagination() {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {/* <li className="page-item disabled">
          <a className="page-link" href="#" tabindex="-1">
            Trước
          </a>
        </li> */}
        <li className="page-item">
          <a className="page-link" href="/#" onClick={() => getAllSituation(1)}>
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="/#" onClick={() => getAllSituation(2)}>
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="/#">
            3
          </a>
        </li>
        {/* <li className="page-item">
          <a className="page-link" href="#">
            Tiếp
          </a>
        </li> */}
      </ul>
    </nav>
  );
}

export default Pagination;
