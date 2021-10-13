import React, {useState, useEffect} from 'react'
import axios from 'axios'

import {
  CBadge, CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable, CForm, CFormGroup, CFormText, CInput, CInputRadio, CLabel,
  CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
  CRow
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

import {apiGetWithAuth, apiPatch, apiPostWithAuth} from "../util/Requests"



const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['name', 'description', 'image_url']




const Tables = () => {

  const [modal, setModal] = useState(false)
  const [items, setItems] = useState()
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(10010)
  const [registerItemId, setRegisterItemId] = useState()
  const [saleMethod, setSaleMethod] = useState('single_price')
  const [saleCurrency, setSaleCurrency] = useState('peb')
  const [salePrice, setSalePrice] = useState()
  const [saleBeginDate, setSaleBeginDate] = useState()
  const [saleEndDate, setSaleEndDate] = useState()
  const [exchangeBeginDate, setExchangeBeginDate] = useState()
  const [exchangeEndDate, setExchangeEndDate] = useState()


  const changeSaleMethod = (e) => {
    setSaleMethod(e.target.value)
  }

  const showRegisterModel = itemId => {
    setRegisterItemId(itemId)
    setModal(true)
  }

  const fetchItems = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setItems(null);
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      const response = await apiGetWithAuth(
        `/api/v1/users/${userId}/nfts`,
        `${userId}`,
        )
      setItems(response.data.items); // 데이터는 response.data 안에 들어있습니다.
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  const registerNFT = templateId => {

    apiPostWithAuth(
      `/api/v1/products/`,
      `${userId}`,
      {
        'ntf_id': templateId,
        'sale_method': saleMethod,
        'price': salePrice,
        'sale_end_at': saleEndDate+'T00:00:00.000Z',
      }
    )
      .then(response => {
        console.log('registered')
        //fetchItems();
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
    if (userId > 0) {
      fetchItems();
    }

  }, []);


  return (
    <>
      <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">

        <CFormGroup row>
          <CCol md="1">
            <CLabel htmlFor="text-input">유저 ID</CLabel>
          </CCol>
          <CCol xs="3" md="2">
            <CInput value={userId} onChange={e => setUserId(e.target.value)}
                    name="text-input" placeholder="" />
            <CFormText>숫자를 입력하세요</CFormText>
          </CCol>
          <CCol xs="3" md="2">
            <CButton
              onClick={() => fetchItems()}
              color="primary">조회</CButton>
          </CCol>
        </CFormGroup>
      </CForm>

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
                  <CModalTitle>판매 정보 입력</CModalTitle>
                </CModalHeader>
                <CModalBody>

                  <CCard>
                    <CCardBody>
                      <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">

                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel>판매 방식</CLabel>
                          </CCol>
                          <CCol md="9">
                            <CFormGroup variant="custom-radio" inline>
                              <CInputRadio custom id="sale-method-radio1"
                                           name="sale-method-radios"
                                           onChange={changeSaleMethod}
                                           value="single_price"
                                           checked={saleMethod === 'single_price'}
                              />
                              <CLabel variant="custom-checkbox" htmlFor="sale-method-radio1">지정 단일가</CLabel>
                            </CFormGroup>
                            <CFormGroup variant="custom-radio" inline>
                              <CInputRadio custom id="sale-method-radio2"
                                           name="sale-method-radios"
                                           onChange={changeSaleMethod}
                                           value="auction"
                                           checked={saleMethod === 'auction'}
                              />
                              <CLabel variant="custom-checkbox" htmlFor="sale-method-radio2">경매</CLabel>
                            </CFormGroup>
                            <CFormGroup variant="custom-radio" inline>
                              <CInputRadio custom id="sale-method-radio3"
                                           name="sale-method-radios"
                                           onChange={changeSaleMethod}
                                           value="bonding"
                                           checked={saleMethod === 'bonding'}
                              />
                              <CLabel variant="custom-checkbox" htmlFor="sale-method-radio3">본딩 커브</CLabel>
                            </CFormGroup>
                          </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel>결제 수단</CLabel>
                          </CCol>
                          <CCol md="9">
                            <CFormGroup variant="custom-radio" inline>
                              <CInputRadio custom id="sale-currency-radio1"
                                           name="sale-currency-radios"
                                           value="peb"
                                           onChange={e => setSaleCurrency(e.target.value)}
                                           checked={saleCurrency === 'peb'}
                              />
                              <CLabel variant="custom-checkbox" htmlFor="sale-currency-radio1">Klay</CLabel>
                            </CFormGroup>
                            <CFormGroup variant="custom-radio" inline>
                              <CInputRadio custom id="sale-currency-radio2"
                                           name="sale-currency-radios"
                                           value="k-token"
                                           onChange={e => setSaleCurrency(e.target.value)}
                                           checked={saleCurrency === 'k-token'}
                              />
                              <CLabel variant="custom-checkbox" htmlFor="sale-currency-radio2">k-token</CLabel>
                            </CFormGroup>
                          </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel htmlFor="text-input">판매 가격</CLabel>
                          </CCol>
                          <CCol xs="12" md="9">
                            <CInput value={salePrice} onChange={e => setSalePrice(e.target.value)}
                                    name="text-input" placeholder="" />
                            <CFormText>1 이상의 숫자를 입력하세요</CFormText>
                          </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel htmlFor="date-input">판매 시작일</CLabel>
                          </CCol>
                          <CCol xs="12" md="9">
                            <CInput value={saleBeginDate} onChange={e => setSaleBeginDate(e.target.value)}
                                    type="date" name="date-input" placeholder="date" />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel htmlFor="date-input">판매 종료일</CLabel>
                          </CCol>
                          <CCol xs="12" md="9">
                            <CInput value={saleEndDate} onChange={e => setSaleEndDate(e.target.value)}
                                    type="date" id="date-input" name="date-input" placeholder="date" />
                          </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel htmlFor="date-input">교환 시작일</CLabel>
                          </CCol>
                          <CCol xs="12" md="9">
                            <CInput value={exchangeBeginDate} onChange={e => setExchangeBeginDate(e.target.value)}
                                    type="date" id="date-input" name="date-input" placeholder="date" />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel htmlFor="date-input">교환 종료일</CLabel>
                          </CCol>
                          <CCol xs="12" md="9">
                            <CInput value={exchangeEndDate} onChange={e => setExchangeEndDate(e.target.value)}
                                    type="date" id="date-input" name="date-input" placeholder="date" />
                          </CCol>
                        </CFormGroup>
                      </CForm>
                    </CCardBody>

                  </CCard>




                </CModalBody>
                <CModalFooter>
                  <CButton
                    onClick={() => registerNFT(`${registerItemId}`)}
                    color="primary">Register</CButton>
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
