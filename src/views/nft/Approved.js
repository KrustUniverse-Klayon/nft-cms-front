import {useState, useEffect} from 'react';
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

import RegisterModal from "./modals/RegisterModal";
import MintingModal from "./modals/MintingModal";
const fields = ['id', 'image_url', 'name', 'creator_id', 'number_of_sales', 'register'];

// ================================================
// NFT > 상품등록
// ================================================
const Approved = () => {

  const [registerModal, setRegisterModal] = useState(false)
  const [mintingModal, setMintingModal] = useState(false)
  const [items, setItems] = useState(null)
  const [modalItemId, setModalItemId] = useState()

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

  const onChange = (e) => {
    const {value, name} = e.target
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const handleRegisterModalOnClose = () => {
    setInputs(defaultInputs);
    setRegisterModal(false);
  }

  const handleMintingModalOnClose = () => {
    setMintingModal(false);
  }

  const fetchItems = async () => {
    try {
      const response = await apiGet('/papi/v1/templates?status=approved')
      setItems(response.data.results) // 데이터는 response.data 안에 들어있습니다.
    } catch (e) {
      console.log(e)
    }
  }

  const showRegisterModal = (itemId, number_of_sales) => {
    setModalItemId(itemId)
    //setRegisterNumberOfSales(number_of_sales)
    setRegisterModal(true)
  }

  const showMintingModal = (itemId) => {
    setModalItemId(itemId)
    setMintingModal(true)
  }



  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <>
      <RegisterModal modal={registerModal}
                     registerItemId={modalItemId}
                     onChange={onChange}
                     onClose={handleRegisterModalOnClose}
                     inputs={inputs}/>
      <MintingModal modal={mintingModal}
                     mintingItemId={modalItemId}
                     onClose={handleMintingModalOnClose}/>
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
                        <CButton color="warning" onClick={() => showMintingModal(item.id)}>
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


export default Approved
