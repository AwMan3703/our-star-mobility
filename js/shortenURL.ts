// SHORTEN URLS

export function shortenURL(url: string, callback: (response: {short_url: string}) => void) {
    const APIUrl = 'https://spoo.me/?url=' + url;
    const data = new URLSearchParams();
    data.append('url', url);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', APIUrl, false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(JSON.parse(xhr.responseText))
            } else {
                console.error(`HTTP error! Status: ${xhr.status}`);
                callback({short_url: url.split('?')[0]}) // So the callback will just go with the base url
            }
        }
    };

    xhr.send(data);
}