const database = require( "./../utils/databaseDriver");
const queryFormatter = require( "./../utils/queryFormatter");

function createMediaSql(conditions) {
    let cond = [];

    for (let type in conditions) {
        cond.push("(model_type='" + type + "' AND model_id IN(" + conditions[type].join(',') + "))");
    }

    return 'select `id`,`model_type`,`model_id`,`collection_name`,`name`,`file_name`,`disk`,`order_column`,`custom_properties`,`mime_type`,`size` ' +
        'from media ' +
        'where ' + cond.join(' OR ');
}

exports.desktop = async function() {
    const db = await database;

    let sql = 'select s.*' +
        'from main_sliders ms ' +
        'inner join main_slider_main_slider_slide msmss ON msmss.main_slider_id=ms.id ' +
        'inner join main_slider_slides s ON msmss.main_slider_slide_id=s.id ' +
        'where ms.title=?';

    const [slides] = await db.execute(sql, ['default']);

    return queryFormatter.homeSlider(slides);
};

exports.shapesBanners = async function() {
    const db = await database;

    const [rows] = await db.execute('select * from shapes');

    let cond = {
        'lenal\\\\catalog\\\\Models\\\\Diamonds\\\\Shape': rows.map(item => item.id)
    };

    const [medias] = await db.execute(createMediaSql(cond));
    const mediaCollection = queryFormatter.createMediaCollection(medias);

    return queryFormatter.shapeBanners(rows, mediaCollection);
};

exports.metaData = async function(page) {
    const db = await database;

    const [rows] = await db.execute('select * from seo_meta where page=?', [page]);

    return rows.length > 0 ? queryFormatter.metaData(rows[0]) : [];
};

exports.locationData = async function() {
    const db = await database;

    const [rates, rateFields] = await db.execute('select from_currency from currency_rates');
    const [locations, locFields] = await db.execute('select * from locations where shipment=1 order by name');

    return {
        "lang": [
            {
                "code": "en",
                "name": "English"
            },
            {
                "code": "zh",
                "name": "Cantonese Chinese"
            },
            {
                "code": "cmn",
                "name": "Mandarin Chinese"
            }
        ],

        'currency': queryFormatter.currencyRate(rates),
        'location': queryFormatter.locations(locations),
        'selected': null
    };
};

exports.menuDropdown = async function() {
    const db = await database;

    const [menuItems] = await db.execute('select id,menu_item from menu_dropdown_contents where locale=?', ['en']);
    const [engagementStyles] = await db.execute('select * from engagement_ring_styles');
    const [weddingStyles] = await db.execute('select * from wedding_ring_styles');
    let [metals] = await db.execute('select * from metals');

    let cond = {
        'lenal\\\\additional_content\\\\Models\\\\MenuDropdownContent': menuItems.map(item => item.id),
        'lenal\\\\catalog\\\\Models\\\\Rings\\\\EngagementRingStyle': engagementStyles.map(item => item.id),
        'lenal\\\\catalog\\\\Models\\\\Rings\\\\WeddingRingStyle': weddingStyles.map(item => item.id),
        'lenal\\\\catalog\\\\Models\\\\Rings\\\\Metal': metals.map(item => item.id)
    };

    const [medias] = await db.execute(createMediaSql(cond));
    const mediaCollection = queryFormatter.createMediaCollection(medias);

    let result = {};

    metals = queryFormatter.metals(metals, mediaCollection);

    for (let i = 0; i < menuItems.length; i++) {
        let item = menuItems[i];
        let type = item.menu_item;

        result[type] = {};

        if (type === 'diamonds') {
            result[type]['images'] = queryFormatter.menuDownImages(mediaCollection.get('MenuDropdownContent', item.id, 'menu_dropdowns'));
        }

        if (type === 'engagement-rings') {
            result[type] = {
                'style': queryFormatter.ringStyles(engagementStyles, mediaCollection, 'EngagementRingStyle'),
                'metal': metals.filter((item) => item.engagement),
            }
        }

        if (type === 'wedding-rings') {
            result[type] = {
                'images': queryFormatter.menuDownImages(mediaCollection.get('MenuDropdownContent', item.id, 'menu_dropdowns')),
                'style': {
                    'male': queryFormatter.ringStyles(weddingStyles.filter((item) => item.gender === 'male'), mediaCollection, 'WeddingRingStyle'),
                    'female': queryFormatter.ringStyles(weddingStyles.filter((item) => item.gender === 'female'), mediaCollection, 'WeddingRingStyle'),
                },
                'metal': metals,
            };
        }
    }

    return result;
};

exports.showRooms = async function() {
    const db = await database;

    const $sql = 'select c.code,c.title,r.*' +
        'from show_room_countries c ' +
        'inner join show_rooms r on r.country_id=c.id';
    const [rows] = await db.execute($sql);

    return queryFormatter.showRooms(rows);
};

