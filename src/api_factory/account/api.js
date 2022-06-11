import {
  sendGetRequest,
  sendPostRequest,
  sendPutRequest,
} from '../utils/index.ts';
import { sendDeleteRequest, sendImageRequest } from '../utils/network.ts';
import { api_url } from '../utils/consts.ts';

export default () => ({
  checkedIfLogged: async (email) => {
    const { data } = await sendGetRequest(
      api_url + 'api/v1.0/platform/user/email/' + email
    );
    return data;
  },
  getUser: async () => {
    const { data } = await sendGetRequest(api_url + 'api/v1.0/sc/user');
    return data;
  },
  getSubscriptions: async () => {
    const token = localStorage.getItem('token');
    const { data } = await sendGetRequest(
      api_url + 'api/v1.0/platform/demand/getUserSubscriptions',
      token || ''
    );
    return data;
  },
  inviteUser: async (email) => {
    const token = localStorage.getItem('token');

    const { data } = await sendPostRequest(
      api_url + 'api/v1.0/platform/user/affiliate',
      { email: email },
      token
    );
    return data;
  },
  setUserInformation: async (token) => {
    const { data } = await sendPutRequest(
      api_url + 'api/v1.0/platform/user',
      userInfo,
      token
    );
    //Throws an error
    return data;
  },
});
