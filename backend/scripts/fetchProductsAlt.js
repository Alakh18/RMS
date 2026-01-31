const http = require('http');

http.get('http://localhost:3000/api/products', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('STATUS', res.statusCode);
    try { console.log(JSON.parse(data)); } catch(e) { console.log(data); }
  });
}).on('error', (e) => {
  console.error('ERR', e.message);
});
