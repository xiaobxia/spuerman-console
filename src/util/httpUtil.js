import axios from 'axios';
import assignDeep from 'assign-deep';

const basePath = '/superman-web/';

function makeUrl(url) {
  if (url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  } else {
    return `${basePath}${url}`;
  }
}

/**
 * Http方法基类
 * @type {{get: (function(*=): (*|Promise.<T>))}}
 */
const Http = {
  /**
   * get method, 返回data.body.result
   * @param url
   * @returns {*|Promise.<T>}
   */
  get (url, options) {
    return axios.get(makeUrl(url), options).then(data => data.body.result);
  },

  /**
   * get method, 不处理data.body
   * @param url
   * @returns {*|Promise.<T>}
   */
  getRaw (url, options) {
    return axios.get(makeUrl(url), options);
  },

  /**
   * post method , 返回data.body.result
   * @param url
   * @param param
   * @returns {*|Promise.<T>}
   */
  post (url, param, options) {
    // must be in form data format
    options = assignDeep({emulateJSON: true}, options);
    return axios.post(makeUrl(url), param, options).then(data => data.body.result);
  },

  /**
   * post method, 不处理data.body
   * @param url
   * @param param
   * @returns {*|Promise.<T>}
   */
  postRaw (url, param, options) {
    options = assignDeep({emulateJSON: true}, options);
    return axios.post(makeUrl(url), param, options);
  },

  /**
   * post方式，发送JSON格式数据 , 返回data.body.result；
   * 对应springMVC后端使用 @RequestBody
   * @param url
   * @param param
   * @param options
   * @returns {Promise.<T>}
   */
  postJSON (url, param, options) {
    return axios.post(makeUrl(url), param, options).then(data => data.body.result);
  },

  /**
   * post方式，发送JSON格式数据, 不处理data.body
   * 对应springMVC后端使用 @RequestBody
   * @param url
   * @param param
   * @param options
   * @returns {*|Promise.<T>}
   */
  postJSONRaw (url, param, options) {
    return axios.post(makeUrl(url), param, options);
  },

  /**
   * delete resource, 返回data.body.result
   * @param url
   */
  delete (url, options) {
    return axios.delete(makeUrl(url), options).then(data => data.body.result);
  },

  /**
   * delete method, 不处理data.body
   * @param url
   * @returns {*}
   */
  deleteRaw (url, options) {
    return axios.delete(makeUrl(url), options);
  },

  /**
   * jsonp proxy
   * @param url
   * @param options
   * @returns {*}
   */
  jsonp (url, options) {
    return axios.jsonp(makeUrl(url), options);
  },

  /**
   * 获取url
   * @param url
   */
  generateUrl (url) {
    return makeUrl(url);
  }
};

export default Http;
