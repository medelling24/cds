const RNFS = require('react-native-fs');
const xml2js = require('xml2js');

const apiUrl = 'https://youilab.ipicyt.edu.mx:8443/cds-dashboard/api';
const storeUrl = 'http://youilab.ipicyt.edu.mx'; // /cds_store/challenges_files/survey-test.xml

export function getUser() {
  return fetch(`${apiUrl}/users/sign-in`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'user-email': 'covid-19@cds.com',
      'user-password': 'ypQGBZs5j9a',
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getChallenges(user_id) {
  return fetch(`${apiUrl}/challenges/participating`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: user_id,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getSurvey(surveyUrl) {
  return fetch(`${storeUrl}/${surveyUrl}`)
    .then((response) => response.text())
    .then((xml) => xml2js.parseStringPromise(xml))
    .then((json) => json)
    .catch((error) => {
      console.error(error);
    });
}

export function postSurvey(evidence) {
  const path = RNFS.DocumentDirectoryPath + '/' + evidence.id;
  let formdata = new FormData();

  const xmlFile = {
    uri: path,
    type: 'application/xml',
    name: evidence.id,
  };

  formdata.append('file', xmlFile);
  formdata.append(
    'evidence-data',
    JSON.stringify({
      position: {
        latitude: evidence.latitude,
        longitude: evidence.longitude,
        altitude: evidence.altitude,
      },
      timestamp: evidence.timestamp,
      type: evidence.type,
      level: evidence.level,
    }),
  );

  return fetch(
    'https://postman-echo.com/post', //`${apiUrl}/evidences/${evidence.challengeId}/${evidence.userId}/append`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    },
  )
    .then((response) => response.text())
    .then((response) => response)
    .catch((error) => {
      console.error(error);
    });
}
