import {useState, useEffect, useCallback} from 'react'
import {apiGet} from "../util/Requests"

import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'

import ApproveModal from "./modals/ApproveModal";
const fields = ['id', 'image_url', 'number_of_sales', 'name', 'description',  'action']


const Waiting = () => {

  const [modal, setModal] = useState(false)
  const [items, setItems] = useState(null)
  const [approveItemId, setApproveItemId] = useState()

  // 심사 대기 카드 리스트 조회
  const fetchItems = async () => {
    try {
      const response = await apiGet('/papi/v1/templates?status=wait')
      setItems(response.data.results) // 데이터는 response.data 안에 들어있습니다.
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
    fetchItems()
  }, [])

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
                fields={fields}
                itemsPerPage={10}
                pagination
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
                        <img src={item.image_url} width='50px' height='50px' ></img>
                      </td>
                    ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

    </>
  )
}

export default Waiting
