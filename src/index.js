// https://circleci.com/api/v1.1/project
//
// /github/:owner/:repo/build?circle-token=XXXX
// /github/:owner/:repo/follow?circle-token=XXXX

import proc from 'process';
import axios from 'axios';

/**
 * Currently only supports `POST` request to the API, so endpoints
 * such as `/follow` and `/build` are working, but not `/me` because
 * it needs a `GET` request. Basically what this module is doing
 * by default is that you pass a `options.repository` and `options.token`,
 * and it "follows" (e.g. enables) a CircleCI service on that repository.
 * The token also can be passed as `options.circleci_token` or as
 * an environment variable `process.env.CIRCLE_CI`.
 *
 * If you want to trigger a build, instead of enabling a project,
 * then pass second parameter `'build'`.
 *
 * @example
 * import circleci from '@tunnckocore/circleci';
 *
 * async function main() {
 *   const options = { repository: 'tunnckoCoreLabs/foobar', token: 'XXX' };
 *   const resultOfFollow = await circleci(options);
 *   console.log(resultOfFollow);
 *
 *   const triggeredBuild = await circleci(options, 'build');
 *   console.log(triggeredBuild)
 * }
 *
 * main().catch(console.error);
 *
 * @name  circleci
 * @param {object} [options={}] optional, pass `options.repository` and `options.token`
 * @param {string} [type='follow'] type of action, by default `'follow'`
 * @returns {Promise<object>} response from the api, requested with [axios][]
 * @public
 */
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
