{
  "name": "taro-tpl",
  "version": "1.0.0",
  "private": true,
  "description": "",
  "templateInfo": {
    "name": "default",
    "typescript": true,
    "css": "less"
  },
  "scripts": {
    "build:weapp": "taro build --type weapp",
    "build:swan": "taro build --type swan",
    "build:alipay": "taro build --type alipay",
    "build:tt": "taro build --type tt",
    "build:h5": "taro build --type h5",
    "build:rn": "taro build --type rn",
    "build:qq": "taro build --type qq",
    "build:jd": "taro build --type jd",
    "build:quickapp": "taro build --type quickapp",
    "dev:weapp": "npm run build:weapp -- --watch",
    "dev:swan": "npm run build:swan -- --watch",
    "dev:alipay": "npm run build:alipay -- --watch",
    "dev:tt": "npm run build:tt -- --watch",
    "dev:h5": "npm run build:h5 -- --watch",
    "dev:rn": "npm run build:rn -- --watch",
    "dev:qq": "npm run build:qq -- --watch",
    "dev:jd": "npm run build:jd -- --watch",
    "dev:quickapp": "npm run build:quickapp -- --watch"
  },
  "browserslist": [
    "last 3 versions",
    "Android >= 4.1",
    "ios >= 8"
  ],
  "author": "",
  "dependencies": {
    "@babel/runtime": "^7.7.7",
    "@tarojs/components": "3.1.4",
    "@tarojs/react": "3.1.4",
    "@tarojs/runtime": "3.1.4",
    "@tarojs/taro": "3.1.4",
    "react": "^17.0.0",
    "react-dom": "^17.0.0"
  },
  "devDependencies": {
    "@babel/core": "^7.8.0",
    "@tarojs/mini-runner": "3.1.4",
    "@tarojs/webpack-runner": "3.1.4",
    "@types/react": "^17.0.0",
    "@types/webpack-env": "^1.13.6",
    "@typescript-eslint/eslint-plugin": "^4.15.1",
    "@typescript-eslint/parser": "^4.15.1",
    "babel-preset-taro": "3.1.4",
    "eslint": "^6.8.0",
    "eslint-config-taro": "3.1.4",
    "eslint-plugin-import": "^2.12.0",
    "eslint-plugin-react": "^7.8.2",
    "eslint-plugin-react-hooks": "^4.2.0",
    "stylelint": "9.3.0",
    "typescript": "^4.1.0"
  }
}