exports.contactsPage = async function() {
    const db = await database;
    const [pages] = await db.execute('select * from dynamic_pages where page=?', ['contacts']);
    const page = pages[0] || 0;

    const [blocks] = await db.execute("select `id`,`title`,`link`, `text`, `block_type` from static_blocks where dynamic_page_id=? and block_type in('tag-links', 'simple-text')", [page.id]);
    const [links] = await db.execute("select * from contact_links where `value` IS NOT NULL and `value` != ''");

    return {
        'tags': queryFormatter.contactTags(blocks),
        'schedule': queryFormatter.contactSchedule(blocks),
        'supportContacts': queryFormatter.supportContacts(links),
    };
};

exports.filterVideos = async function() {
    const db = await database;

    const [videos] = await db.execute('select * from filter_descriptions');

    return queryFormatter.filterVideo(videos);
};

exports.productCategories = async function() {
    const db = await database;

    const [categories] = await db.execute('select * from product_categories');

    return queryFormatter.productCategories(categories);
};

exports.customJewelry = async function() {
    const db = await database;

    const [pages] = await db.execute('select * from dynamic_pages where page=?', ['homepage']);
    const page = pages[0];

    const [jewelries] = await db.execute("select `id`, `title`,`subtitle`, `text` from static_blocks where dynamic_page_id=? and block_type=?", [page.id, 'story-custom-jewerly']);
    const jewelry = jewelries[0] || null;

    if (jewelry) {
        let cond = {
            'lenal\\\\blocks\\\\Models\\\\StaticBlock': [jewelry.id]
        };

        const [medias] = await db.execute(createMediaSql(cond));
        const mediaCollection = queryFormatter.createMediaCollection(medias);

        return queryFormatter.customJewelry(jewelry, mediaCollection);
    }

    return queryFormatter.customJewelry(null);
};

exports.occasionSliderData = async function() {
    const db = await database;

    const [pages] = await db.execute('select * from dynamic_pages where page=?', ['homepage']);
    const page = pages[0];

    const [blockEngagementRings] = await db.execute("SELECT b.title AS block_title, be.static_block_id, r.*," +
        "s.title AS stone_title,s.slug AS stone_slug,s.preview_image AS stone_image," +
        "st.title AS style_title,st.slug AS style_slug," +
        "m.title AS metal_title,m.slug AS metal_slug," +
        "c.title AS collection_title,c.description AS collection_desc,c.slug AS collection_slug,c.story_title AS collection_story_title,c.story_video AS collection_story_video,c.story_text AS collection_story_text," +
        "sm.slug AS min_size_slug,sm.size AS min_size," +
        "smx.slug AS max_size_slug,smx.size AS max_size " +
        "FROM static_blocks b " +
        "INNER JOIN static_blocks_engagement_rings be ON be.static_block_id=b.id " +
        "INNER JOIN engagement_rings r ON r.id=be.engagement_ring_id " +
        "LEFT JOIN shapes s ON s.id=r.stone_shape_id " +
        "LEFT JOIN engagement_ring_styles st ON st.id=r.ring_style_id " +
        "LEFT JOIN metals m ON m.id=r.metal_id " +
        "LEFT JOIN ring_collections c ON c.id=r.ring_collection_id " +
        "LEFT JOIN ring_sizes sm ON sm.id=r.min_ring_size_id " +
        "LEFT JOIN ring_sizes smx ON smx.id=r.max_ring_size_id " +
        "WHERE dynamic_page_id=? AND block_type=?", [page.id, 'occasion-special']);

    let modelsIds = blockEngagementRings.map(item => item.id);

    const [offers] = await fetchOffers(db, 'lenal\\catalog\\Models\\Rings\\EngagementRing', modelsIds);
    const [reviewsData] = await fetchReviews(db, 'lenal\\catalog\\Models\\Rings\\EngagementRing', modelsIds);

    let cond = {
        'lenal\\\\catalog\\\\Models\\\\Rings\\\\EngagementRing': modelsIds,
        'lenal\\\\catalog\\\\Models\\\\Rings\\\\EngagementRingStyle': blockEngagementRings.map(item => item.ring_style_id),
        'lenal\\\\catalog\\\\Models\\\\Rings\\\\Metal': blockEngagementRings.map(item => item.metal_id)
    };

    const [medias] = await db.execute(createMediaSql(cond));
    const mediaCollection = queryFormatter.createMediaCollection(medias);

    const [rateRes] = await fetchRate(db);
    const rate = rateRes ? rateRes[0].rate : 1.0;
    return queryFormatter.occasionSliderData(blockEngagementRings, mediaCollection, offers, reviewsData, rate);
};

