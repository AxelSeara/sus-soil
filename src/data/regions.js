// src/data/regions.js

// Shared list of biogeographic regions
export const regions = [
  {
    id: 'Boreal',
    info: 'The Boreal Biogeographic Region',
    color: '#284b55',
    image: 'https://source.unsplash.com/r0aq9pYIadI/600x400',
    description: `
The Boreal Biogeographic Region spans across the northern parts of Europe, including large areas of Scandinavia, Finland, and the Baltic States. It is characterized by vast coniferous forests, known as the taiga, which form the largest biome in Europe. The region experiences long, harsh winters with heavy snowfall and short, mild summers.

This region has a relatively low diversity of plant species due to the cold climate, but it is home to extensive forests of pine, spruce, and birch. Wetlands, peat bogs, and thousands of lakes shape the landscape, providing habitats for moose, lynx, wolves, and a variety of bird species such as cranes and owls. Many rivers and lakes support populations of salmon and trout.

Human activity in the Boreal region has traditionally included forestry, reindeer herding, and fishing. However, climate change and logging pose threats to the fragile ecosystems. Conservation efforts focus on protecting old-growth forests and maintaining biodiversity in this unique region.
    `,
    livingLabs: ['LL Finland']
  },
  {
    id: 'Atlantic',
    info: 'The Atlantic Biogeographic Region',
    color: '#2e8479',
    image: 'https://source.unsplash.com/hkjsfuyxK10/600x400',
    description: `
The Atlantic Biogeographic Region covers the coastal areas of western Europe, including parts of Portugal, Spain, France, the United Kingdom, Ireland, the Netherlands, Belgium, and Germany. The region has a temperate oceanic climate, with mild winters, cool summers, and abundant rainfall throughout the year.

The landscape consists of rolling hills, wetlands, heathlands, and extensive coastal ecosystems such as estuaries, salt marshes, and cliffs. These environments support a variety of plant and animal species, including oak and beech forests, seabirds like puffins and gannets, and marine life such as seals and dolphins. The region’s rivers, including the Loire, Seine, and Thames, are important for migratory fish like salmon and eels.

Due to its long history of human settlement, much of the natural landscape has been modified for agriculture and urban development. However, conservation efforts aim to restore natural habitats, especially coastal wetlands and ancient woodlands.
    `,
    livingLabs: ['LL Galicia', 'LL France', 'LL Netherlands']
  },
  {
    id: 'Continental',
    info: 'The Continental Biogeographic Region',
    color: '#b7543d',
    image: 'https://source.unsplash.com/TRhGEGdw-YY/600x400',
    description: `
The Continental Biogeographic Region stretches across central Europe, covering parts of Germany, Poland, the Czech Republic, Austria, Hungary, and Romania. It has a diverse climate with cold winters and warm summers, influenced by both Atlantic and Mediterranean weather patterns.

The region features a mix of deciduous and coniferous forests, grasslands, and large river systems such as the Danube and Vistula. Oak, beech, and fir trees dominate the forests, while grasslands provide habitat for species like deer, wild boar, and numerous bird species.

Agriculture is a key land use in this region, with vast fields of wheat, maize, and vineyards. Industrial development and deforestation have impacted natural ecosystems, leading to conservation initiatives focused on protecting river habitats, wetlands, and forested areas.
    `,
    livingLabs: ['LL Germany', 'LL Bosnia-Herzegovina', 'LL Slovakia', 'LL Veneto']
  },
  {
    id: 'Mediterranean',
    info: 'The Mediterranean Biogeographic Region',
    color: '#ee9c39',
    image: 'https://source.unsplash.com/mDa8FAg782c/600x400',
    description: `
The Mediterranean Biogeographic Region surrounds the Mediterranean Sea and includes large parts of southern Europe, such as Spain, Portugal, France, Italy, Greece, Malta, and Cyprus. It is characterized by a hot-summer Mediterranean climate, with mild, humid winters and hot, dry summers. Average summer temperatures often exceed 22°C, while winter temperatures remain above 0°C.

The landscape is diverse, ranging from rugged mountain ranges, semi-arid steppes, and thick Mediterranean forests to coastal wetlands, rocky shores, and sandy beaches. The region is rich in biodiversity and is home to a large number of endemic plant species, including aromatic shrubs such as thyme and rosemary, as well as extensive forests of holm oak and cork oak.

Human activity has significantly shaped the Mediterranean landscape for thousands of years. Agriculture, deforestation, and livestock grazing have altered ecosystems, while urbanization and tourism have placed increasing pressure on coastal environments. Conservation efforts focus on habitat restoration, sustainable land use, and marine protection to preserve this unique and ecologically rich region.
    `,
    livingLabs: ['LL Tunisia', 'LL Egypt', 'LL Greece', 'LL Italy-Tuscany', 'LL Spain-Madrid', 'LL Portugal', 'LL Turkey']
  },
  {
    id: 'Alpine',
    info: 'The Alpine Biogeographic Region',
    color: '#775786',
    image: 'https://source.unsplash.com/ZEVkLRWmnX4/600x400',
    description: `
The Alpine Biogeographic Region includes the high mountain areas of Europe, such as the Alps, Pyrenees, Carpathians, and parts of the Balkans. It is characterized by rugged terrain, high altitudes, and a cold mountain climate with heavy snowfall in winter and cool summers.

Vegetation varies with altitude, from dense forests of spruce and fir in the lower regions to alpine meadows and rocky landscapes at higher elevations. The region is home to many endemic species, including the Alpine ibex, chamois, marmots, and golden eagles.

Human activities such as tourism, skiing, and mountain farming have altered the natural environment. Conservation efforts focus on maintaining biodiversity and protecting fragile alpine ecosystems.
    `,
    livingLabs: ['LL Slovakia', 'LL Bosnia-Herzegovina', 'LL Veneto']
  },
  {
    id: 'Pannonian',
    info: 'The Pannonian Biogeographic Region',
    color: '#86884c',
    image: 'https://source.unsplash.com/2cddwbyhTsY/600x400',
    description: `
The Pannonian Biogeographic Region is centered around the Pannonian Basin, covering parts of Hungary, Slovakia, Serbia, and Romania. It has a continental climate with hot summers and cold winters, creating a landscape of steppe grasslands, river plains, and wetlands.

This region is home to unique steppe vegetation, with grasses and scattered shrubs adapted to dry conditions. Wetlands along the Danube and Tisza Rivers provide important habitats for waterfowl, including herons and pelicans.

Agriculture, especially wheat and sunflower cultivation, dominates the land use in the Pannonian region. However, overgrazing and drainage of wetlands have threatened biodiversity. Conservation projects aim to restore grassland habitats and protect endangered species.
    `,
    livingLabs: ['LL Slovakia']
  },
  {
    id: 'BlackSea',
    info: 'The Black Sea Biogeographic Region',
    color: '#5c81b5',
    image: 'https://source.unsplash.com/5UhayavS2d4/600x400',
    description: `
The Black Sea Biogeographic Region includes the coastal areas surrounding the Black Sea, particularly in Bulgaria and Romania. It has a humid subtropical to continental climate, with mild winters and warm summers.

The region is characterized by coastal lagoons, sand dunes, and wetlands that serve as critical habitats for migratory birds. The Black Sea itself is home to diverse marine life, including dolphins, sturgeons, and seagrass meadows that support fish populations.

Pollution, overfishing, and habitat destruction have affected the region’s ecosystems. Conservation efforts focus on protecting coastal wetlands, reducing pollution, and managing fisheries sustainably.
    `,
    livingLabs: ['LL Turkey']
  },
  {
    id: 'Anatolian',
    info: 'The Anatolian Biogeographic Region',
    color: '#a02b16',
    image: 'https://source.unsplash.com/LSKmkJGog64/600x400',
    description: `
The Anatolian Biogeographic Region covers most of Turkey and is influenced by both Mediterranean and continental climates. It has a diverse landscape that includes mountains, plateaus, and semi-arid steppes.

Human activity, particularly agriculture and urban expansion, has significantly altered natural habitats. Conservation efforts focus on protecting wetlands, forests, and endangered species unique to this region.
    `,
    livingLabs: ['LL Turkey']
  }
];

