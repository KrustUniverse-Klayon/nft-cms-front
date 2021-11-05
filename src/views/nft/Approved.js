import React, {useState, useEffect} from 'react';
import {apiGet, apiPost} from "../util/Requests";

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react';

import RegisterModal from "./RegisterModal";
const fields = ['id', 'image_url', 'name', 'creator_id', 'number_of_sales', 'register'];


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
    //console.log(name, value)
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const onClose = () => {
    setInputs(defaultInputs);
    setModal(false);
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



  useEffect(() => {
    fetchItems()
  }, [])

  // TODO: RegisterModal 파일 분리후 props로 내부 변수 전달하기

  return (
    <>
      <RegisterModal modal={modal}
                     registerItemId={registerItemId}
                     onChange={onChange}
                     onClose={onClose}
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


export default Tables
