const tools = require("./../utils/Tools");
const filesystem = require("./../config/filesystem");
const util = require("util");

function mediaUrl (media) {
    return filesystem.baseUrl(media.disk) + `/${media.collection_name}/${media.id}/${media.file_name}`;
}

function collectionItemSizeUrl (mediaCollectionItem, size) {
    let ext = mediaCollectionItem.file.substr(-4);
    let base = mediaCollectionItem.file.substr(0, mediaCollectionItem.file.length - 4);
    return mediaCollectionItem.base_url + '/conversions/' + base + '-' + size + ext;
}

function dd(data)
{
    console.info(util.inspect(data, false, null, true));
}

function mediaVideo(collectionMediaItem) {
    if (!collectionMediaItem) {
        return null;
    }

    return {
        "name": collectionMediaItem.file,
        "mime_type": collectionMediaItem.mime,
        "size": collectionMediaItem.size,
        "src": collectionMediaItem.url,
    }
}

function mediaImage(mediaCollectionItem) {
    return {
        "name": mediaCollectionItem.name,
        "mime_type": mediaCollectionItem.mime,
        "size": mediaCollectionItem.size,
        "path": {
            "origin": mediaCollectionItem.url,
            "thumb": collectionItemSizeUrl(mediaCollectionItem, 'thumb'),
            "medium": collectionItemSizeUrl(mediaCollectionItem, 'medium-size'),
            "feed": collectionItemSizeUrl(mediaCollectionItem, 'feed'),
        }
    }
}

function calculateRingPrice(product, rate)
{
    let price = 0;
    let oldPrice = 0;

    if (!product.discount_price) {
        price = product.inc_price;
        oldPrice = null;
    } else {
        price = product.inc_price / (product.raw_price * product.discount_price);
        oldPrice = product.inc_price;
    }

    return {
        "old_count": oldPrice ? Math.ceil(parseFloat(oldPrice) / rate) : null,
        "count": Math.ceil(parseFloat(price) / rate),
        "currency": "AUD"
    }
}

