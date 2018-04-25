import request from 'request'
import rp from 'request-promise'


const requestPromise = async (method='GET', state='upload', url='', qs={}) => {
    let result,
        options = {
            method: method,
            qs: qs
        };
        console.log(state);
    if(state == "upload") {
        options.uri = 'http://localhost:8000' + url;
    }else if(state == "choose") {
        options.uri = 'http://localhost:8888' + url;
    }
    console.log(options)
    await rp(options)
        .then(data => {
            result = JSON.parse(data);
        }).catch(err => {
            //console.log(err);
        })
    return result;
}

export default requestPromise;