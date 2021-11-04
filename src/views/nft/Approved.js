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
import {number} from "prop-types";

const fields = ['id', 'image_url', 'name', 'creator_id', 'number_of_sales', 'register']


const Tables = () => {

  const [modal, setModal] = useState(false)
  const [items, setItems] = useState()
  const [loading, setLoading] = useState(false)
  const [registerItemId, setRegisterItemId] = useState()

  const defaultInputs = {
    saleMethod: 'single_price',
    saleCurrency: 'peb',
    salePrice: '',
    saleBeginDate: '',
    saleEndDate: '',
    exchangeBeginDate: '',
    exchangeEndDate: '',
    rsAuthor: 2.5,
    rsMarket: 2.5,
    registerNumberOfSales: 1
  }

  const [inputs, setInputs] = useState(defaultInputs)
  const {
    saleMethod,
    saleCurrency,
    salePrice,
    saleBeginDate,
    saleEndDate,
    exchangeBeginDate,
    exchangeEndDate,
    rsAuthor,
    rsMarket,
    registerNumberOfSales} = inputs

  const onChange = (e) => {
    const {value, name} = e.target
    console.log(name, value)
    setInputs({
      ...inputs,
      [name]: value
    })
  }

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

  const showRegisterModal = (itemId, number_of_sales) => {
    setRegisterItemId(itemId)
    //setRegisterNumberOfSales(number_of_sales)
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
        'price': Number(salePrice),
        'royalty': rsAuthor/100,
        'fees': rsMarket/100,
        'sale_count': Number(registerNumberOfSales),
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

  // TODO: RegisterModal 파일 분리후 props로 내부 변수 전달하기

  return (
    <>
      <RegisterModal modal={modal} setModal={setModal}
                     registerNFT={registerNFT} onChange={onChange}
                     inputs={inputs}/>
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

const RegisterModal = (props) => {

    const {
      saleMethod,
      saleCurrency,
      salePrice,
      saleBeginDate,
      saleEndDate,
      exchangeBeginDate,
      exchangeEndDate,
      rsAuthor,
      rsMarket,
      registerNumberOfSales} = props.inputs

    return(
      <CModal
        show={props.modal}
        onClose={props.setModal}
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
                                   name="saleMethod"
                                   onChange={props.onChange}
                                   value="single_price"
                                   checked={saleMethod === 'single_price'}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="sale-method-radio1">지정 단일가</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="sale-method-radio2"
                                   name="saleMethod"
                                   onChange={props.onChange}
                                   value="auction"
                                   checked={saleMethod === 'auction'}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="sale-method-radio2">경매</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="sale-method-radio3"
                                   name="saleMethod"
                                   onChange={props.onChange}
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
                                   name="saleCurrency"
                                   value="peb"
                                   onChange={props.onChange}
                                   checked={saleCurrency === 'peb'}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="sale-currency-radio1">Klay</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="sale-currency-radio2"
                                   name="saleCurrency"
                                   value="k-token"
                                   onChange={props.onChange}
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
                    <CInput value={salePrice} onChange={props.onChange}
                            name="salePrice" placeholder="" />
                    <CFormText>1 이상의 숫자를 입력하세요</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">판매 개수</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={registerNumberOfSales} onChange={props.onChange}
                            name="registerNumberOfSales" placeholder="" />
                    <CFormText>1 이상의 숫자를 입력하세요</CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">판매 시작일</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={saleBeginDate} onChange={props.onChange}
                            type="date" name="saleBeginDate" placeholder="date" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">판매 종료일</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={saleEndDate} onChange={props.onChange}
                            type="date" name="saleEndDate" placeholder="date" />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">교환 시작일</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={exchangeBeginDate} onChange={props.onChange}
                            type="date" name="exchangeBeginDate" placeholder="date" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">교환 종료일</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={exchangeEndDate} onChange={props.onChange}
                            type="date" name="exchangeEndDate" placeholder="date" />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">제작자 로열티(%)</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={rsAuthor} onChange={props.onChange}
                            name="rsAuthor" placeholder="" />
                    <CFormText>0 이상의 숫자를 입력하세요</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">플랫폼 수수료(%)</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={rsMarket} onChange={props.onChange}
                            name="rsMarket" placeholder="" />
                    <CFormText>0 이상의 숫자를 입력하세요</CFormText>
                  </CCol>
                </CFormGroup>

              </CForm>
            </CCardBody>
          </CCard>

        </CModalBody>
        <CModalFooter>
          <CButton
            onClick={() => props.registerNFT()}
            color="primary">Register</CButton>
          <CButton
            color="secondary"
            onClick={() => props.setModal(false)}
          >Cancel</CButton>
        </CModalFooter>
      </CModal>
    )
  };

export default Tables
