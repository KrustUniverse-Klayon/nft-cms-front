import React, {useState, useEffect, useCallback} from 'react'
import {apiGet, apiPost, apiPostWithAuth} from "../util/Requests"

import {
  CLink, CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDataTable,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CInputRadio,
  CLabel,
  CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
  CRow
} from '@coreui/react'

const fields = ['id', 'image_url', 'name', 'creator_id', 'number_of_sales', 'register']


const Tables = () => {

  const [modal, setModal] = useState(false)
  const [items, setItems] = useState()
  const [loading, setLoading] = useState(false)
  const [registerItemId, setRegisterItemId] = useState()

  const [saleMethod, setSaleMethod] = useState('single_price')
  const [saleCurrency, setSaleCurrency] = useState('peb')
  const [salePrice, setSalePrice] = useState()
  const [saleBeginDate, setSaleBeginDate] = useState()
  const [saleEndDate, setSaleEndDate] = useState()
  const [exchangeBeginDate, setExchangeBeginDate] = useState()
  const [exchangeEndDate, setExchangeEndDate] = useState()
  const [rsAuthor, setRsAuthor] = useState(2.5)
  const [rsMarket, setRsMarket] = useState(2.5)
  const [registerNumberOfSales, setRegisterNumberOfSales] = useState(1)

  const fetchItems = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setItems(null)
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)
      const response = await apiGet('/papi/v1/templates?status=approved')
      setItems(response.data.results) // 데이터는 response.data 안에 들어있습니다.
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  const changeSaleMethod = (e) => {
    setSaleMethod(e.target.value)
  }

  const showRegisterModal = (itemId, number_of_sales) => {
    setRegisterItemId(itemId)
    setRegisterNumberOfSales(number_of_sales)
    setModal(true)
  }

  // NFT 민팅 - template 에 세팅된 number_of_sales 개수 만큼
  const mintNFT = (templateId) => {
    apiPost(`/papi/v1/nfts/mint/bulk`,{},
      { params: {'template_id': parseInt(templateId)}})
      .then(response => {
        console.log('mint success!!')
      })
  }

  const registerNFT = () => {
    apiPostWithAuth(
      `/papi/v1/products/`,
      '10020',
      {
        'template_id': registerItemId,
        'sale_method': saleMethod,
        'price': salePrice,
        'royalty': rsAuthor,
        'fees': rsMarket,
        'sale_count': registerNumberOfSales,
        'sale_begin_at': saleBeginDate+'T00:00:00.000Z',
        'sale_end_at': saleEndDate+'T00:00:00.000Z',
        'exchange_begin_at': exchangeBeginDate+'T00:00:00.000Z',
        'exchange_end_at': exchangeEndDate+'T00:00:00.000Z'
      }
    )
      .then(response => {
        console.log('registered')
        //fetchItems();
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

  const RegisterModal = useCallback(() => {
    return(
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
                    <CInput value={salePrice} onChange={e => {e.preventDefault();  setSalePrice(e.target.value); console.log(salePrice);}}
                            name="text-input" placeholder="" />
                    <CFormText>1 이상의 숫자를 입력하세요</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">판매 개수</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={registerNumberOfSales} onChange={e => setRegisterNumberOfSales(e.target.value)}
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

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">제작자 로열티(%)</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={rsAuthor} onChange={e => setRsAuthor(e.target.value)}
                            name="text-input" placeholder="" />
                    <CFormText>0 이상의 숫자를 입력하세요</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">플랫폼 수수료(%)</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={rsMarket} onChange={e => setRsMarket(e.target.value)}
                            name="text-input" placeholder="" />
                    <CFormText>0 이상의 숫자를 입력하세요</CFormText>
                  </CCol>
                </CFormGroup>

              </CForm>
            </CCardBody>
          </CCard>

        </CModalBody>
        <CModalFooter>
          <CButton
            onClick={() => registerNFT()}
            color="primary">Register</CButton>
          <CButton
            color="secondary"
            onClick={() => setModal(false)}
          >Cancel</CButton>
        </CModalFooter>
      </CModal>
    )
  }, [registerItemId, setRegisterItemId]);

  console.log('b')
  return (
    <>
      <RegisterModal />
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              상품 등록 대기 카드 리스트
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={items}
                fields={fields}
                itemsPerPage={10}
                pagination
                scopedSlots = {{
                  'register':
                    (item)=>(
                      <td>
                        <CButton color="warning" onClick={() => mintNFT(item.id)}>
                          민팅
                        </CButton>
                        <CButton color="secondary"
                                 onClick={() => showRegisterModal(item.id, item.number_of_sales)}>
                          등록
                        </CButton>
                      </td>
                    ),
                  'image_url':
                    (item)=>(
                      <td>
                        <img src={item.image_url} width='50px' height='50px' />
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

export default Tables
