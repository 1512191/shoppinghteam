
const axios = require('axios');
const baseURL='https://hteamshoppingwebapi.azurewebsites.net/api';

// const baseURL='http://localhost:64929/api/';

export const getProducts = (page, limit)=>axios.get(`${baseURL}/Product?page=${page}&perPage=${limit}&filter=1&condition=`) ;
export const getDetail = (id)=>axios.get(`${baseURL}/Product/${id}`);
export const postCheckout = (infor, token)=>axios.post(`${baseURL}/bill`,infor, {headers:{'Content-Type': 'application/json','Authorization':'Bearer ' + token}});
export const getCategory = (page, limit)=>axios.get(`${baseURL}/Category?page=${page}&perPage=${limit}`);
export const getCategoryByID = (id, page, limit)=>axios.get(`${baseURL}/Product?page=${page}&perPage=${limit}&filter=0&condition=${id}`);
export const login = (username, password)=>axios.post(`${baseURL}/login`, `username=${username}&password=${password}&grant_type=password`, {'Content-Type': 'application/x-www-form-urlencoded'});
export const register = (customer)=>axios.post(`${baseURL}/Customer`, customer);
export const getPhone = (phone)=>axios.get(`${baseURL}/checkphone?phone=${phone}`);
export const getMethodDelivery=()=>axios.get(`${baseURL}/deliverymethod`);
export const getAddress=()=>axios.get(`${baseURL}/address`);
export const getBills=(idCustomer,token,page, perPage)=>axios.get(`${baseURL}/Bill?customerID=${idCustomer}&page=${page}&perPage=${perPage}`,{headers:{'Content-Type': 'application/json','Authorization':'Bearer ' + token}});
export const getProductName = (name, page, limit)=>axios.get(`${baseURL}/Product?page=${page}&perPage=${limit}&filter=2&condition=${name}`);
export const changePassword = (account, token)=>axios.put(`${baseURL}/changepassword`, account,{headers:{'Content-Type': 'application/json','Authorization':'Bearer ' + token}});
export const getBillDetail = (id, token)=>axios.get(`${baseURL}/Bill/${id}`,{headers:{'Content-Type': 'application/json','Authorization':'Bearer ' + token}});
export const getExpectedDate = (date, type)=>axios.get(`${baseURL}/expectedReceivedAt?createdAt=${date}&deliveryType=${type}`)
export const reorderBill = (billID, token)=>axios.get(`${baseURL}/reorderbill?billID=${billID}`, {headers:{'Content-Type': 'application/json','Authorization':'Bearer ' + token}})
export const getCustomer = (token)=>axios.get(`${baseURL}/customer`,{headers:{'Content-Type': 'application/json','Authorization':'Bearer ' + token}})
export const editInfor = (token, infor)=>axios.put(`${baseURL}/customer`,infor, {headers:{'Content-Type': 'application/json','Authorization':'Bearer ' + token}})
export const getDetailCat = (id)=>axios.get(`${baseURL}/detailcategory?id=${id}`);