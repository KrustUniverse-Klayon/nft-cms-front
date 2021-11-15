import {useState, useEffect, useRef} from 'react';
import {apiPost} from "../util/Requests";
import {fileUpload} from '../util/FileUpload';

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm, CFormGroup, CInput, CInputRadio, CLabel,
  CRow
} from '@coreui/react'

const CreateCard = () => {

  const defaultInputs = {
    cardName: '',
    cardDescription: '',
    cardType: 'ticket',
  };

  const [inputs, setInputs] = useState(defaultInputs);
  const {cardName, cardDescription, cardType} = inputs;

  const [imageFile, setImageFile] = useState('');
  const [imageFileName, setImageFileName] = useState('');
  const [mediaFile, setMediaFile] = useState('');
  const [mediaFileName, setMediaFileName] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [preview, setPreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const imageFileRef= useRef();
  const mediaFileRef= useRef();

  const handleInputOnChange = (e) => {
    const {name, value} = e.target;
    setErrorMsg('');
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleInputOnReset = () => {
    setErrorMsg('');
    setInputs(defaultInputs);
    setImageFile('');
    setImageFileName('');
    setMediaFile('');
    setMediaFileName('');
    setPreviewURL('');
    setPreview(null);
    imageFileRef.current.value = '';
    mediaFileRef.current.value = '';
  }

  const handleFileOnChange = (e) => {    // 파일 불러오기
    e.preventDefault();
    setErrorMsg('');

    let file = e.target.files[0];
    let reader = new FileReader();
    const targetName = e.target.name;

    reader.onloadend = (e) => {
      if (targetName === 'imageFile') {
        setImageFile(file);
        setImageFileName(file.name);
        setPreviewURL(reader.result);
      } else {
        setMediaFile(file);
        setMediaFileName(file.name);
      }
    }
    if (file)
      reader.readAsDataURL(file);
  };

  const handleFileButtonClick = (e) => { // 버튼 대신 클릭하기
    e.preventDefault();
    if (e.target.name === 'imageFile') {
      imageFileRef.current.click();
    } else {
      mediaFileRef.current.click();
    }
  }

  useEffect(() => {

    //처음 파일 등록하지 않았을 때를 방지
    if(previewURL !== '') {
      setPreview(<img height="50%" src={previewURL} className="card-img-top" alt=''></img>);
    } else {
      setPreview(<div id="previewNoImage" className="card-header h-50"></div>);
    }

    return () => {
    }
  }, [previewURL])

  const registerTemplate = (imageUrl, mediaUrl) => {

    let params = {
      image_url: imageUrl,
      name: cardName,
      description: cardDescription,
      type: cardType,
      contract_id: global.constants.STUDIO_CONTRACT_ID,
    };

    if (mediaUrl !== '') {
      params['media_url'] = mediaUrl;
      params['media_type'] = 'VIDEO';     // TODO: 타입에 맞게 변경
    }
    console.log(params);

    apiPost(
      `/papi/v1/templates`,
      params,
      {
        headers: { Authorization: '' }
      }
    )
      .then(response => {
        alert("제작하신 카드의 발급을 위해 심사가 요청 되었습니다.");
        handleInputOnReset();
        console.log(response);
      })
      .catch(error => {
        if (!error.response && error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          console.log('요청이 실패했습니다.');
        }
      });
  }

  const enrollCard = () => {

    let errMsg = '';
    if (cardName === '')
      errMsg += '카드 이름을 입력해 주세요<br />';
    if (cardDescription === '')
      errMsg += '카드 설명을 입력해 주세요<br />';
    if (!imageFile)
      errMsg += '디스플레이할 이미지 파일을 업로드해 주세요<br />';

    if (errMsg !== '') {
      setErrorMsg(errMsg);
      return;
    }

    let files = [imageFile];
    if (mediaFile !== '') {
      files.push(mediaFile);
    }

    fileUpload(files)
      .then(response => {
        const urls = response;
        const imageUrl = urls[0].url;
        const mediaUrl = mediaFile !== '' ? urls[1].url : ''
        registerTemplate(imageUrl, mediaUrl);

      })
      .catch(error => {
        if (!error.response && error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          console.log('요청이 실패했습니다.');
        }
      });

  }

  return (
    <>
      <CRow>
        <CCol xs="8" lg="8">
          <CCard style={{height: '500px'}}>
            <CCardHeader>
              기본 정보
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">카드 이름</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={cardName} onChange={handleInputOnChange}
                            name="cardName" placeholder="" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">카드 설명</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={cardDescription} onChange={handleInputOnChange}
                            name="cardDescription" placeholder="" />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>카드 타입</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="sale-method-radio1"
                                   name="cardType"
                                   onChange={handleInputOnChange}
                                   value="ticket"
                                   checked={cardType === 'ticket'}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="sale-method-radio1">티켓</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="sale-method-radio2"
                                   name="cardType"
                                   onChange={handleInputOnChange}
                                   value="warranty"
                                   checked={cardType === 'warranty'}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="sale-method-radio2">보증서</CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">이미지 파일</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput innerRef = {imageFileRef} hidden = {true} name="imageFile" type='file'
                            onChange={handleFileOnChange} />
                    <CButton onClick={handleFileButtonClick}
                             name="imageFile"
                             color="warning">Upload</CButton>
                    <CLabel style={{marginLeft: 10}}>{imageFileName}</CLabel>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">미디어 파일(옵션)</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput innerRef = {mediaFileRef} hidden = {true} name="mediaFile" type='file'
                            onChange={handleFileOnChange} />
                    <CButton onClick={handleFileButtonClick}
                             name="mediaFile"
                             color="warning">Upload</CButton>
                    <CLabel style={{marginLeft: 10}}>{mediaFileName}</CLabel>
                  </CCol>
                </CFormGroup>

              </CForm>

              <div className="mb-3 text-danger">
                <div dangerouslySetInnerHTML={{__html: errorMsg}} />
              </div>

              <CButton
                onClick={enrollCard}
                color="info">등록</CButton>
              <CButton
                onClick={handleInputOnReset}
                color="secondary">초기화</CButton>

            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="4" lg="4">
          <CCard style={{height: '500px'}}>
            <CCardHeader>
              Preview
            </CCardHeader>
            <CCardBody>
              {preview}
              <div className="card-body">
                <h5 className="card-title">{cardName}</h5>
                <p className="card-text">{cardDescription}</p>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

    </>
  )
}

export default CreateCard
