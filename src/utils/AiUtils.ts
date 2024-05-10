import * as base64 from 'base-64';
import CryptoJs from 'crypto-js';
import {imageObj, requestObj} from '../config';

const GetWebsocketUrl = () => {
  const getChatWebsocketUrl = () => {
    return new Promise<string>((resovle) => {
      let url = 'ws://spark-api.xf-yun.com/v3.5/chat';
      let host = 'spark-api.xf-yun.com';
      let apiKeyName = 'api_key';
      // let date = new Date().toGMTString();
      let date = new Date().toUTCString();
      let algorithm = 'hmac-sha256';
      let headers = 'host date request-line';
      let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v3.5/chat HTTP/1.1`;
      let signatureSha = CryptoJs.HmacSHA256(signatureOrigin, requestObj.APISecret);
      let signature = CryptoJs.enc.Base64.stringify(signatureSha);

      //加入图片理解
      let authorizationOrigin = `${apiKeyName}="${requestObj.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;

      let authorization = base64.encode(authorizationOrigin);

      // 将空格编码
      url = `${url}?authorization=${authorization}&date=${encodeURI(date)}&host=${host}`;

      resovle(url);
    });
  };

  const getImageWebsocketUrl = () => {
    return new Promise<string>((resovle) => {
      const host = 'spark-api.cn-huabei-1.xf-yun.com';
      let apiKeyName = 'api_key';
      const url = 'wss://spark-api.cn-huabei-1.xf-yun.com/v2.1/image';

      const date = new Date().toUTCString();
      const algorithm = 'hmac-sha256';
      const headers = 'host date request-line';
      const signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2.1/image HTTP/1.1`;

      let signatureSha = CryptoJs.HmacSHA256(signatureOrigin, imageObj.APISecret);
      let signature = CryptoJs.enc.Base64.stringify(signatureSha);

      let authorizationOrigin = `${apiKeyName}="${imageObj.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;

      let authorization = base64.encode(authorizationOrigin);

      const urlWithParams = `${url}?authorization=${authorization}&date=${encodeURIComponent(date)}&host=${host}`;

      resovle(urlWithParams);
    });
  };

  const getTestUrl = () => {
    return new Promise<string>(resolve => {
      const host = "ws://10.23.76.122:8000/ws/test/xioali/www"
      resolve(host)
    })
  }

  return {getChatWebsocketUrl,getImageWebsocketUrl,getTestUrl}
}


export default GetWebsocketUrl