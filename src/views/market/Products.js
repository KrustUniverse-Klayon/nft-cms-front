import React, {useState, useEffect} from 'react'
import {apiGet, apiPostWithAuth} from "../util/Requests"

import {
  CBadge, CButton,
  CLink,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable, CForm, CFormGroup, CFormText, CInput, CInputRadio, CLabel,
  CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
  CRow
} from '@coreui/react'

const fields = ['product_id','name', 'image_url', 'price', 'currency',
                'sale_method', 'sale_begin_at', 'sale_end_at']


const Tables = () => {

  const [modal, setModal] = useState(false)
  const [items, setItems] = useState()
  const [loading, setLoading] = useState(false)
  const [purchaseProductId, setPurchaseProductId] = useState()
  const [userId, setUserId] = useState(10010)

  const fetchItems = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setItems(null);
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      const response = await apiGet('/papi/v1/products')
      setItems(response.data.results); // 데이터는 response.data 안에 들어있습니다.
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  const showPurchaseModel = itemId => {
    setPurchaseProductId(itemId)
    setModal(true)
  }

  const purchaseNFT = () => {

    apiPostWithAuth(
      `/api/v1/products/${purchaseProductId}/purchase`,
      `${userId}`,
      {
        'count': 1,
      },
    )
      .then(response => {
        console.log('purchase')
        fetchItems()
      })
      .catch(error => {
        if (!error.response && error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          console.log('요청이 실패했습니다.')
        }
      })
    setModal(false)
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const TmpModal = () => {
    return (
      <CModal
        show={modal}
        onClose={setModal}
      >
        <CModalHeader closeButton>
          <CModalTitle>구매 정보 입력 (데모용 임시 페이지)</CModalTitle>
        </CModalHeader>
        <CModalBody>

          <CCard>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">유저 ID</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={userId} onChange={e => setUserId(e.target.value)}
                            name="text-input" placeholder="" />
                    <CFormText>숫자를 입력하세요</CFormText>
                  </CCol>
                </CFormGroup>


              </CForm>
            </CCardBody>
          </CCard>

        </CModalBody>
        <CModalFooter>
          <CButton
            onClick={() => purchaseNFT()}
            color="primary">Purchase</CButton>
          <CButton
            color="secondary"
            onClick={() => setModal(false)}
          >Cancel</CButton>
        </CModalFooter>
      </CModal>
    )
  }

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              마켓에 노출되는 상품 리스트
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={items}
                fields={fields}
                itemsPerPage={10}
                pagination
                scopedSlots = {{
                  'name':
                    (item)=>(
                      <td>
                        <CLink onClick={() => showPurchaseModel(item.product_id)}>
                          {item.name}
                        </CLink>
                      </td>
                    ),
                  'image_url':
                    (item)=>(
                      <td>
                        <img src={item.image_url} width='50px' height='50px' alt='' />
                      </td>
                    ),
                  'sale_begin_at':
                    (item)=>(
                      <td>
                        {item.sale_begin_at.slice(0, 10)}
                      </td>
                    ),
                  'sale_end_at':
                    (item)=>(
                      <td>
                        {item.sale_end_at.slice(0, 10)}
                      </td>
                    ),

                }}
              />

              <TmpModal></TmpModal>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

    </>
  )
}

export default Tables
