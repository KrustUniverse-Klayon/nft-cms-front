import React, {useState, useEffect} from 'react'

import {
  CBadge, CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
  CRow
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

import {apiGet, apiPatch} from "../util/Requests"



const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['product_id','name', 'image_url', 'price', 'currency',
                'sale_method', 'sale_begin_at', 'sale_end_at']




const Tables = () => {

  const [modal, setModal] = useState(false)
  const [items, setItems] = useState()
  const [loading, setLoading] = useState(false)
  const [approveItemId, setApproveItemId] = useState()

  const showApproveModel = itemId => {
    console.log(itemId)
    setApproveItemId(itemId)
    setModal(true)
  }

  const fetchItems = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setItems(null);
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      const response = await apiGet('/papi/v1/products')
      setItems(response.data.products); // 데이터는 response.data 안에 들어있습니다.
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }


  useEffect(() => {
    fetchItems();
  }, []);


  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              심사 대기 카드 리스트
              <DocsLink name="CModal"/>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={items}
                fields={fields}
                itemsPerPage={10}
                pagination
                scopedSlots = {{
                  'status':
                    (item)=>(
                      <td>
                        <CBadge onClick={() => showApproveModel(item.id)}
                                color={getBadge(item.status)}>
                          {item.status}
                        </CBadge>
                      </td>
                    ),
                  'image_url':
                    (item)=>(
                      <td>
                        <img src={item.image_url} width='50px' height='50px' alt='' />
                      </td>
                    ),
                  'sale_begin_at':
                    (item)=>(
                      <td>
                        {item.sale_begin_at.slice(0, 10)}
                      </td>
                    ),
                  'sale_end_at':
                    (item)=>(
                      <td>
                        {item.sale_end_at.slice(0, 10)}
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
