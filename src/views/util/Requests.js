import axios from 'axios';

export const NETWORK_ERROR_CODE = 99999;
export const AUTH_ERROR_CODE = 1004;

const axiosInstance = axios.create({
  baseURL: global.constants.FASTAPI_URL,
  responseType: 'json',
});

async function callApi (api) {
  try {
    const r = await api();

    return Promise.resolve(r.data);
  } catch (e) {
    // 로그인 만료
    if (e.message === 'Network Error') {
      return Promise.reject({
        error: {
          error_code: AUTH_ERROR_CODE,
        },
      });
    }

    // api에서 401에러 리턴 시 response_url로 리다이렉트
    if (e?.response?.status === 401) {
      const responseUrl = e.response.data.error.response_url;
      window.location.href = responseUrl;
    }

    return Promise.reject(e?.response?.data);
  }
}

export async function apiGet(url, params={}, options={}) {
  return await axiosInstance.get(url, {params: params, ...options});
}

export async function apiPost(url, params, options={}) {
  return await axiosInstance.post(url, params, options);
}

export async function apiPatch(url, params, options={}) {
  return await axiosInstance.patch(url, params, options);
}

export async function apiGetWithAuth(url, accessToken, params={}, options={}) {
  return await axiosInstance.get(url,
    {
      ...options,
      params: params,
      headers: {Authorization: 'Bearer ' + accessToken}
    });
}

export async function apiPostWithAuth(url, accessToken, params, options = {}) {
  return await axiosInstance.post(url,
    params,
    {
      ...options,
      headers: {Authorization: 'Bearer ' + accessToken}
    });
}

axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response) {
    if (error.response.status === 401) {
      alert('access_token 만료');
    }
    else if (error.response.status === 403) {
      alert('권한이 없습니다.');
    }
    else {
      alert(error.response.data);
    }
  }
  else {
    alert('오류가 발생하였습니다.')
  }
  return Promise.reject(error);
});

function apiFormData (method, url, params, options: Options = {}) {
  const data = new FormData();

  for (const p of Object.keys(params)) {
    data.append(p, params[p]);
  }

  const apiOptions = {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'multipart/form-data',
    },
  };

  console.log("In apiFormData");
  console.log(method);
  console.log(url);
  console.log(data);
  console.log(apiOptions);

  return callApi(() => axiosInstance[method](url, data, apiOptions));
}

export function apiPutFormData (url, params, options: Options = {}) {
  return apiFormData('put', url, params, options);
}

export function apiPostFormData (url, params, options: Options = {}) {
  return apiFormData('post', url, params, options);
}

export function apiPatchFormData (url, params, options: Options = {}) {
  return apiFormData('patch', url, params, options);
}
