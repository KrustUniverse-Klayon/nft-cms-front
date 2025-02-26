import {apiPostWithAuth} from "../../util/Requests";
import {
  CButton,
  CCard,
  CCardBody, CCol,
  CForm, CFormGroup, CFormText, CInput, CInputRadio, CLabel,
  CModal,
  CModalBody, CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";


const RegisterModal = ({modal, mintRecordId, inputs, onClose, onChange}) => {

  const {saleMethod, salePrice, saleBeginDate, saleEndDate,
         exchangeBeginDate, exchangeEndDate, rsAuthor, rsMarket} = inputs;

  const registerNFT = () => {

    // TODO: CMS user id
    const cmsUserId = 64

    apiPostWithAuth(
      `/papi/v1/products`,
      `${cmsUserId}`,
      {
        'mint_record_id': mintRecordId,
        'sale_method': saleMethod,
        'price': Number(salePrice),
        'royalty': Number(rsAuthor),
        'fees': Number(rsMarket),
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
    onClose();
  }

  return(
    <CModal show={modal} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>판매 정보 입력</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard>
          <CCardBody>
            <CForm method="post" encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>판매 방식</CLabel>
                </CCol>
                <CCol md="9">
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio custom id="sale-method-radio1"
                                 name="saleMethod"
                                 onChange={onChange}
                                 value="single_price"
                                 checked={saleMethod === 'single_price'}
                    />
                    <CLabel variant="custom-checkbox" htmlFor="sale-method-radio1">
                      지정 단일가
                    </CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio custom id="sale-method-radio2"
                                 name="saleMethod"
                                 onChange={onChange}
                                 value="auction"
                                 checked={saleMethod === 'auction'}
                    />
                    <CLabel variant="custom-checkbox" htmlFor="sale-method-radio2">
                      경매
                    </CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio custom id="sale-method-radio3"
                                 name="saleMethod"
                                 onChange={onChange}
                                 value="bonding"
                                 checked={saleMethod === 'bonding'}
                    />
                    <CLabel variant="custom-checkbox" htmlFor="sale-method-radio3">
                      본딩 커브
                    </CLabel>
                  </CFormGroup>
                </CCol>
              </CFormGroup>

              {/*
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>결제 수단</CLabel>
                </CCol>
                <CCol md="9">
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio custom id="sale-currency-radio1"
                                 name="saleCurrency"
                                 value="peb"
                                 onChange={onChange}
                                 checked={saleCurrency === 'peb'}
                    />
                    <CLabel variant="custom-checkbox" htmlFor="sale-currency-radio1">Klay</CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio custom id="sale-currency-radio2"
                                 name="saleCurrency"
                                 value="k-token"
                                 onChange={onChange}
                                 checked={saleCurrency === 'k-token'}
                    />
                    <CLabel variant="custom-checkbox" htmlFor="sale-currency-radio2">k-token</CLabel>
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              */}

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">판매 가격</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput value={salePrice} onChange={onChange}
                          name="salePrice" placeholder="" />
                  <CFormText>1 이상의 숫자를 입력하세요</CFormText>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="date-input">판매 시작일</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput value={saleBeginDate} onChange={onChange}
                          type="date" name="saleBeginDate" placeholder="date" />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="date-input">판매 종료일</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput value={saleEndDate} onChange={onChange}
                          type="date" name="saleEndDate" placeholder="date" />
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="date-input">교환 시작일</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput value={exchangeBeginDate} onChange={onChange}
                          type="date" name="exchangeBeginDate" placeholder="date" />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="date-input">교환 종료일</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput value={exchangeEndDate} onChange={onChange}
                          type="date" name="exchangeEndDate" placeholder="date" />
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">제작자 로열티(%)</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput value={rsAuthor} onChange={onChange}
                          name="rsAuthor" placeholder="" />
                  <CFormText>0 이상의 숫자를 입력하세요</CFormText>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">플랫폼 수수료(%)</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput value={rsMarket} onChange={onChange}
                          name="rsMarket" placeholder="" />
                  <CFormText>0 이상의 숫자를 입력하세요</CFormText>
                </CCol>
              </CFormGroup>

            </CForm>
          </CCardBody>
        </CCard>

      </CModalBody>
      <CModalFooter>
        <CButton onClick={() => registerNFT()} color="primary">
          Register
        </CButton>
        <CButton color="secondary" onClick={() => onClose()}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  )
};

export default RegisterModal;
