let baseUrl = 'https://fireman-api.falconconsulting.fr';
//let mediaUrl = 'https://adzone-api-dev.falconweb.app/';
let chatUrl = 'https://fireman-chat.falconconsulting.fr/chatHub';
if (window.location.host === 'fireman-dev.falconweb.app') {
  baseUrl = 'https://fireman-api.falconconsulting.fr';
  //mediaUrl = 'https://adzone-api-dev.falconweb.app/';
  chatUrl = 'https://fireman-chat.falconconsulting.fr/chatHub';
} else if (window.location.host === 'fireman-qa.falconweb.app') {
  baseUrl = 'https://fireman-api-qa.falconweb.app';
  //mediaUrl = 'https://adzone-api-qa.falconweb.app/';
  chatUrl = 'https://fireman-chat.falconconsulting.fr/chatHub';
}
// else if (window.location.host === 'fm-staging.falconweb.app') {
//   baseUrl = 'https://fm-api-staging.falconweb.app/api/v1';
//   //mediaUrl = 'https://adzone-api-staging.falconweb.app/';
// }
module.exports = { baseUrl, chatUrl };
