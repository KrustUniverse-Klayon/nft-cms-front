import React, {useState} from "react";
import {
  CForm,
  CButton,
  CCol, CCollapse,
  CDataTable, CFormGroup, CInput, CLabel,
} from '@coreui/react';
import {apiGet, apiPost} from "../../util/Requests";
import RegisterModal from "./RegisterModal";
import MintingModal from "./MintingModal";

const getBadge = status => {
  switch (status) {
    case 'wait': return '민팅 대기'
    case 'completed': return '민팅 완료'
    case 'Pending': return '상품 등록 완료'
    default: return 'primary'
  }
}

const CustomTable = (props) => {
  const items = props.items

  const [registerModal, setRegisterModal] = useState(false)
  const [mintingModal, setMintingModal] = useState(false)

  const [detailContent, setDetailContent] = useState()
  const [modalItemId, setModalItemId] = useState()
  const [newMintCount, setNewMintCount] = useState(1)

  // minting
  const [mintingTryNo, setMintingTryNo] = useState()
  const [mintingCount, setMintingCount] = useState()

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

  const registerMintRecord = (itemId) => {
    apiPost(
      `/papi/v1/templates/${itemId}/mint-records`,
      {
        'number_of_mints': newMintCount,
      }
    )
      .then(response => {
        console.log('registered')
        fetchMintRecords(itemId);
      })
      .catch(error => {
        if (!error.response && error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          console.log('요청이 실패했습니다.')
        }
      })
  }


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



  const showRegisterModal = (item) => {
    setModalItemId(item.template_id)
    setRegisterModal(true)
  }

  const showMintingModal = (item) => {
    setModalItemId(item.template_id)
    setMintingTryNo(item.try_of_mints)
    setMintingCount(item.number_of_mints)
    setMintingModal(true)
  }

  const fetchMintRecords = async (itemId) => {
    try {
      const response = await apiGet(`/papi/v1/templates/${itemId}/mint-records`)
      const items = response.data.results

      if (items.length === 0) {
        setDetailContent(<></>)
      } else {
        setDetailContent(
          <CDataTable
            items={items}
            fields={['try_of_mints', 'number_of_mints', 'created_at', 'status', 'action']}
            itemsPerPage={100}
            border={true}
            outlined={true}
            scopedSlots = {{
              'created_at':
                (item)=>(
                  <td>
                    {item.created_at.slice(0, 10)}
                  </td>
                ),
              'status':
                (item)=>(
                  <td>
                    {getBadge(item.status)}
                  </td>
                ),
              'action':
                (item)=>(
                  <td>
                    <CButton color="success" hidden={item.status !== 'wait'}
                             onClick={() => showMintingModal(item)}>
                      민팅
                    </CButton>
                    <CButton color="info" hidden={item.status === 'wait'}
                             onClick={() => showRegisterModal(item)}>
                      등록
                    </CButton>
                  </td>
                ),
            }}
          />)
      }



    } catch (e) {
      console.log(e)
    }
  }

  const [accordion, setAccordion] = useState(0)
  const showAccordion = (e) => {
    const itemId = Number(e.target.value)
    fetchMintRecords(itemId)
    setAccordion(accordion === itemId ? null : itemId)
  }

  const MyCollapse = (item) => {

    return (
      <>
        <td></td>
        <td colSpan="5">
          <CCollapse show={true}>
            {detailContent}
            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">

              <CFormGroup row>
                <CCol md="6"></CCol>
                <CCol md="1">
                  <CLabel htmlFor="text-input">발행 개수</CLabel>
                </CCol>
                <CCol md="2">
                  <CInput value={newMintCount} onChange={(e) => setNewMintCount(e.target.value)}
                          name="newMintCount" placeholder=""/>
                </CCol>
                <CCol md="3">
                  <CButton color="warning" onClick={() => registerMintRecord(accordion)}>
                    새 차수 등록
                  </CButton>
                </CCol>
              </CFormGroup>
            </CForm>

          </CCollapse>
        </td>
      </>)
  }


  const rendering = (items) => {
    const result = [];


    for (let i = 0; i < items.length; i++) {

      const item = items[i];

      result.push(
        <tr>
          <td>{item.id}</td>
          <td><img
            src={item.image_url}
            width="50px" height="50px" alt=''></img></td>
          <td>{item.name}</td>
          <td>{item.creator_id}</td>
          <td>
            <CButton color="light" value={item.id} onClick={showAccordion}>
              상세
            </CButton>
          </td>
        </tr>);

      result.push(
          <tr>
            {accordion === item.id ? <MyCollapse></MyCollapse> : null}
          </tr>
      )
    }
    return result
  }

  return (
    <>
      <RegisterModal modal={registerModal}
                     registerItemId={modalItemId}
                     onChange={onChange}
                     onClose={handleRegisterModalOnClose}
                     inputs={inputs}/>
      <MintingModal modal={mintingModal}
                    mintingItemId={modalItemId}
                    mintingTryNo={mintingTryNo}
                    mintingCount={mintingCount}
                    fetchMintRecords={fetchMintRecords}
                    onClose={handleMintingModalOnClose}/>

      <div className="position-relative table-responsive">
        <table className="table">
          <thead>
          <tr>
            <th className="" style={{verticalAlign: 'middle', overflow: 'hidden'}}>
              <div className="d-inline">Id</div>
            </th>
            <th className="" style={{verticalAlign: 'middle', overflow: 'hidden'}}>
              <div className="d-inline">Image Url</div>
            </th>
            <th className="" style={{verticalAlign: 'middle', overflow: 'hidden'}}>
              <div className="d-inline">Name</div>
            </th>
            <th className="" style={{verticalAlign: 'middle', overflow: 'hidden'}}>
              <div className="d-inline">Creator Id</div>
            </th>
            <th className="" style={{verticalAlign: 'middle', overflow: 'hidden'}}>
              <div className="d-inline">View</div>
            </th>
          </tr>



          </thead>
          <tbody>
          {rendering(items)}
          </tbody>
        </table>
      </div>
    </>)
}


export default CustomTable;
