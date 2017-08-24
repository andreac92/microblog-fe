const LAYOUT = {
  a: 'layout-a',
  b: 'layout-b',
  c: 'layout-c'
}

const getHeaders = function(token, client, uid) {
 return { 
  headers: {
    'access-token': token,
    'client': client,
    'uid': uid
  }
 }
}

const api_host = 'http://localhost:3001/'

export { LAYOUT, getHeaders, api_host }