const axios = require('axios');
const url = 'http://111.229.221.29/v1/book/hot_keyword';


setInterval(() => {
  for (let i = 0; i < 1000; i++) {
    console.log(new Date().getTime());
    axios.get(url);
  }
}, 1000);

