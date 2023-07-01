// input state (need only to order west/east)
const ZonesSquare = {
  coords: [-2997.4, -1115.5, -242.9, -1213.9, 1659.6, 900.0],
};

// input cities
const pawnString = `
{4, "Easter Bay Chemical", { -1132.8,-787.3,0.0, -956.4,-768.0,200.0 } },
{5, "Easter Bay Chemical", { -1132.8,-768.0,0.0, -956.4,-578.1,200.0 } },
{1, "The Panopticon", { -947.9,-304.3,-1.1, -319.6,327.0,200.0 } },
{2, "Fallen Tree", { -792.2,-698.5,-5.3, -452.4,-380.0,200.0 } },
{3, "Blueberry Acres", { -319.6,-220.1,0.0, 104.5,293.3,200.0 } },
{4, "Martin Bridge", { -222.1,293.3,0.0, -122.1,476.4,200.0 } },
{5, "Blueberry", { 19.6,-404.1,3.8, 349.6,-220.1,200.0 } },
{6, "Blueberry", { 104.5,-220.1,2.3, 349.6,152.2,200.0 } },
{7, "Fallow Bridge", { 434.3,366.5,0.0, 603.0,555.6,200.0 } },
{8, "Fern Ridge", { 508.1,-139.2,0.0, 1306.6,119.5,200.0 } },
{9, "Dillimore", { 580.7,-674.8,-9.5, 861.0,-404.7,200.0 } },
{10, "Hampton Barns", { 603.0,264.3,0.0, 761.9,366.5,200.0 } },
{11, "Mulholland", { 687.8,-860.6,-89.0, 911.8,-768.0,110.9 } },
{12, "Mulholland", { 737.5,-768.0,-89.0, 1142.2,-674.8,110.9 } },
{13, "Mulholland", { 768.6,-954.6,-89.0, 952.6,-860.6,110.9 } },
{14, "Mulholland", { 861.0,-674.8,-89.0, 1156.5,-600.8,110.9 } },
{15, "Mulholland", { 911.8,-860.6,-89.0, 1096.4,-768.0,110.9 } },
{16, "Mulholland", { 952.6,-937.1,-89.0, 1096.4,-860.6,110.9 } },
{17, "Hilltop Farm", { 967.3,-450.3,-3.0, 1176.7,-217.9,200.0 } },
{18, "Mulholland", { 1096.4,-910.1,-89.0, 1169.1,-768.0,110.9 } },
{19, "Montgomery", { 1119.5,119.5,-3.0, 1451.4,493.3,200.0 } },
{20, "Mulholland", { 1169.1,-910.1,-89.0, 1318.1,-768.0,110.9 } },
{21, "Mulholland", { 1269.1,-768.0,-89.0, 1414.0,-452.4,110.9 } },
{22, "Mulholland", { 1281.1,-452.4,-89.0, 1641.1,-290.9,110.9 } },
{23, "Mulholland", { 1318.1,-910.1,-89.0, 1357.0,-768.0,110.9 } },
{24, "Mulholland", { 1357.0,-926.9,-89.0, 1463.9,-768.0,110.9 } },
{25, "Mulholland", { 1414.0,-768.0,-89.0, 1667.6,-452.4,110.9 } },
{26, "Montgomery", { 1451.4,347.4,-6.1, 1582.4,420.8,200.0 } },
{27, "Mulholland Section", { 1463.9,-1150.8,-89.0, 1812.6,-768.0,110.9 } },
{28, "Montgomery Section", { 1546.6,208.1,0.0, 1745.8,347.4,200.0 } },
{29, "Montgomery Section", { 1582.4,347.4,0.0, 1664.6,401.7,200.0 } },
{30, "The Mako Span", { 1664.6,401.7,0.0, 1785.1,567.2,200.0 } },
{31, "Fisher's Lagoon", { 1916.9,-233.3,-100.0, 2131.7,13.8,200.0 } },
{32, "Palomino Creek", { 2160.2,-149.0,0.0, 2576.9,228.3,200.0 } },
{33, "North Rock", { 2285.3,-768.0,0.0, 2770.5,-269.7,200.0 } },
{34, "San Andreas Sound", { 2450.3,385.5,-100.0, 2759.2,562.3,200.0 } },
{35, "Hankypanky Point", { 2576.9,62.1,0.0, 2759.2,385.5,200.0 } },
{36, "Frederick Bridge", { 2759.2,296.5,0.0, 2774.2,594.7,200.0 } }
`;

