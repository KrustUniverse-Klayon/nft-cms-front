import {apiGet, apiPatch, apiPut, AUTH_ERROR_CODE} from "./Requests";


async function signedUrlFileUpload (signedUrl, url, file) {
  // file upload
  console.log('---- in signedUrlFileUpload ----')
  console.log(signedUrl);
  console.log(url);
  console.log(file);
  console.log('---------------------------------')

  const header = {'Content-Type': file.type,
    'x-amz-acl': 'public-read'}

  try {
    const r = await apiPut(signedUrl, file,{headers: header});
    console.log("Upload Success");
    return Promise.resolve(r.data);

  } catch (e) {
    console.log('Upload Failed')
    return Promise.reject(e?.response?.data);
  }
}

export async function fileUpload (files) {

  try {
    const r = await apiGet(`/papi/v1/templates/signed-urls`,
      {
        number_of_signed_urls: files.length
      },
      {
        headers: { Authorization: '' }
      }
    )

    console.log(r);

    const signedUrls = r.data.signed_urls;
    signedUrls.forEach(function (e, index, arr) {
      signedUrlFileUpload(e.signed_url, e.url, files[index]);
    });

    return Promise.resolve(signedUrls);

  } catch (e) {
    console.log('File Upload Failed')
    return Promise.reject(e?.response?.data);
  }

  /*
  apiGet(
      `/papi/v1/templates/signed-urls`,
      {
          number_of_signed_urls: files.length
      },
      {
          headers: { Authorization: '' }
      }
  )
      .then(response => {
          console.log(response);

          const signedUrls = response.data.signed_urls;
          signedUrls.forEach(function (e, index, arr) {
              console.log(index, e);
              signedUrlFileUpload(e.signed_url, e.url, files[index]);
          });

          return signedUrls;

          //registerTemplate(imageUrl, mediaUrl);

      })
      .catch(error => {
          if (!error.response && error.request) {
              // 요청이 이루어 졌으나 응답을 받지 못했습니다.
              console.log('요청이 실패했습니다.');
          }
      });

   */
}

