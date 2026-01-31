const axios = require('axios');
(async ()=>{
  try {
    const res = await axios.get('http://localhost:3000/api/products');
    console.log('STATUS', res.status);
    console.log(res.data);
  } catch (e) {
    if (e.response) console.error('ERR', e.response.status, e.response.data);
    else console.error('ERR', e.message);
  }
})();
