import { get } from "lodash"

class TooltipStoreBuilder {
  constructor() {

    this.hints = {
      shared: {
        subscribeOffers: "I am in the footer"
      },
      diamondsFeed: {
        tripleExcellent: "Stones that have Excellent cut, polish and symmetry on their GIA grading reports."
      },
      diamond: {
        shape: 'The shape of a diamond is admired as much as the sparkle. Round Brilliant Cut, Princess Cut, Emerald Cut and more, take a closer look at size and shape to find the diamond you love.',
        carat: 'Diamond carat (ct) is the measurement used to determine how much a diamond weighs, with 1 carat equal to 200 milligrams. Bear in mind that a diamond’s weight shouldn’t be confused with actual size. Higher carat weight doesn’t necessarily mean the diamond will look bigger this is why your dimensions are more important on how big your diamond will look.',
        color: 'Diamonds are colour-graded on a D-Z scale where D is considered colourless with a higher value unless, of course, it’s a Fancy Colour. Nearer Z, you’ll find more hints of yellow. Whatever the alphabet or colour, the world’s a brighter place with diamonds in it.',
        clarity: 'When it comes to grading the clarity of a diamond, the focus is on internal flaws, referred to as inclusions, and blemishes on the surface. Fewer flaws result in a higher clarity grade with a flawless diamond considered the rarest.',
        cut: 'Diamond cut is not about the shape, it’s all about the brilliance, fire and sparkle. Proportions, symmetry and polish will catch and reflect the light to make a diamond beautiful.',
        polish: 'Diamond polish brings shine, smoothness and a sparkling finish to the surface of a diamond. Microscopic marks such as slight nicks or abrasions will be noted by the grading experts. GIA rate polish from Excellent to Poor.',
        symmetry: 'Diamond symmetry refers to size, shape and symmetrical arrangement of the diamond’s individual facets. Symmetry (and polish) determine the overall quality of finish and appearance, which is key to the diamond’s sparkle. Symmetry is graded from Excellent to Poor.',
        fluorescence: 'When we talk about diamond fluorescence, it’s the natural glow a diamond gives off when exposed to ultraviolet (UV) light. If a diamond is graded with strong fluorescence, it may result in a slightly lower price. GIA fluorescence grade is None, Faint , Medium , Strong , Very strong .',
        dimensions: 'A diamond’s dimensions (width and depth) are measured in millimetres (mm) to determine the actual size of the stone – how it looks on your hand. While these measurements can relate to carat, carat is about weight, not a diamond’s size.',
        depth: 'Diamond depth is what the diamond measures from (table) top to bottom( culet), the distinctive tip at the lowest point of the stone. Diamonds also have a depth percentage, which is the ratio of depth to width. Table and depth are key to a diamond’s fabulous sparkle.',
        table: 'Think of the diamond’s table as a table top, the facet at the upper top of the diamond. It happens to be the largest facet, too. The table captures the light and refracts it towards other facets to create the diamond’s overall signature sparkle.',
        girdle: 'The diamond girdle is the perimeter of a diamond, the outer edge that divides the crown at the top from the pavilion below. The girdle’s appearance can be rough, polished or faceted with a rating range from thin to thick.',
        culet: 'Tiny point at the base of the pavilion, where the facets of the pavilion meet. The culet is rated from None (ideal) to Extremely Large (highly visible and will affect appearance of diamond).',
        certificate: 'The diamond’s certificate number is the unique number displayed on the official GIA Grading report. This certificate includes the 4Cs, which defines a diamond’s characteristics, value and uniqueness.Most GIA diamonds have the certifcate number laser inscribed on the girdle of the diamond to match up with the GIA certificate.',
        stockNumber: 'The diamond’s stock number is the unique number engraved on the actual diamond. This number corresponds with the number on the diamond’s GIA Grading Report certificate, which shows a buyer it is a certified diamond.'
      },
      engagementRing: {
        metal: "Engagement rings are available in different metals to appeal to personal preferences. If you love gold, the range includes White Gold, Yellow Gold and Rose Gold. Based on the karat system, if it is 18ct gold, it’s mostly gold mixed with other durable metals.",
        bandWidth: "When it comes to engagement ring band width, it very much depends on personal preference and the design of the ring. Popular width choices are around 2.5mm but you can go for a wider band at 6mm if you love a statement piece.",
        ringSizes: "The right ring size is everything. It means a comfortable fit and you can wear it with confidence. The average woman’s ring finger measuring around a Size 6. Choose the diamond carat weight to complement ring size.",
        stoneShape: "The shape of a diamond is admired as much as the sparkle. Round Brilliant Cut, Princess Cut, Emerald Cut and more, take a closer look at size and shape to find the diamond you love.",
        stoneSize: "stone size",
        sideSettingType: "side setting type",
        settingType: "Setting refers to how stones are set into a metal band. It helps create the overall design aesthetic and highlights the beauty of a diamond.",
        collection: "collection",
        approxCarat: "Diamond carat (ct) is the measurement used to determine how much a diamond weighs, with 1 carat equal to 200 milligrams. Bear in mind that a diamond’s weight shouldn’t be confused with actual size. Higher carat weight doesn’t necessarily mean the diamond will look bigger this is why your dimensions are more important on how big your diamond will look.",
        avgStoneClarity: "When it comes to grading the clarity of a diamond, the focus is on internal flaws, referred to as inclusions, and blemishes on the surface. Fewer flaws result in a higher clarity grade with a flawless diamond considered the rarest.",
        avgStoneColor: "Diamonds are colour-graded on a D-Z scale where D is considered colourless with a higher value unless, of course, it’s a Fancy Colour. Nearer Z, you’ll find more hints of yellow. Whatever the alphabet or colour, the world’s a brighter place with diamonds in it.",
        approxStoneCount: "approx stone count"
      },
      weddingRing: {
        metal: "Popular and beautiful metals for wedding rings include Yellow Gold, White Gold, Rose Gold, Gold 18ct, and Platinum 950. These metals also look incredible set with diamonds to achieve a unique look and are great for long-term wear.",
        bandWidth: "Choice of wedding band width often depends on the width of the engagement ring as you’ll want both rings to complement each other. Narrow width is typically 2mm or you can go for a much wider band at around 7mm-10mm.",
        ringSizes: "",
        stoneShape: "If you’ve fallen in love with a diamond-set wedding ring, the shape of the stones in the ring is whatever you want them to be. You can go for the most popular which is round or for something a bit different like princess or baguette cut diamonds.",
        stoneSize: "stone size",
        sideSettingType: "side setting type",
        settingType: "setting type",
        collection: "collection",
        approxCarat: "Diamond-set wedding rings are a modern, fashionable choice. Diamond carat weight measures total weight of the diamonds with price rising proportionately with carat weight.",
        approxStoneCount: "If you’ve fallen in love with a diamond-set wedding ring, the number of stones in the ring is whatever you want them to be. Although its best to match the number of diamonds on your wedding ring to suit your engagement ring.",
        thickness: `Find the perfect width for your finger! It depends on your comfort wearing the ring or wedding band. Choose the width of the ring based on the length and size of the hand and fingers. If you want to engrave on the rings, then it is better to choose rings with a breadth of 3 mm or more. The common width of the wedding ring is from 4 to 6 mm. A ring or wedding band is considered narrow if the breadth of their surface is from 2 to 4 mm, medium - within 4 to 6 mm, and wide - from 6 to 8 mm. Different ring widths suit different fingers. Products of 2 to 6 mm breadth are optimal for fingers of medium length (for women) and width of 4 to 8 mm (for men). These parameters are determined by the individual preferences of each person. GS Diamonds experts will be happy to help you make the right choice. Do not hesitate to book an appointment.`
      },
      checkout: {
        secureShopping: 'We make your shopping experience safe and secure with SSL technology, encrypting personal data so you can shop with confidence.',
        paymentOptions: 'We accept major credit cards and debit cards or you can pay with PayPal or Bank Transfer. We also offer an Interest Free finance plan.',
        refunds: 'From the date your order is shipped, return it within 30 days to receive a refund. We offer a 30 day money back guarantee both in store and online.',
        saleTax: 'GST for Australia',
        whatIsIncluded: 'Gift wrap, box or bag appropriate for the item, GS Diamonds booklet "Jewellery Care Book"',
        referral_discount: 'Referral discount that you will receive based on your purchase amount. '
      },
      rings: {
        metal: "Engagement rings are available in different metals to appeal to personal preferences. If you love gold, the range includes White Gold, Yellow Gold and Rose Gold. Based on the karat system, if it is 18ct gold, it’s mostly gold mixed with other durable metals.",
        bandWidth: "When it comes to engagement ring band width, it very much depends on personal preference and the design of the ring. Popular width choices are around 2.5mm but you can go for a wider band at 6mm if you love a statement piece.",
        ringSizes: "The right ring size is everything. It means a comfortable fit and you can wear it with confidence. The average woman’s ring finger measuring around a Size 6. Choose the diamond carat weight to complement ring size.",
        stoneShape: "The shape of a diamond is admired as much as the sparkle. Round Brilliant Cut, Princess Cut, Emerald Cut and more, take a closer look at size and shape to find the diamond you love.",
        stoneSize: "stone size",
        sideSettingType: "side setting type",
        settingType: "Setting refers to how stones are set into a metal band. It helps create the overall design aesthetic and highlights the beauty of a diamond.",
        collection: "collection",
        approxCarat: "Diamond carat (ct) is the measurement used to determine how much a diamond weighs, with 1 carat equal to 200 milligrams. Bear in mind that a diamond’s weight shouldn’t be confused with actual size. Higher carat weight doesn’t necessarily mean the diamond will look bigger this is why your dimensions are more important on how big your diamond will look.",
        avgStoneClarity: "When it comes to grading the clarity of a diamond, the focus is on internal flaws, referred to as inclusions, and blemishes on the surface. Fewer flaws result in a higher clarity grade with a flawless diamond considered the rarest.",
        avgStoneColor: "Diamonds are colour-graded on a D-Z scale where D is considered colourless with a higher value unless, of course, it’s a Fancy Colour. Nearer Z, you’ll find more hints of yellow. Whatever the alphabet or colour, the world’s a brighter place with diamonds in it.",
        approxStoneCount: "approx stone count",
      },
    };
  }

  get(path) {
    return get(this.hints, path, '')
  }
}

const TooltipStore = new TooltipStoreBuilder();

export default TooltipStore;
