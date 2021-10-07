import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'

const BasicForms = () => {
  const [collapsed, setCollapsed] = React.useState(true)
  const [showElements, setShowElements] = React.useState(true)

  return (
    <>


      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              판매 정보 입력
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">템플릿 ID</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="text-input" placeholder="" />
                    </CCol>
                </CFormGroup>


                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>판매 방식</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="sales-method-radio1" name="sales-method-radios" value="fixed" checked />
                      <CLabel variant="custom-checkbox" htmlFor="sales-method-radio1">지정 단일가</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="sales-method-radio2" name="sales-method-radios" value="auction" disabled />
                      <CLabel variant="custom-checkbox" htmlFor="sales-method-radio2">경매</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="sales-method-radio3" name="sales-method-radios" value="bonding_curve" disabled />
                      <CLabel variant="custom-checkbox" htmlFor="sales-method-radio3">본딩 커브</CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>결제 수단</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="sales-currency-radio1" name="sales-currency-radios" value="peb" checked />
                      <CLabel variant="custom-checkbox" htmlFor="sales-currency-radio1">Klay</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="sales-currency-radio2" name="sales-currency-radios" value="k-token" />
                      <CLabel variant="custom-checkbox" htmlFor="sales-currency-radio2">k-token</CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">판매 가격</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="text-input" placeholder="" />
                    <CFormText>1 이상의 숫자를 입력하세요</CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">판매 시작일</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="date" id="date-input" name="date-input" placeholder="date" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">판매 종료일</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="date" id="date-input" name="date-input" placeholder="date" />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">교환 시작일</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="date" id="date-input" name="date-input" placeholder="date" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">교환 종료일</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="date" id="date-input" name="date-input" placeholder="date" />
                  </CCol>
                </CFormGroup>


              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>


        </CCol>


      </CRow>

    </>
  )
}

export default BasicForms
