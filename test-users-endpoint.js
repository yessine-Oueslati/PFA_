const http = require('http');

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/api/admin/users',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, res => {
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const users = JSON.parse(data);
      console.log('Users from backend:', users);
    } catch (e) {
      console.error('Could not parse response:', data);
    }
  });
});

req.on('error', error => {
  console.error('Request error:', error);
});

req.end(); 