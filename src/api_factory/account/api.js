import {
  sendGetRequest,
  sendPostRequest,
  sendPutRequest,
} from "../utils/index.ts";
import { sendDeleteRequest, sendImageRequest } from "../utils/network.ts";
import { api_url } from "../utils/consts.ts";

export default () => ({
  // USER
  register: async (body) => {
    const { data } = await sendPostRequest(
      api_url + "/api/v1.0/sc/user/signUp",
      body
    );
    return data;
  },
  login: async (body) => {
    const { data } = await sendPostRequest(
      api_url + "/api/v1.0/sc/user/logIn",
      body
    );
    return data;
  },
  getUsersByRole: async (roleID) => {
    const token = localStorage.getItem("token");
    const { data } = await sendGetRequest(
      api_url + "/api/v1.0/sc/user/?roleId=" + roleID,
      token
    );
    return data;
  },
  getUsersById: async (userId) => {
    const token = localStorage.getItem("token");
    const { data } = await sendGetRequest(
      api_url + "/api/v1.0/sc/user/?id=" + userId,
      token
    );
    return data;
  },
  getCurrentUser: async () => {
    const token = localStorage.getItem("token");
    const { data } = await sendGetRequest(
      api_url + "/api/v1.0/sc/user/me",
      token
    );
    return data;
  },

  getUserProducts: async (userId) => {
    const token = localStorage.getItem("token");

    const { data } = await sendGetRequest(
      api_url + "/api/v1.0/sc/product/?userId=" + userId,
      token
    );
    return data;
  },

  postUserProduct: async (body) => {
    const token = localStorage.getItem("token");

    const { data } = await sendPostRequest(
      api_url + "/api/v1.0/sc/product",
      body,
      token
    );
    return data;
  },

  setUserInformation: async (userInfo) => {
    const token = localStorage.getItem("token");
    const { data } = await sendPutRequest(
      api_url + "/api/v1.0/sc/user",
      userInfo,
      token
    );
    return data;
  },

  // LOCATIONS

  getLocationByUser: async (userID) => {
    const token = localStorage.getItem("token");
    const { data } = await sendGetRequest(
      api_url + "/api/v1.0/sc/location/?userId=" + userID,
      token
    );
    return data;
  },
  updateLocationById: async (body, locationId) => {
    const token = localStorage.getItem("token");
    const { data } = await sendPutRequest(
      api_url + "/api/v1.0/sc/location/" + locationId,
      body,
      token
    );
    return data;
  },

  insertLocations: async (body) => {
    const token = localStorage.getItem("token");
    const { data } = await sendPostRequest(
      api_url + "/api/v1.0/sc/location",
      body,
      token
    );
    return data;
  },
});