function engagementRings(rings, mediaCollection, offers, reviewsData, rate) {
    return rings.map(ring => {
        let name = tools.getValueInJson(ring.item_name, 'en');
        let stoneTitle = tools.getValueInJson(ring.stone_title, 'en');
        let styleTitle = tools.getValueInJson(ring.style_title, 'en');
        let metalTitle = tools.getValueInJson(ring.metal_title, 'en');
        let header = tools.getValueInJson(ring.header, 'en');
        let subHeader = tools.getValueInJson(ring.sub_header, 'en');
        let collectionTitle = tools.getValueInJson(ring.collection_title, 'en');
        let description = 'in ' + metalTitle + ' with ' + stoneTitle + ' Center Stone';
        let h1 = collectionTitle + ' ' + styleTitle + ' Diamond Engagement Ring';
        let h2 = subHeader ? subHeader : description;
        let collectionDesc = tools.getValueInJson(ring.collection_desc, 'en');

        let collectionStoryTitle = tools.getValueInJson(ring.collection_story_title, 'en');
        let collectionStoryVideo = tools.getValueInJson(ring.collection_story_video, 'en');
        let collectionStoryText = tools.getValueInJson(ring.collection_story_text, 'en');

        let images = mediaCollection.get('EngagementRing', ring.id, 'engagement-images');
        let images360 = mediaCollection.get('EngagementRing', ring.id, 'engagement-images-3d').map(img => img.url);
        let video = mediaCollection.first('EngagementRing', ring.id, 'engagement-video');
        let reviewsStat = reviewsData.find(r => r.product_id === ring.id);

        return {
            "id": ring.id,
            "title": name + ' ' + stoneTitle,
            "subtitle": (styleTitle) ? styleTitle + ', ' + metalTitle : metalTitle,
            "header": header ? header : h1,
            "h1": h1,
            "h2": h2 + " (" + ring.sku + ")",
            "slug": ring.slug,
            "sku": ring.sku,
            "group_sku": ring.group_sku,
            'preview_image': images.length > 0 ? mediaImage(images[0]) : null,
            'images': images.map(image => mediaImage(image)),
            'images_360': images360.length > 0 ? images360 : null,
            "video": mediaVideo(video),
            "price": calculateRingPrice(ring, rate),
            'description': description ? description : collectionDesc,
            "options": {
                "carat_weight": ring.carat_weight,
                "band_width": {
                    "count": parseFloat(ring.band_width),
                    "dimension": "mm"
                },
                "ring_collection": {
                    "id": ring.ring_collection_id,
                    "title": collectionTitle,
                    "slug": ring.collection_slug,
                    "description": collectionDesc,
                    "story": (collectionStoryTitle || collectionStoryVideo || collectionStoryText) ? {"title": collectionStoryTitle, "video": collectionStoryVideo, "text": collectionStoryText} : null
                },
                "ring_style": {
                    "id": ring.ring_style_id,
                    "title": styleTitle,
                    "slug": ring.style_slug,
                    "image": mediaCollection.firstUrl('EngagementRingStyle', ring.ring_style_id, 'image'),
                    "image_hover": mediaCollection.firstUrl('EngagementRingStyle', ring.ring_style_id, 'image-hover'),
                    "gender": null
                },
                "stone_shape": {
                    "id": ring.stone_shape_id,
                    "title": stoneTitle,
                    "slug": ring.stone_slug,
                    "image": filesystem.url(ring.stone_image)
                },
                "stone_size": {
                    "count": parseFloat(ring.stone_size),
                    "dimension": "ct"
                },
                "setting_type": ring.setting_type,
                "side_setting_type": ring.side_setting_type,
                "min_ring_size": {
                    "id": ring.min_ring_size_id,
                    "title": JSON.parse(ring.min_size),
                    "slug": ring.min_size_slug
                },
                "max_ring_size": {
                    "id": ring.max_ring_size_id,
                    "title": JSON.parse(ring.max_size),
                    "slug": ring.max_size_slug
                },
                "metal": {
                    "id": ring.metal_id,
                    "title": metalTitle,
                    "slug": ring.metal_slug,
                    "image": mediaCollection.firstUrl('Metal', ring.metal_id, 'image')
                },
                "offers": offers && offers.length > 0 ? offersFormatter(offers.filter(o => o.model_id === ring.id)) : [],
                "average_ss_colour": ring.average_ss_colour,
                "average_ss_clarity": ring.average_ss_clarity,
                "approx_stones": ring.approx_stones
            },
            "in_favorites": false,
            "in_compares": false,
            "product_type": "engagement-rings",
            "rate": reviewsStat ? parseFloat(reviewsStat.avg_rate) : 0,
            "reviews_count": reviewsStat ? parseFloat(reviewsStat.total) : 0,
            "selected_size": null
        }
    })
}

