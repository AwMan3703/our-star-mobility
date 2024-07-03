// SHORTEN URLS
export function shortenURL(url, callback) {
    const APIUrl = `https://spoo.me/?url=${encodeURIComponent(url)}`;
    const data = new URLSearchParams();
    data.append('url', url);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', APIUrl, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(JSON.parse(xhr.responseText));
            }
            else {
                console.error(`HTTP error! Status: ${xhr.status}`);
            }
        }
    };
    xhr.send(data);
}
