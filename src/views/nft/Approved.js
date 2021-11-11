import {useState, useEffect} from 'react';
import {apiGet} from "../util/Requests";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react';

import CustomTable from "./modals/CustomTable";

// ================================================
// NFT > 상품등록
// ================================================
const Approved = () => {

  const [items, setItems] = useState([])

  const fetchItems = async () => {
    try {
      const response = await apiGet('/papi/v1/templates?status=approved')
      setItems(response.data.results) // 데이터는 response.data 안에 들어있습니다.
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

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

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

    </>
  )
}


export default Approved;
