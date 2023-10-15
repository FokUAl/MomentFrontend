const BACKEND_IP = 'http://3.79.159.95:8000';
export default apis = {
  sendMessageCode: BACKEND_IP + '/auth/send-message-code',
  logOut: BACKEND_IP + '/auth/logout',
  getLastOrders: BACKEND_IP + '/order/get-last-orders',
  getOneOrder: BACKEND_IP + '/order/get-one-order',
  getSavedOrders: BACKEND_IP + '/order/get-saved-orders',
  deleteSavedOrder: BACKEND_IP + '/order/delete-saved-order',
  addOffer: BACKEND_IP + '/order/add-offer',
  addOfferConfirmation: BACKEND_IP + '/order/add-offer-confirmation',
  checkOffer: BACKEND_IP + '/order/check-offer',
  getAccessToken: BACKEND_IP + '/token/get-access-token',
  renewAccessToken: BACKEND_IP + '/token/renew-access-token',
  getPhone: BACKEND_IP + '/ws/get-phone',
  getParcelPhone: BACKEND_IP + '/ws/get-parcel-phone',
  getProfile: BACKEND_IP + '/api/get-profile',
  getLatestVersion: BACKEND_IP + '/api/get-latest-version',
  getDirection: BACKEND_IP + '/auth/get-direction',
  apiPing: BACKEND_IP + '/api/api-ping',
  serverPing: BACKEND_IP + '/api/server-ping',
  checkExistence: BACKEND_IP + '/auth/check-existence'
};
