import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuestion} from '../../redux/apiRequest';
import Pagination from '../../components/pagination';
import Popup from './Popup';
import parse from 'html-react-parser';
// import queryString from 'query-string';

function Question() {
    const [isOpen, setIsOpen] = useState(false)
    const [questionId, setQuestionId] = useState("")
    const question = useSelector(state => state.question.questions?.allQuestion)

    // const [pagination, setPagination] = useState({
    //   _page: 1,
    //   _limit: 1,
    //   _totalRows: 1,
    // });

    // const [filters, setFilters] = useState({
    //   _limit: 1,
    //   _page: 1,
    // });
    
    const handleClick= (id) =>{
      setIsOpen(true)
      setQuestionId(id)
    }

    // function handlePageChange(newPage){
    //   console.log('New page: ', newPage );
    //   setFilters({
    //     ... filters,
    //     _page: newPage,
    //   })
    // }

    const dispatch = useDispatch()
      useEffect(() => {
        getAllQuestion(dispatch)
      },[dispatch])

    const close = () =>{
      setIsOpen(false);
      setQuestionId("");
      }
    return (
        <>
        <div className="question col-12">
            {question?.map((item) => (            
              <div className="situation col-6 col-md-4 col-lg-2" value={item._id} key={item._id} onClick={()=>handleClick(item._id)}>
                  <img src={item.image} alt="img" />
                  <p><b>Tình huống:</b> {item.name}</p>
                  <p><b>Mô tả:</b> <span className="desc">{parse(item.description)}</span></p>
                  <p><b>Điểm TB:</b> {item.averageMark}</p>
              </div>  
            ))}
            {/* POPUP_QUESTION */}
            <Popup open={isOpen} id={questionId} onClose={close}></Popup>
            
        </div>
        <div className="pagination">
          {/* <Pagination
              pagination={pagination}
              onPageChange= {handlePageChange}
            /> */}
        </div>
        </>
    );
}
export default Question;