import React, {useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText, CInvalidFeedback,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Login = () => {

  const defaultInputs = {
    email: '',
    password: ''
  }
  const defaultInvalids = {
    emailInvalid: false,
    passwordInvalid: false
  }

  const [inputs, setInputs] = useState(defaultInputs)
  const [invalids, setInvalids] = useState(defaultInvalids)

  const { email, password } = inputs
  const { emailInvalid, passwordInvalid } = invalids

  const emailInput = useRef()
  const passwordInput = useRef()

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

  const loginAccount = () => {
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

    // TODO: login API 호출

    onReset()
  }


  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
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
                    <CInputGroup className="mb-4">
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
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4"
                                 onClick={loginAccount}>Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
