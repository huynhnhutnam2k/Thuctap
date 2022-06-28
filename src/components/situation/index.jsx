import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../pagination';
import Popup from './Popup';
import parse from 'html-react-parser';
import { getAllSituation } from '../../redux/situationSlice';
import { getAllDepartment } from '../../redux/departmentSlice';
import { getAllTreatment } from '../../redux/treatmentSlice';
// import queryString from 'query-string';

function Situation() {
    const [isOpen, setIsOpen] = useState(false)
    const [situationId, setSituationId] = useState("")
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllSituation())
    dispatch(getAllDepartment())
    dispatch(getAllTreatment())
    },[dispatch])   
    const {listSituation:situation} = useSelector((state) => state.situation)

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
      setSituationId(id)
    }

    // function handlePageChange(newPage){
    //   console.log('New page: ', newPage );
    //   setFilters({
    //     ... filters,
    //     _page: newPage,
    //   })
    // }

   

    const close = () =>{
      setIsOpen(false);
      setSituationId("");
      }
    return (
        <>
        <div className="question col-12">
            {situation?.map((item) => (            
              <div className="situation col-6 col-md-4 col-lg-2" value={item._id} key={item._id} onClick={()=>handleClick(item._id)}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8uRX4rai3Bv0Lb_B6XL0WCUbQ4i-QajaX8sgavBvkI7hSCC-5lBTAJBFKm7tX0AGzzlo&usqp=CAU" alt="img" />
                  <p><b>Tình huống:</b> {item.name}</p>
                  <p><b>Mô tả:</b> <span className="desc">{parse(item.desc)}</span></p>
                  <p><b>Điểm TB:</b> {item.averageMark}</p>
              </div>  
            ))}
            {/* POPUP_QUESTION */}
            <Popup open={isOpen} id={situationId} onClose={close}></Popup>
            
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
export default Situation;