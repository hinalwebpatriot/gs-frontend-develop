exports.getValueInJson  = function (json, key) {
    if (!json) {
        return '';
    }

    if (typeof json == 'string') {
        json = JSON.parse(json);
    }

    return json[key] ? json[key] : '';
};