import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";

import {apiPost} from "../../util/Requests";

const MintingModal = ({modal, mintingItemId, mintRecordId,
                       fetchMintRecords, onClose}) => {

  // NFT 민팅 - template 에 세팅된 number_of_sales 개수 만큼
  const mintNFT = () => {
    apiPost(`/papi/v1/nfts/mint`,{},
      { params: {'mint_record_id': mintRecordId}})
      .then(response => {
        console.log('mint success!!')
        fetchMintRecords(mintingItemId)
      })
    onClose();
  }

  return (
    <CModal
      show={modal}
      onClose={onClose}
    >
      <CModalHeader closeButton>
        <CModalTitle>심사 승인</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Id {mintingItemId} 카드의 mint_record_id {mintRecordId} 를 민팅하시겠습니까?
      </CModalBody>
      <CModalFooter>
        <CButton
          onClick={() => mintNFT()}
          color="primary">Yes</CButton>
        <CButton
          color="secondary"
          onClick={() => onClose(false)}
        >Cancel</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default MintingModal;