function parsePawnCoordList(pawnString) {
  const regex =
    /{\s*(\d+),\s*"([^"]+)",\s*{\s*([-.\d]+),\s*([-.\d]+),\s*([-.\d]+),\s*([-.\d]+),\s*([-.\d]+),\s*([-.\d]+)\s*}\s*}/g;
  const jsonArray = [];

  let match;
  while ((match = regex.exec(pawnString)) !== null) {
    const [fullMatch, id, name, x1, y1, z1, x2, y2, z2] = match;
    const coords = [
      parseFloat(x1),
      parseFloat(y1),
      parseFloat(z1),
      parseFloat(x2),
      parseFloat(y2),
      parseFloat(z2),
    ];
    jsonArray.push({ id: parseInt(id), name, coords });
  }

  return jsonArray;
}

const jsonArray = parsePawnCoordList(pawnString);
// console.log(jsonArray);

const ZonesToOrder = jsonArray;

// =============================================
// =============================================
// =============================================
// =============================================
// =============================================
// =============================================
// ORDER BY LAT/LONG
// =============================================
// =============================================
// =============================================
// =============================================
// =============================================
// =============================================

// Ele compara as coordenadas de latitude e, em seguida, as coordenadas de longitude para garantir que a lista esteja ordenada da esquerda para a direita e de cima para baixo
// criterio de desempate = name
function orderByLocation(cityList) {
  return cityList.sort((a, b) => {
    if (parseFloat(a.coords[0]) === parseFloat(b.coords[0])) {
      if (parseFloat(a.coords[1]) === parseFloat(b.coords[1])) {
        return a.name.localeCompare(b.name);
      } else {
        return parseFloat(a.coords[1]) - parseFloat(b.coords[1]);
      }
    } else {
      return parseFloat(a.coords[0]) - parseFloat(b.coords[0]);
    }
  });
}
const ordenedList = orderByLocation(ZonesToOrder);
console.log(ordenedList);

// // print on console to ctrl+c ctrl+v to pawn
let contadorID = 0;
console.log("========== ORDENED ==========");
ordenedList.forEach((city, index) => {
  contadorID++;
  const comma = contadorID != ordenedList.length ? "," : "";
  console.log(
    `{${contadorID}, "${city.name}", { ${city.coords[0].toFixed(
      1
    )},${city.coords[1].toFixed(1)},${city.coords[2].toFixed(
      1
    )}, ${city.coords[3].toFixed(1)},${city.coords[4].toFixed(
      1
    )},${city.coords[5].toFixed(1)} } }${comma}`
  );
});

// =============================================
// =============================================
// =============================================
// =============================================
// =============================================
// =============================================
// SPLIT EAST/WEST
// =============================================
// =============================================
// =============================================
// =============================================
// =============================================
// =============================================
// get center
// const zoneCenter = {
//   x: (ZonesSquare.coords[0] + ZonesSquare.coords[3]) / 2,
//   y: (ZonesSquare.coords[1] + ZonesSquare.coords[4]) / 2,
// };

// // split func
// const westernCities = [];
// const easternCities = [];
// ZonesToOrder.forEach((city) => {
//   const longitude = (city.coords[0] + city.coords[3]) / 2;
//   if (longitude > zoneCenter.x) {
//     easternCities.push(city);
//   } else {
//     westernCities.push(city);
//   }
// });

// // print on console to ctrl+c ctrl+v to pawn
// let contadorID = 0;
// console.log("========== WEST ==========");
// westernCities.forEach((city, index) => {
//   contadorID++;
//   const comma = contadorID != westernCities.length ? "," : "";
//   console.log(
//     `{${contadorID}, "${city.name}", { ${city.coords[0].toFixed(
//       1
//     )},${city.coords[1].toFixed(1)},${city.coords[2].toFixed(
//       1
//     )}, ${city.coords[3].toFixed(1)},${city.coords[4].toFixed(
//       1
//     )},${city.coords[5].toFixed(1)} } }${comma}`
//   );
// });

// console.log("========== EAST ==========");
// easternCities.forEach((city, index) => {
//   contadorID++;
//   const comma = contadorID != easternCities.length ? "," : "";
//   console.log(
//     `{${contadorID}, "${city.name}", { ${city.coords[0].toFixed(
//       1
//     )},${city.coords[1].toFixed(1)},${city.coords[2].toFixed(
//       1
//     )}, ${city.coords[3].toFixed(1)},${city.coords[4].toFixed(
//       1
//     )},${city.coords[5].toFixed(1)} } }${comma}`
//   );
// });
