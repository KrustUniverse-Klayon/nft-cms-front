import React, {useState, useRef} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm, CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText, CLabel,
  CRow, CValidFeedback, CInvalidFeedback, CInputGroupAppend
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Register = () => {

  const defaultInputs = {
    email: '',
    password: '',
    rePassword: ''
  }
  const defaultInvalids = {
    emailInvalid: false,
    passwordInvalid: false,
    rePasswordInvalid: false
  }

  const [inputs, setInputs] = useState(defaultInputs)
  const [invalids, setInvalids] = useState(defaultInvalids)

  const { email, password, rePassword } = inputs
  const { emailInvalid, passwordInvalid, rePasswordInvalid} = invalids

  const emailInput = useRef()
  const passwordInput = useRef()
  const rePasswordInput = useRef()

  const onChange = (e) => {
    const {value, name} = e.target
    setInputs({
      ...inputs,
      [name]: value
    })
    setInvalids(defaultInvalids)
  }

  const onReset = () => {
    setInputs(defaultInputs)
    setInvalids(defaultInvalids)
  }

  const emailValidation = () => {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if(!email || regex.test(email) === false){
      return false
    }
    return true
  }

  const passwordValidation = () => {
    const re = {
      'alphabet' : /[a-zA-Z]/,
      'digit'   : /[0-9]/,
      'full'    : /^.{8,32}$/
    }
    return re.alphabet.test(password) &&
           re.digit.test(password) &&
           re.full.test(password)
  }

  const createAccount = () => {
    if (!emailValidation()) {
      setInvalids({
        ...invalids,
        emailInvalid: true
      })
      emailInput.current.focus()
      return
    }

    if (!passwordValidation()) {
      setInvalids({
          ...invalids,
        passwordInvalid: true
      })
      passwordInput.current.focus()
      return
    }

    if (password !== rePassword) {
      setInvalids({
        ...invalids,
        rePasswordInvalid: true
      })
      rePasswordInput.current.focus()
    }

    // TODO: 가입 API 호출
  }

  return (

    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>

                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-envelope-closed" />
                      </CInputGroupText>
                    </CInputGroupPrepend>

                    <CInput invalid={emailInvalid} value={email} name='email' onChange={onChange}
                            type="text" placeholder="Email" autoComplete="email"
                            innerRef={emailInput} />
                    <CInvalidFeedback>이메일 형식이 아닙니다.</CInvalidFeedback>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput invalid={passwordInvalid} value={password} name='password'
                            onChange={onChange}
                            type="password" placeholder="Password" autoComplete="new-password"
                            innerRef={passwordInput} />
                    <CInvalidFeedback>숫자, 영문자를 포함하여 8자 이상을 적어주세요.</CInvalidFeedback>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput invalid={rePasswordInvalid} value={rePassword} name='rePassword'
                            onChange={onChange}
                            type="password" placeholder="Repeat password" autoComplete="new-password"
                            innerRef={rePasswordInput} />
                    <CInvalidFeedback>입력한 패스워드와 다릅니다. 확인 후 다시 입력해 주세요.</CInvalidFeedback>
                  </CInputGroup>
                  <CButton color="success"
                           onClick={createAccount} block>Create Account</CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
