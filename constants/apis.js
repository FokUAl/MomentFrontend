const BACKEND_IP = 'http://3.76.124.47:8000';
export default apis = {
  sendMessageCode: BACKEND_IP + '/auth/send-message-code',
  logOut: BACKEND_IP + '/auth/logout',
  getLastOrders: BACKEND_IP + '/order/get-last-orders',
  getOneOrder: BACKEND_IP + '/order/get-one-order',
  getSavedOrders: BACKEND_IP + '/order/get-saved-orders',
  deleteSavedOrder: BACKEND_IP + '/order/delete-saved-order',
  addOffer: BACKEND_IP + '/order/add-offer',
  addOfferConfirmation: BACKEND_IP + '/order/add-offer-confirmation',
  getAccessToken: BACKEND_IP + '/token/get-access-token',
  renewAccessToken: BACKEND_IP + '/token/renew-access-token',
  getPhone: BACKEND_IP + '/ws/get-phone',
  getParcelPhone: BACKEND_IP + '/ws/get-parcel-phone',
  getProfile: BACKEND_IP + '/api/get-profile',
  getLatestVersion: BACKEND_IP + '/api/get-latest-version',
};