function fetchOffers(db, type, modelsIds)
{
    if (modelsIds.length === 0) {
        return [];
    }

    let sql = 'SELECT o.id,o.title,o.slug,r.model_id ' +
        'FROM offer_relations r ' +
        'INNER JOIN offers o ON o.id=r.offer_id ' +
        'WHERE r.model_type=? AND r.model_id IN('+ modelsIds.join(',') +')';

    return db.execute(sql, [type]);
}

function fetchReviews(db, type, modelsIds)
{
    if (modelsIds.length === 0) {
        return [];
    }

    let sql = 'SELECT product_id,COUNT(id) AS total, AVG(rate) AS avg_rate ' +
        'FROM reviews ' +
        'WHERE product_type=? AND product_id IN('+ modelsIds.join(',') +') AND is_active=1 ' +
        'GROUP BY product_id';

    return db.execute(sql, [type]);
}

function fetchRate(db)
{
    let userCurrency = 'AUD';
    let baseCurrency = 'AUD';
    let sql = 'SELECT rate FROM currency_rates WHERE to_currency=? AND from_currency=?';

    return db.execute(sql, [baseCurrency, userCurrency]);
}

exports.weddingRingsSliderData = async function() {
    const db = await database;

    const [modelIds] = await db.execute('select model_id from media where model_type=? AND collection_name=? GROUP BY model_id', ['lenal\\catalog\\Models\\Rings\\WeddingRing', 'wedding-images-3d']);
    let ids = modelIds.map(item => item.model_id);
    const [maleWeddingRings] = await fetchWeddingRingForSlider(db, ids, 'male');
    const [femaleWeddingRings] = await fetchWeddingRingForSlider(db, ids, 'female');

    let modelsIds = [];
    let ringStyleIds = [];
    let metalIds = [];

    if (maleWeddingRings) {
        modelsIds = maleWeddingRings.map(item => item.id);
        ringStyleIds = maleWeddingRings.map(item => item.ring_style_id);
        metalIds = maleWeddingRings.map(item => item.metal_id);
    }

    if (femaleWeddingRings) {
        modelsIds = [...modelsIds,...femaleWeddingRings.map(item => item.id)];
        ringStyleIds = [...ringStyleIds,...femaleWeddingRings.map(item => item.ring_style_id)];
        metalIds = [...metalIds,...femaleWeddingRings.map(item => item.metal_id)];
    }

    const [offers] = await fetchOffers(db, 'lenal\\catalog\\Models\\Rings\\WeddingRing', modelsIds);
    const [reviewsData] = await fetchReviews(db, 'lenal\\catalog\\Models\\Rings\\WeddingRing', modelsIds);

    let cond = {
        'lenal\\\\catalog\\\\Models\\\\Rings\\\\WeddingRing': modelsIds,
        'lenal\\\\catalog\\\\Models\\\\Rings\\\\WeddingRingStyle': ringStyleIds,
        'lenal\\\\catalog\\\\Models\\\\Rings\\\\Metal': metalIds
    };

    const [medias] = await db.execute(createMediaSql(cond));
    const mediaCollection = queryFormatter.createMediaCollection(medias);

    const [rateRes] = await fetchRate(db);
    const rate = rateRes ? rateRes[0].rate : 1.0;

    return {
        'man': maleWeddingRings ? queryFormatter.weddingRings(maleWeddingRings, mediaCollection, offers, reviewsData, rate) : [],
        'woman': femaleWeddingRings ? queryFormatter.weddingRings(femaleWeddingRings, mediaCollection, offers, reviewsData, rate) : []
    }
};

function fetchWeddingRingForSlider(db, ids, gender)
{
    return db.execute("SELECT r.*," +
        "st.title AS style_title,st.slug AS style_slug,st.gender AS style_gender," +
        "m.title AS metal_title,m.slug AS metal_slug," +
        "c.title AS collection_title,c.description AS collection_desc,c.slug AS collection_slug,c.story_title AS collection_story_title,c.story_video AS collection_story_video,c.story_text AS collection_story_text," +
        "sm.slug AS min_size_slug,sm.size AS min_size," +
        "smx.slug AS max_size_slug,smx.size AS max_size " +
        "FROM wedding_rings r " +
        "LEFT JOIN wedding_ring_styles st ON st.id=r.ring_style_id " +
        "LEFT JOIN metals m ON m.id=r.metal_id " +
        "LEFT JOIN ring_collections c ON c.id=r.ring_collection_id " +
        "LEFT JOIN ring_sizes sm ON sm.id=r.min_ring_size_id " +
        "LEFT JOIN ring_sizes smx ON smx.id=r.max_ring_size_id " +
        "WHERE r.id IN(" + ids.join(',') + ") AND r.gender=? ORDER BY RAND() LIMIT 10", [gender]);
}

