declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd'
  }
}

interface IRequestOption {
  proxy?: boolean; // 默认为true, 当请求成功时，返回值为data；false时，返回response内容
  pageError?: boolean; // 默认为false，当true时，如果代码异常或接口异常，useCom会返回相应的error数据，体现在页面里
}