function weddingRings(rings, mediaCollection, offers, reviewsData, rate) {
    return rings.map(ring => {
        let name = tools.getValueInJson(ring.item_name, 'en');
        let styleTitle = tools.getValueInJson(ring.style_title, 'en');
        let metalTitle = tools.getValueInJson(ring.metal_title, 'en');
        let header = tools.getValueInJson(ring.header, 'en');
        let subHeader = tools.getValueInJson(ring.sub_header, 'en');
        let collectionTitle = tools.getValueInJson(ring.collection_title, 'en');
        let description = 'in ' + metalTitle;
        let h1 = collectionTitle + ' Wedding Ring';

        if (ring.gender === 'male') {
            h1 = 'Infinity Mens Wedding Ring';
        }

        let h2 = subHeader ? subHeader : description;
        let collectionDesc = tools.getValueInJson(ring.collection_desc, 'en');

        let collectionStoryTitle = tools.getValueInJson(ring.collection_story_title, 'en');
        let collectionStoryVideo = tools.getValueInJson(ring.collection_story_video, 'en');
        let collectionStoryText = tools.getValueInJson(ring.collection_story_text, 'en');

        let images = mediaCollection.get('WeddingRing', ring.id, 'wedding-images');
        let images360 = mediaCollection.get('WeddingRing', ring.id, 'wedding-images-3d').map(img => img.url);
        let video = mediaCollection.first('WeddingRing', ring.id, 'wedding-video');
        let video360 = mediaCollection.first('WeddingRing', ring.id, 'wedding-video-360');
        let reviewsStat = reviewsData.find(r => r.product_id === ring.id);

        return {
            "id": ring.id,
            "title": name,
            "subtitle": (styleTitle) ? styleTitle + ', ' + metalTitle : metalTitle,
            "h1": h1,
            "h2": h2 + " (" + ring.sku + ")",
            "header": header ? header : h1,
            "slug": ring.slug,
            "sku": ring.sku,
            "group_sku": ring.group_sku,
            'preview_image': images.length > 0 ? mediaImage(images[0]) : null,
            'images': images.map(image => mediaImage(image)),
            'images_360': images360.length > 0 ? images360 : null,
            "video": mediaVideo(video),
            "price": calculateRingPrice(ring, rate),
            'description': description ? description : collectionDesc,
            "options": {
                "carat_weight": ring.carat_weight,
                "gender": ring.gender,
                "band_width": {
                    "count": parseFloat(ring.band_width),
                    "dimension": "mm"
                },
                "ring_collection": {
                    "id": ring.ring_collection_id,
                    "title": collectionTitle,
                    "slug": ring.collection_slug,
                    "description": collectionDesc,
                    "story": (collectionStoryTitle || collectionStoryVideo || collectionStoryText) ? {"title": collectionStoryTitle, "video": collectionStoryVideo, "text": collectionStoryText} : null
                },
                "ring_style": {
                    "id": ring.ring_style_id,
                    "title": styleTitle,
                    "slug": ring.style_slug,
                    "image": mediaCollection.firstUrl('WeddingRingStyle', ring.ring_style_id, 'image'),
                    "image_hover": mediaCollection.firstUrl('WeddingRingStyle', ring.ring_style_id, 'image-hover'),
                    "gender": ring.style_gender
                },
                "stone_size": {
                    "count": parseFloat(ring.stone_size),
                    "dimension": "ct"
                },
                "side_setting_type": ring.side_setting_type,
                "min_ring_size": {
                    "id": ring.min_ring_size_id,
                    "title": JSON.parse(ring.min_size),
                    "slug": ring.min_size_slug
                },
                "max_ring_size": {
                    "id": ring.max_ring_size_id,
                    "title": JSON.parse(ring.max_size),
                    "slug": ring.max_size_slug
                },
                "metal": {
                    "id": ring.metal_id,
                    "title": metalTitle,
                    "slug": ring.metal_slug,
                    "image": mediaCollection.firstUrl('Metal', ring.metal_id, 'image')
                },
                "offers": offers && offers.length > 0 ? offersFormatter(offers.filter(o => o.model_id === ring.id)) : [],
                "approx_stones": ring.approx_stones,
            },
            "in_favorites": false,
            "in_compares": false,
            "product_type": "wedding-rings",
            "rate": reviewsStat ? parseFloat(reviewsStat.avg_rate) : 0,
            "reviews_count": reviewsStat ? parseFloat(reviewsStat.total) : 0,
            "selected_size": null,
            "video_360": mediaVideo(video360),
        }
    })
}

exports.weddingRings = weddingRings;

exports.homeSlider = (data) => {
    let slides = [];

    if (data) {
        for (let i = 0; i < data.length; i++) {
            let row = data[i];

            slides[i] = {
                "image": filesystem.url(row.image),
                "bg_color": row.bg_color,
                "alt": tools.getValueInJson(row.alt, 'en'),
                "slider_text": tools.getValueInJson(row.slider_text, 'en'),
                "browse_button_title": tools.getValueInJson(row.browse_button_title, 'en'),
                "browse_button_link": tools.getValueInJson(row.browse_button_link, 'en'),
                "detail_button_title": tools.getValueInJson(row.detail_button_title, 'en'),
                "detail_button_link": tools.getValueInJson(row.detail_button_link, 'en'),
            }
        }
    }

    return {
        is_slider: true,
        is_video: false,
        slides: slides,
        video: null,
    };
};

exports.shapeBanners = function(data, mediaCollection) {
    let items = [];

    if (data) {
        for (let i = 0; i < data.length; i++) {
            let item = data[i];

            items[i] = {
                "id": item.id,
                "title": tools.getValueInJson(item.title, 'en'),
                "slug": item.slug,
                "alt": tools.getValueInJson(item.alt, 'en'),
                "preview_image": filesystem.url(item.preview_image),
                "banner": mediaCollection.firstUrl('Shape', item.id, 'banner')
            }
        }
    }

    return items;
};

