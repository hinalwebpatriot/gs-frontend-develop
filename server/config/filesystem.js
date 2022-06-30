const disks = {
    's3': {
        'driver': 's3',
        'bucket': 'gsdiamonds-media-sydney',
        'url':  null,
    },
    'cloud-local': {
        'driver': 'local',
        'url': 'http://backend.diamonds.loc/storage/cloud',
    }
};

function defaultDisk()
{
    return process.env.FILESYSTEM_CLOUD || 's3';
}

function baseUrl(diskName)
{
    const disk = getDisk(diskName);
    let baseUrl;

    if (disk) {
        if (!disk.url) {
            baseUrl = `https://${disk.bucket}.${disk.driver}.amazonaws.com`;
        } else {
            baseUrl = disk.url;
        }
    }

    return baseUrl;
}

function getDisk(name) {
    return disks[name] || disks[defaultDisk()];
}

exports.disk = getDisk;

exports.baseUrl = baseUrl;

exports.url = (uri) => {
    return baseUrl(getDisk(defaultDisk())) + '/' + uri;
};