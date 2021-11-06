import axios from 'axios';
// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
export default axios.create({
  withCredentials: false,
  baseURL:`https://akilimali.herokuapp.com/`
  // baseURL: `https://cartographievbg.herokuapp.com/api/`
  // baseURL: `http://localhost:5000/api/` 
});