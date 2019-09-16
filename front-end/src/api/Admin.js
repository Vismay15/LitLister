import jsonify from './middlewares/jsonify';
import request from './middlewares/request';

export default {
  getAdmin: aid => request(`/admin/${aid}`, {}, 'get').then(jsonify),
  getListingData: ({aid, lid}) => request(`/admin/${aid}/listingdata`, {lid}, 'get').then(jsonify),
  getUserAccountData: ({aid, uid}) => request(`/admin/${aid}/useraccountdata`, {uid}, 'get').then(jsonify),
  postCloseListing: ({aid, lid}) => request(`/admin/${aid}/closelisting`, {lid}),
  postCloseUserAccount: ({aid, uid}) => request(`/admin/${aid}/closeuseraccount`, {uid}),
  postRefundTransaction: ({aid, tid}) => request(`/admin/${aid}/refund`, {tid}),
  postUpdateListingProfile: ({aid, lid, profile}) => request(`/admin/${aid}/updatelisting`, {lid, profile}),
  postUpdateUserAccountProfile: ({aid, uid, profile}) => request(`/admin/${aid}/updateuseraccount`, {uid, profile})
};