exports.metaData = (data) => {
    return {
        "title": tools.getValueInJson(data.title, 'en'),
        "description": tools.getValueInJson(data.description, 'en'),
        "keywords": tools.getValueInJson(data.keywords, 'en'),
        "h1": tools.getValueInJson(data.h1, 'en'),
        "seo_text": tools.getValueInJson(data.seo_text, 'en'),
    };
};

exports.currencyRate = (data) => {
    let result = [];

    for (let i = 0; i < data.length; i++) {
        var item = data[i];
        result[i] = {
            'code': item.from_currency,
            'name': item.from_currency,
        };
    }

    return result;
};

exports.locations = (data) => {
    let result = [];

    for (let i = 0; i < data.length; i++) {
        let item = data[i];

        result[i] = {
            'code': item.code,
            'name': tools.getValueInJson(item.name, 'en'),
            'can_ship': item.shipment === 1,
            'vat_percent': item.vat
        };
    }

    return result;
};

exports.metals = (data, mediaCollection) => {
    let result = [];

    for (let i = 0; i < data.length; i++) {
        let item = data[i];

        result[i] = {
            "id": item.id,
            "title": tools.getValueInJson(item.title, 'en'),
            "slug": item.slug,
            "image": mediaCollection.firstUrl('Metal', item.id, 'image'),
            "engagement": item.engagement_off === 0
        };
    }

    return result;
};

exports.ringStyles = (data, mediaCollection, modelType) => {
    let result = [];

    for (let i = 0; i < data.length; i++) {
        let item = data[i];

        result[i] = {
            "id": item.id,
            "title": tools.getValueInJson(item.title, 'en'),
            "slug": item.slug,
            "image": mediaCollection.firstUrl(modelType, item.id, 'image'),
            "image_hover": mediaCollection.firstUrl(modelType, item.id, 'image-hover'),
            "gender": item.gender || null
        };
    }

    return result;
};

exports.createMediaCollection = (medias) => {
    var result = {};

    for (let i = 0; i < medias.length; i++) {
        let media = medias[i];
        let item = {
            'id': media.id,
            'model': media.model_type.split('\\').pop(),
            'model_id': media.model_id,
            'collection': media.collection_name,
            'order': media.order_column,
            'file': media.file_name,
            'base_url': filesystem.baseUrl(media.disk) + `/${media.collection_name}/${media.id}`,
            'url': mediaUrl(media),
            'name': media.name,
            'mime': media.mime_type,
            'size': media.size,
        };

        if (!result[item.model]) {
            result[item.model] = {};
        }

        if (!result[item.model][item.model_id]) {
            result[item.model][item.model_id] = {};
        }

        if (!result[item.model][item.model_id][item.collection]) {
            result[item.model][item.model_id][item.collection] = [];
        }

        result[item.model][item.model_id][item.collection].push(item);
    }

    class MediaCollection {
        constructor(medias) {
            this.medias = medias;
        }

        all() {
            return this.medias;
        }

        get (model, id, collection) {
            return (this.medias[model] && this.medias[model][id] && this.medias[model][id][collection]) ? this.medias[model][id][collection] : []
        }

        first (model, id, collection) {
            let items = this.get(model, id, collection);
            return items.length > 0 ? items[0] : null
        }

        firstUrl (model, id, collection) {
            let media = this.first(model, id, collection);
            return media ? media.url : '';
        }
    }

    return new MediaCollection(result);
};

exports.menuDownImages = (mediaFormatted) => {
    if (!mediaFormatted) {
        return [];
    }

    return mediaFormatted.map(media => {
        return {image_url: media.url};
    });
};

