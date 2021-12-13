import  axios from "axios";
import SecureLS from "secure-ls";

let ls = new SecureLS();

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/auth/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + ls.get('token');
