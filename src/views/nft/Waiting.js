import {useState, useEffect} from 'react'
import {apiGet} from "../util/Requests"

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable, CPagination,
  CRow
} from '@coreui/react'

import ApproveModal from "./modals/ApproveModal";


const Waiting = () => {

  const [approveItemId, setApproveItemId] = useState()
  const [modal, setModal] = useState(false)

  const pageSize = 10
  const [items, setItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  // 심사 대기 카드 리스트 조회
  const fetchItems = async (page=1) => {
    try {
      const response = await apiGet(`/papi/v1/templates?status=wait&page=${page}&size=${pageSize}`)
      setItems(response.data.results) // 데이터는 response.data 안에 들어있습니다.
      const paging = response.data.paging
      setCurrentPage(paging.current_page)
      setTotalPage(paging.total_page)

    } catch (e) {
      console.log(e)
    }
  }

  const onClose = () => {
    setModal(false);
  }

  // 심사 승인 모달 창 띄우기
  const showApproveModal = (itemId) => {
    setApproveItemId(itemId)
    setModal(true)
  }

  useEffect(() => {
    fetchItems(currentPage)
  }, [currentPage])

  return (
    <>
      <ApproveModal modal={modal}
                    approveItemId={approveItemId}
                    fetchItems={fetchItems}
                    onClose={onClose}/>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              심사 대기 카드 리스트
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={items}
                fields={['id', 'image_url', 'name', 'description',  'action']}
                scopedSlots = {{
                  'action':
                    (item)=>(
                      <td>
                        <CButton onClick={e => showApproveModal(item.id)}
                                color='warning'>
                          심사
                        </CButton>
                      </td>
                    ),
                  'image_url':
                    (item)=>(
                      <td>
                        <img src={item.image_url} width='50px' height='50px' alt=''></img>
                      </td>
                    ),
                }}
              />
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

export default Waiting
