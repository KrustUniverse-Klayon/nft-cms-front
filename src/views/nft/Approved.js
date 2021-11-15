import {useState, useEffect} from 'react';
import {apiGet} from "../util/Requests";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol, CPagination,
  CRow
} from '@coreui/react';

import CustomTable from "./components/CustomTable";

// ================================================
// NFT > 상품등록
// ================================================
const Approved = () => {

  const pageSize = 10
  const [items, setItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const fetchItems = async (page=1) => {
    try {
      const response = await apiGet(`/papi/v1/templates?status=approved&page=${page}&size=${pageSize}`)
      setItems(response.data.results) // 데이터는 response.data 안에 들어있습니다.
      const paging = response.data.paging
      setCurrentPage(paging.current_page)
      setTotalPage(paging.total_page)

    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchItems(currentPage)
  }, [currentPage])

  return (
    <>

      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              상품 등록 대기 카드 리스트
            </CCardHeader>
            <CCardBody>

              <CustomTable items={items} />
              <CPagination activePage={currentPage}
                           align='center'
                           limit={10}
                           pages={totalPage}
                           onActivePageChange={setCurrentPage}>
              </CPagination>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

    </>
  )
}


export default Approved;
