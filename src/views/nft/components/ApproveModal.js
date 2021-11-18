import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";

import {apiPatch} from "../../util/Requests";

const ApproveModal = ({modal, approveItemId, currentPage, fetchItems, onClose}) => {

  const approveNFT = () => {
    apiPatch(`/papi/v1/templates/${approveItemId}/approve`)
      .then(response => {
        console.log('approved');
        fetchItems(currentPage);
      })
      .catch(error => {
        if (!error.response && error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          console.log('요청이 실패했습니다.');
        }
      })
    onClose();
  }

  return (
    <CModal show={modal} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>심사 승인</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Id {approveItemId} 카드 발행을 승인합니다.
      </CModalBody>
      <CModalFooter>
        <CButton onClick={() => approveNFT()} color="primary">
          Approve
        </CButton>
        <CButton color="secondary" onClick={() => onClose(false)}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ApproveModal;
