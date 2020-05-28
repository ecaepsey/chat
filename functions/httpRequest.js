import request from 'request-promise';
const token = '4cff7c40232011058ebed131e32f82';

export const postWebHook = () => {
    const body = {
        "url": "http://161.35.61.122:3000",
        "name": "My first web hook",
        "events": ["outbox"]
    };

    const options = {
        method: 'POST',
        uri: 'https://api.chat2desk.com/v1/webhooks',
        body: body,
        headers: {
            'Authorization': token,
            'Content-Type' : 'application/json'
        },
        json: true // Automatically stringifies the body to JSON
    };
    return request(options)
        .then(function (parsedBody) {

        })
        .catch(function (err) {

        });
};