exports.showRooms = (data) => {
    let result = [];

    for (let i = 0; i < data.length; i++) {
        let item = data[i];

        result[i] = {
            "country_code": item.code,
            "country_title": tools.getValueInJson(item.title, 'en'),
            'show_rooms': []
        };

        for (let y = 0; y < data.length; y++) {
            if (item.country_id !== data[y].country_id) {
                continue;
            }

            result[i]['show_rooms'].push({
                "title": tools.getValueInJson(item.geo_title, 'en'),
                "description": tools.getValueInJson(item.description, 'en'),
                "location": {
                    "lat": item.geo_position_lat,
                    "lng": item.geo_position_lng
                },
                "address": tools.getValueInJson(item.address, 'en'),
                "image": filesystem.url(item.image),
                "youtube_link": tools.getValueInJson(item.youtube_link, 'en'),
                "phone": {
                    "number": item.phone,
                    "description": tools.getValueInJson(item.phone_description, 'en'),
                },
                "schedule": tools.getValueInJson(item.schedule, 'en'),
                "expert": {
                    "title": tools.getValueInJson(item.expert_title, 'en'),
                    "text": tools.getValueInJson(item.expert_text, 'en'),
                    "list_1": tools.getValueInJson(item.expert_list_1, 'en'),
                    "list_2": tools.getValueInJson(item.expert_list_2, 'en'),
                    "list_3": tools.getValueInJson(item.expert_list_3, 'en'),
                    "name": tools.getValueInJson(item.expert_name, 'en'),
                    "email": item.expert_email,
                    "photo": filesystem.url(tools.getValueInJson(item.expert_photo, 'en'))
                }
            })
        }
    }

    return result;
};

exports.contactTags = (blocks) => {
    if (!blocks) {
        return [];
    }

    return blocks.filter(block => block.block_type === 'tag-links').map(block => {
        return {
            id: block.id,
            title: tools.getValueInJson(block.title, 'en'),
            link: tools.getValueInJson(block.link, 'en'),
        }
    });
};

exports.contactSchedule = (blocks) => {
    if (!blocks) {
        return [];
    }

    let schedule = blocks.filter(block => block.block_type === 'simple-text').map(block => {
        return {
            id: block.id,
            text: tools.getValueInJson(block.text, 'en'),
        }
    });

    return schedule.length > 0 ? schedule[0] : {}
};

exports.supportContacts = (links) => {
    if (!links) {
        return [];
    }

    return links.map(link => {
        let values = JSON.parse(link.value);
        return {
            "id": link.id,
            "service": link.service,
            "contacts": values.map(item => item.value)
        }
    });
};

exports.filterVideo = (videos) => {
    if (!videos) {
        return {};
    }

    let result = {};

    for (let i = 0; i < videos.length; i++) {
        let video = videos[i];

        if (!result[video.product_feed]) {
            result[video.product_feed] = {}
        }

        if (!result[video.product_feed][video.slug]) {
            result[video.product_feed][video.slug] = {};
        }

        result[video.product_feed][video.slug] = tools.getValueInJson(video.video_link, 'en')
    }

    return result;
};

exports.productCategories = (categories) => {
    if (!categories) {
        return [];
    }

    return categories.map(cat => {
        return {
            "id": cat.id,
            "name": tools.getValueInJson(cat.name, 'en'),
            "slug": tools.getValueInJson(cat.slug, 'en'),
            "image": filesystem.url(cat.image),
            "alt": tools.getValueInJson(cat.alt, 'en')
        }
    });
};

exports.customJewelry = (jewelry, mediaCollection) => {
    let video = mediaCollection.first('StaticBlock', jewelry.id, 'video');
    return {
        "title1": tools.getValueInJson(jewelry.title, 'en'),
        "title2": tools.getValueInJson(jewelry.subtitle, 'en'),
        "title3": tools.getValueInJson(jewelry.text, 'en'),
        "video": mediaVideo(video),
        "images_360": mediaCollection.get('StaticBlock', jewelry.id, 'static-images-3d').map(item => item.url)
    }
};

exports.mediaVideo = mediaVideo;

exports.occasionSliderData = (blockEngagementRings, mediaCollection, offers, reviewsData, rate) => {
    if (!blockEngagementRings) {
        return {'title': '', 'products': []};
    }

    return {
        'title': tools.getValueInJson(blockEngagementRings[0].block_title, 'en'),
        'products': engagementRings(blockEngagementRings, mediaCollection, offers, reviewsData, rate)
    };
};

function offersFormatter(queryRawOffers)
{
    if (!queryRawOffers || queryRawOffers.length === 0) {
        return [];
    }

    return queryRawOffers.map(offer => {
        return {
            'id': offer.id,
            'slug': offer.slug,
            'title': tools.getValueInJson(offer.title, 'en'),
        }
    });
}

exports.offers = offersFormatter;
