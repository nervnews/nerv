function fetchPOST(url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status !== 200) {
      callback(xhr.responseText);
    } else if (xhr.readyState == 4 && xhr.status === 200) {
      callback(null, xhr.responseText);
    }
  };
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));
}


var buttons = document.querySelectorAll('.article__btn');

buttons.forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    var query = [btn.parentElement[0].value];
    var data = fetchPOST('/visualize', query, function(err, data) {
      if (err) {
        console.log(err);
      }
      else {
        //This is the time to process the data using D3.js
        console.log(data);
        
      }
    })
  })
})