// Complete data for Living Labs
export const livingLabs = [
  {
    id: 'll-finland',
    title: 'Living Lab in North Savo, Finland',
    regionId: 'Boreal',
    image: 'https://via.placeholder.com/600x400?text=North+Savo+Living+Lab',
    gallery: [
      'https://source.unsplash.com/600x400/?Finland,lakes',
      'https://source.unsplash.com/600x400/?Finland,forest'
    ],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
  },
  {
    id: 'll-galicia',
    title: 'Living Lab in Galicia, Spain',
    regionId: 'Atlantic',
    image: 'https://via.placeholder.com/600x400?text=Galicia+Living+Lab',
    gallery: [],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
  },
  {
    id: 'll-france',
    title: 'Living Lab in Normandy, France',
    regionId: 'Atlantic',
    image: 'https://via.placeholder.com/600x400?text=Normandy+Living+Lab',
    gallery: [],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
  },
  {
    id: 'll-netherlands',
    title: 'Living Lab in the Netherlands',
    regionId: 'Atlantic',
    image: 'https://via.placeholder.com/600x400?text=Netherlands+Living+Lab',
    gallery: [],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
  },
  {
    id: 'll-germany',
    title: 'Living Lab in East Brandenburg, Germany',
    regionId: 'Continental',
    image: 'https://via.placeholder.com/600x400?text=East+Brandenburg',
    gallery: [
      'https://source.unsplash.com/600x400/?Oderbruch,farm',
      'https://source.unsplash.com/600x400/?Brandenburg,fields'
    ],
    description: `The East Brandenburg arable farming region, consisting of the districts of Märkisch-Oderland (MOL) and Oder-Spree (LOS), is one of the most important agricultural landscapes in Brandenburg.`
  },
  {
    id: 'll-veneto',
    title: 'Living Lab in Veneto, Italy',
    regionId: 'Alpine',
    image: 'https://via.placeholder.com/600x400?text=Veneto+Living+Lab',
    gallery: [],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
  },
  {
    id: 'll-tuscany',
    title: 'Living Lab in Tuscany, Italy',
    regionId: 'Mediterranean',
    image: 'https://via.placeholder.com/600x400?text=Tuscany+Living+Lab',
    gallery: [],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
  },
  {
    id: 'll-madrid',
    title: 'Living Lab of Comunidad Autónoma de Madrid, Spain',
    regionId: 'Mediterranean',
    image: 'https://via.placeholder.com/600x400?text=Madrid+Living+Lab',
    gallery: [],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
  },
  {
    id: 'll-portugal',
    title: 'Living Lab in Região Centro, Portugal',
    regionId: 'Mediterranean',
    image: 'https://via.placeholder.com/600x400?text=Portugal+Living+Lab',
    gallery: [],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
  },
  {
    id: 'll-tunisia',
    title: 'Living Lab in Tunisia',
    regionId: 'Mediterranean',
    image: 'https://via.placeholder.com/600x400?text=Tunisia+Living+Lab',
    gallery: [],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
  },
  {
    id: 'll-egypt',
    title: 'Living Lab in Egypt',
    regionId: 'Mediterranean',
    image: 'https://via.placeholder.com/600x400?text=Egypt+Living+Lab',
    gallery: [],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
  },
  {
    id: 'll-greece',
    title: 'Living Lab in Greece',
    regionId: 'Mediterranean',
    image: 'https://via.placeholder.com/600x400?text=Greece+Living+Lab',
    gallery: [],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
  },
  {
    id: 'll-bosnia-herzegovina',
    title: 'Living Lab in Bosnia & Herzegovina',
    regionId: 'Continental',
    image: 'https://via.placeholder.com/600x400?text=Bosnia+Herzegovina+Living+Lab',
    gallery: [],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
  },
  {
    id: 'll-slovakia',
    title: 'Living Lab in Slovakia',
    regionId: 'Alpine',
    image: 'https://via.placeholder.com/600x400?text=Slovakia+Living+Lab',
    gallery: [],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
  }
];
