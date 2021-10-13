import React, {useState, useEffect} from 'react'
import axios from 'axios'

import {
  CBadge, CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
  CRow
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

import {apiGet, apiPatch, apiPost} from "../util/Requests"



const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['id', 'name', 'description', 'image_url', 'status']




const Tables = () => {

  const [modal, setModal] = useState(false)
  const [items, setItems] = useState()
  const [loading, setLoading] = useState(false)
  const [approveItemId, setApproveItemId] = useState()

  const showApproveModel = itemId => {
    console.log(itemId)
    setApproveItemId(itemId)
    setModal(true)
  }

  const fetchItems = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setItems(null);
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      const response = await apiGet('/papi/v1/templates?status=wait')
      setItems(response.data.data); // 데이터는 response.data 안에 들어있습니다.
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  const approveNFT = itemId => {
    apiPatch(`/papi/v1/templates/${itemId}/approve`)
      .then(response => {
        console.log('approved')
        apiPost(`/api/v1/nfts/mint`,
          {'template_id': parseInt(`${itemId}`)})
          .then(response => {
            console.log('mint success!!')
          })
        fetchItems();
      })
      .catch(error => {
        if (!error.response && error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          console.log('요청이 실패했습니다.');
        }
      })
    setModal(false)
  }

  useEffect(() => {
    fetchItems();
  }, []);


  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              심사 대기 카드 리스트
              <DocsLink name="CModal"/>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={items}
                fields={fields}
                itemsPerPage={10}
                pagination
                scopedSlots = {{
                  'status':
                    (item)=>(
                      <td>
                        <CBadge onClick={() => showApproveModel(item.id)}
                                color={getBadge(item.status)}>
                          {item.status}
                        </CBadge>
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


              <CModal
                show={modal}
                onClose={setModal}
              >
                <CModalHeader closeButton>
                  <CModalTitle>심사 승인</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  Id {approveItemId} 카드 발행을 승인합니다.
                </CModalBody>
                <CModalFooter>
                  <CButton
                    onClick={() => approveNFT(`${approveItemId}`)}
                    color="primary">Approve</CButton>
                  <CButton
                    color="secondary"
                    onClick={() => setModal(false)}
                  >Cancel</CButton>
                </CModalFooter>
              </CModal>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

    </>
  )
}

export default Tables
