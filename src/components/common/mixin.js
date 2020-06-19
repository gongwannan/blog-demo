import axios from '../../api/request'
import qs from 'qs';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default{
  created(){
  },
  methods: {
    getRequest (actionName, params, callback) {
      let url = '/api/'+actionName;
      //params = JSON.stringify(params)
      // params = qs.stringify(params)
      console.log(params)
      axios.post(url,params)
      .then(function (response) {
        console.log(response);
        callback && callback(response)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    }
}
