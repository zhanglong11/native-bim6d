function get (url) {
    const headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': global.token
    });
    return fetch(url, {
        method: 'GET',
        headers: headers
    }).then(response => {
        return handleResponse(url, response);
    }).catch(err => {
        console.error(`Request failed. Url = ${url} . Message = ${err}`);
        return {error: {message: 'Request failed.'}};
    })
}

function post (url, data) {
    const headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': global.token
    });
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => {
        return handleResponse(url, response);
    }).catch(err => {
        console.error(`Request failed. Url = ${url} . Message = ${err}`);
        return {error: {message: 'Request failed.'}};
    })
}

function put (url, data) {
    const headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': global.token
    });
    return fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => {
        return handleResponse(url, response);
    }).catch(err => {
        console.error(`Request failed. Url = ${url} . Message = ${err}`);
        return {error: {message: 'Request failed.'}};
    })
}


function upload (url, file) {
    let fileData = {uri:`file://${file.uri}`, type: 'multipart/form-data', name: file.fileName};
    const formData = new FormData();
    formData.append('file', fileData);

    const fileHeader = new Headers({
        'x-access-token':global.token
    });

    return fetch(url, {
        method: 'POST',
        headers: fileHeader,
        body: formData
    }).then(response => {
        return handleResponse(url, response);
    }).catch(err => {
        console.error(`Request failed. Url = ${url} . Message = ${err}`);
        return {error: {message: 'Request failed.'}};
    })
}

function handleResponse (url, response) {
    if (response.status < 500) {
        return response.json();
    } else {
        console.error(`Request failed. Url = ${url} . Message = ${response.statusText}`);
        return {error: {message: 'Request failed due to server error '}};
    }
}


export {get, post, put,upload}
