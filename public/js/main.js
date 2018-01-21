function fetchPOST(url, data, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status !== 200) {
      cb(xhr.responseText);
    } else if (xhr.readyState == 4 && xhr.status === 200) {
      cb(null, xhr.responseText);
    }
  };
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));
}

function fetchGET(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status !== 200) {
      cb(xhr.responseText);
    } else if (xhr.readyState == 4 && xhr.status === 200) {
      cb(null, xhr.responseText);
    }
  };
  xhr.open('GET', url);
  xhr.send();
}
