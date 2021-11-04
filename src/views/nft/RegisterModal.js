import React, {useCallback} from "react";
import {
  CButton,
  CCard,
  CCardBody, CCardHeader, CCol, CDataTable,
  CForm, CFormGroup, CFormText, CInput, CInputRadio, CLabel,
  CModal,
  CModalBody, CModalFooter,
  CModalHeader,
  CModalTitle, CRow
} from "@coreui/react";

const RegisterModal = () => {
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
                  <CInput value={salePrice} onChange={e => {e.preventDefault(); setSalePrice(e.target.value); console.log(salePrice);}}
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
}

export default RegisterModal
