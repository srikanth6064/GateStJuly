import axios from "axios";
// get all no.of clients
const API_PI_CHART =
  "https://us-central1-gatestone-yyte.cloudfunctions.net/campaignAnalytics";
const API_DROPDOWN =
  "https://us-central1-gatestone-yyte.cloudfunctions.net/getExistingCampaings";

const API_SEND_DATA =
  "https://us-central1-gatestone-yyte.cloudfunctions.net/ProactiveMessages";

const API_USERMANAGEMENT = 
  "https://us-central1-gatestone-yyte.cloudfunctions.net/userManagement";


// {"name":"Simplii_Mortgage_20220316_160638.xlsx"}
export function getCampaignAnalytics(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(API_PI_CHART, data)
      .then((response) => {
        return resolve(response);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export function getExistingCampaign() {
  return new Promise((resolve, reject) => {
    axios
      .post(API_DROPDOWN)
      .then((response) => {
        return resolve(response);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export function sendData(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(API_SEND_DATA, data)
      .then((response) => {
        return resolve(response);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export function userManagement(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(API_USERMANAGEMENT, data)
      .then((response) => {
        return resolve(response);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

