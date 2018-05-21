const ENV = 'production';
const BASE_URL = ENV === 'dev' ? '' : '/oversea'
const WEBSITE_NAME = 'NuaaOversea';
const WEBSITE_INTRO = '南航留学信息分享平台';
const simpleLayoutPages = ['/login', '/register'];

export {
    BASE_URL,
    WEBSITE_NAME,
    WEBSITE_INTRO,
    simpleLayoutPages
}