export function testJsonFromCsv() {
  const str = `Seller Name,Name Code,Shape,Weight,Color,Clarity,Cut,Polish,Symmetry,Fluorescence Intensity,Measurements,Lab,Certificate Number,Stock Number,Total Price,Depth,Table,Girdle,Culet,Certificate URL,Image URL,RapSpec,Table Percent,Depth Percent,Laser Inscription,Diamond ID
DHARMANANDAN DIAMONDS,DHARAM,Round,0.300,D,SI1,Excellent,Excellent,Excellent,None,4.26 x 4.29 x 2.65,GIA,5191872254,RSH568220,503.7000,61.90% ,59.00% ,Medium - Slightly Thick,,https://assets.ddpl.com/certificate/5191872254,,1,59.00,61.9,,100528856
DHARMANANDAN DIAMONDS,DHARAM,Round,0.300,D,SI1,Excellent,Excellent,Excellent,None,4.28 x 4.30 x 2.67,GIA,5191859214,RSH558207,503.7000,62.10% ,57.00% ,Medium - Slightly Thick,,https://assets.ddpl.com/certificate/5191859214,,1,57.00,62.1,,100272230
DHARMANANDAN DIAMONDS,DHARAM,Round,0.300,D,SI1,Excellent,Excellent,Excellent,None,4.29 x 4.31 x 2.66,GIA,6325629551,SSH162039,503.7000,61.90% ,59.00% ,Medium - Slightly Thick,,https://assets.ddpl.com/certificate/6325629551,https://assets.ddpl.com/mplayer/SSH162039?w=400&back=fff&btncolor=2d2d2d&btnw=30&btn=0,1,59.00,61.9,,104498906
DHARMANANDAN DIAMONDS,DHARAM,Round,0.300,D,SI1,Excellent,Excellent,Excellent,None,4.29 x 4.32 x 2.63,GIA,2191873559,RSH570088,503.7000,61.10% ,58.00% ,Slightly Thick - Slightly Thick,,https://assets.ddpl.com/certificate/2191873559,,1,58.00,61.1,,100528977`;
  createJsonFromCsv(str);
}

export function createJsonFromCsv(csv) {
  const lines = csv.split("\n");
  const headers = lines[0]
    .split(",")
    .map(item => item.replace(/\s/g, "_").toLowerCase());
  let arr = [];

  for (let i = 1; i < lines.length; i++) {
    let item = {};

    lines[i].split(",").forEach((element, index) => {
      item[headers[index]] = element;
    });

    arr.push(item);
  }

  return arr;
}
