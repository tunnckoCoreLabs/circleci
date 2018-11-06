// https://circleci.com/api/v1.1/project
//
// /github/:owner/:repo/build?circle-token=XXXX
// /github/:owner/:repo/follow?circle-token=XXXX

import proc from 'process';
import axios from 'axios';

export default async function enableCircleCI(answers = {}, type = 'follow') {
  const api = 'https://circleci.com/api/v1.1/';
  const token =
    answers.circleci_token ||
    (answers.author && answers.author.circleci_token) ||
    answers.token ||
    (!proc.env.ASIA_CLI && proc.env.CIRCLECI_TOKEN);

  if (!token) {
    throw new Error('@tunnckocore/circleci: expect a CircleCI token');
  }

  let url = null;
  if (answers.repository) {
    url = ['project', 'github', answers.repository].concat(type);
  } else {
    url = [].concat(type);
  }

  url = `${api}${url.join('/')}?circle-token=${token}`;
  return axios.post(url);
}
