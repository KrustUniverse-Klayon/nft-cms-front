import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";

import {apiPatch, apiPost} from "../../util/Requests";

const MintingModal = (props) => {

  // NFT 민팅 - template 에 세팅된 number_of_sales 개수 만큼
  const mintNFT = () => {
    apiPost(`/papi/v1/nfts/mint`,{},
      { params: {'template_id': props.mintingItemId,
                         'try_of_mints': props.mintingTryNo}})
      .then(response => {
        console.log('mint success!!')
        props.fetchMintRecords(props.mintingItemId)
      })
    props.onClose();
  }

  return (
    <CModal
      show={props.modal}
      onClose={props.onClose}
    >
      <CModalHeader closeButton>
        <CModalTitle>심사 승인</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Id {props.mintingItemId} 카드의 {props.mintingTryNo} 차수 {props.mintingCount} 개를 민팅하시겠습니까?
      </CModalBody>
      <CModalFooter>
        <CButton
          onClick={() => mintNFT()}
          color="primary">Yes</CButton>
        <CButton
          color="secondary"
          onClick={() => props.onClose(false)}
        >Cancel</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default MintingModal;
