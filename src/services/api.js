import axios from 'axios';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
export default axios.create({
  withCredentials: false,
  baseURL:`https://akilimali.herokuapp.com/`
  // baseURL: `http://localhost:5000/api/` 
});