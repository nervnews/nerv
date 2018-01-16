function fetchGET(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readySate === 4 && xhr.status === 200) {
            cb(null, JSON.parse(xhr.responseText));
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            cb(xhr.status);
        } else {
            cb(null, xhr.responseText);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

document.getElementById('searchBtn').addEventListener('click', function(e) {
    fetchGET('/articles', function(err, result) {
        if (err) console.log(err);
        else console.log(result);
    });
});
