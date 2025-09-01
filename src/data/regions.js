// src/data/regions.js
// src/data/regions.js
import LL_Germany from "../assets/ll/LL_Germany.png"
import LL_Madrid  from '../assets/ll/LL_Madrid.png';
import LL_France  from '../assets/ll/LL_France.png';

// Biogeographic regions (texts exactly as provided)
export const regions = [
  {
    id: 'Boreal',
    info: 'The Boreal Biogeographic Region',
    color: '#284b55',
    image: null,
    description: `
The Boreal Biogeographic Region spans across the northern parts of Europe, including large areas of Scandinavia, Finland, and the Baltic States. It is characterized by vast coniferous forests, known as the taiga, which form the largest biome in Europe. The region experiences long, harsh winters with heavy snowfall and short, mild summers.

This region has a relatively low diversity of plant species due to the cold climate, but it is home to extensive forests of pine, spruce, and birch. Wetlands, peat bogs, and thousands of lakes shape the landscape, providing habitats for moose, lynx, wolves, and a variety of bird species such as cranes and owls. Many rivers and lakes support populations of salmon and trout.

Human activity in the Boreal region has traditionally included forestry, reindeer herding, and fishing. However, climate change and logging pose threats to the fragile ecosystems. Conservation efforts focus on protecting old-growth forests and maintaining biodiversity in this unique region.
    `,
    livingLabs: ['LL Finland'],
  },
  {
    id: 'Atlantic',
    info: 'The Atlantic Biogeographic Region',
    color: '#2e8479',
    image: null,
    description: `
The Atlantic Biogeographic Region covers the coastal areas of western Europe, including parts of Portugal, Spain, France, the United Kingdom, Ireland, the Netherlands, Belgium, and Germany. The region has a temperate oceanic climate, with mild winters, cool summers, and abundant rainfall throughout the year.

The landscape consists of rolling hills, wetlands, heathlands, and extensive coastal ecosystems such as estuaries, salt marshes, and cliffs. These environments support a variety of plant and animal species, including oak and beech forests, seabirds like puffins and gannets, and marine life such as seals and dolphins. The region’s rivers, including the Loire, Seine, and Thames, are important for migratory fish like salmon and eels.

Due to its long history of human settlement, much of the natural landscape has been modified for agriculture and urban development. However, conservation efforts aim to restore natural habitats, especially coastal wetlands and ancient woodlands.
    `,
    livingLabs: ['LL Galicia', 'LL France', 'LL Netherlands'],
  },
  {
    id: 'Continental',
    info: 'The Continental Biogeographic Region',
    color: '#b7543d',
    image: null,
    description: `
The Continental Biogeographic Region stretches across central Europe, covering parts of Germany, Poland, the Czech Republic, Austria, Hungary, and Romania. It has a diverse climate with cold winters and warm summers, influenced by both Atlantic and Mediterranean weather patterns.

The region features a mix of deciduous and coniferous forests, grasslands, and large river systems such as the Danube and Vistula. Oak, beech, and fir trees dominate the forests, while grasslands provide habitat for species like deer, wild boar, and numerous bird species.

Agriculture is a key land use in this region, with vast fields of wheat, maize, and vineyards. Industrial development and deforestation have impacted natural ecosystems, leading to conservation initiatives focused on protecting river habitats, wetlands, and forested areas.
    `,
    livingLabs: ['LL Germany', 'LL Veneto'],
  },
  {
    id: 'Mediterranean',
    info: 'The Mediterranean Biogeographic Region',
    color: '#ee9c39',
    image: null,
    description: `
The Mediterranean Biogeographic Region surrounds the Mediterranean Sea and includes large parts of southern Europe, such as Spain, Portugal, France, Italy, Greece, Malta, and Cyprus. It is characterized by a hot-summer Mediterranean climate, with mild, humid winters and hot, dry summers. Average summer temperatures often exceed 22°C, while winter temperatures remain above 0°C. Precipitation varies across the region, with drier areas like southeastern Spain receiving less than 300 mm annually, while wetter zones like the Italian coast can exceed 1,000 mm.

The landscape is diverse, ranging from rugged mountain ranges, semi-arid steppes, and thick Mediterranean forests to coastal wetlands, rocky shores, and sandy beaches. The region is rich in biodiversity and is home to a large number of endemic plant species, including aromatic shrubs such as thyme and rosemary, as well as extensive forests of holm oak and cork oak. Wildlife includes Iberian lynxes, wild boars, golden eagles, and an abundance of reptiles and amphibians. The Mediterranean Sea itself is a hotspot for marine life, supporting vast Posidonia seagrass meadows that provide shelter for rare crustaceans, sponges, and fish.

Human activity has significantly shaped the Mediterranean landscape for thousands of years. Agriculture, deforestation, and livestock grazing have altered ecosystems, while urbanization and tourism have placed increasing pressure on coastal environments. Wildfires, often exacerbated by rising temperatures and droughts, pose an additional threat to biodiversity. Conservation efforts focus on habitat restoration, sustainable land use, and marine protection to preserve this unique and ecologically rich region.
    `,
    livingLabs: ['LL Tuscany', 'LL Madrid', 'LL Portugal', 'LL Turkey', 'LL Egypt', 'LL Tunisia', 'LL Greece'],
  },
  {
    id: 'Alpine',
    info: 'The Alpine Biogeographic Region',
    color: '#775786',
    image: null,
    description: `
The Alpine Biogeographic Region includes the high mountain areas of Europe, such as the Alps, Pyrenees, Carpathians, and parts of the Balkans. It is characterized by rugged terrain, high altitudes, and a cold mountain climate with heavy snowfall in winter and cool summers.

Vegetation varies with altitude, from dense forests of spruce and fir in the lower regions to alpine meadows and rocky landscapes at higher elevations. The region is home to many endemic species, including the Alpine ibex, chamois, marmots, and golden eagles. Glacial lakes and fast-flowing rivers provide habitats for freshwater species.

Human activities such as tourism, skiing, and mountain farming have altered the natural environment. Climate change is also causing glacier retreat and shifts in vegetation zones. Conservation efforts focus on maintaining biodiversity and protecting fragile alpine ecosystems.
    `,
    livingLabs: ['LL Veneto', 'LL Slovakia', 'LL Bosnia & Herzegovina'],
  },
  {
    id: 'Pannonian',
    info: 'The Pannonian Biogeographic Region',
    color: '#86884c',
    image: null,
    description: `
The Pannonian Biogeographic Region is centered around the Pannonian Basin, covering parts of Hungary, Slovakia, Serbia, and Romania. It has a continental climate with hot summers and cold winters, creating a landscape of steppe grasslands, river plains, and wetlands.

This region is home to unique steppe vegetation, with grasses and scattered shrubs adapted to dry conditions. Wetlands along the Danube and Tisza Rivers provide important habitats for waterfowl, including herons and pelicans. The grasslands support species such as European ground squirrels and great bustards.

Agriculture, especially wheat and sunflower cultivation, dominates the land use in the Pannonian region. However, overgrazing and drainage of wetlands have threatened biodiversity. Conservation projects aim to restore grassland habitats and protect endangered species.
    `,
    livingLabs: ['LL Slovakia'],
  },
  {
    id: 'BlackSea',
    info: 'The Black Sea Biogeographic Region',
    color: '#5c81b5',
    image: null,
    description: `
The Black Sea Biogeographic Region includes the coastal areas surrounding the Black Sea, particularly in Bulgaria and Romania. It has a humid subtropical to continental climate, with mild winters and warm summers.

The region is characterized by coastal lagoons, sand dunes, and wetlands that serve as critical habitats for migratory birds. The Black Sea itself is home to diverse marine life, including dolphins, sturgeons, and seagrass meadows that support fish populations.

Pollution, overfishing, and habitat destruction have affected the region’s ecosystems. Conservation efforts focus on protecting coastal wetlands, reducing pollution, and managing fisheries sustainably.
    `,
    livingLabs: ['LL Turkey'],
  },
  {
    id: 'Anatolian',
    info: 'The Anatolian Biogeographic Region',
    color: '#a02b16',
    image: null,
    description: `
The Anatolian Biogeographic Region covers most of Turkey and is influenced by both Mediterranean and continental climates. It has a diverse landscape that includes mountains, plateaus, and semi-arid steppes.

Vegetation in the region ranges from Mediterranean forests of oak and pine to dry steppe grasslands. The Anatolian region is home to many endemic species, including wild goats, Anatolian leopards, and rare bird species like the Dalmatian pelican.

Human activity, particularly agriculture and urban expansion, has significantly altered natural habitats. Conservation efforts focus on protecting wetlands, forests, and endangered species unique to this region.
    `,
    livingLabs: ['LL Turkey'],
  },
];

// Living Labs
// Filled where you provided text. The rest are kept with empty data.
export const livingLabs = [
  // ✅ Detailed: LL Germany
  {
    id: 'll-germany',
    title: 'Living Lab in East Brandenburg, Germany',
    regionId: 'Continental',
    image: LL_Germany,
    gallery: [], // add your images when ready
    description: `
The East Brandenburg arable farming region, consisting of the districts of Märkisch-Oderland (MOL) and Oder-Spree (LOS), is one of the most important agricultural landscapes in Brandenburg. The region is located approximately at the coordinates 52.5° N, 14.0° E; with an area of around 29,656 km², agricultural land accounts for 51.5% of the territory, making the region a central component of agricultural production in the federal state.

The region is characterized by flat terrain with fertile sandy soils and a temperate-continental climate. These conditions favor the cultivation of cereals such as wheat, rye, corn and rapeseed. A special feature is the Oderbruch, a historically drained marshland along the Oder. In the 18th century under Frederick the Great, it was transformed into one of the most fertile agricultural areas in Germany. Today it is known for the cultivation of winter wheat, with many farms specializing in arable farming.

The different soil types have a considerable influence on agricultural use. Fertile soils on ground and terminal moraine areas favor the cultivation of cereals and sugar beet. Less fertile soils, such as those on meltwater sand areas, are often used for forestry. The floodplain soils along the Oder are known for the cultivation of winter wheat.

The diversity of soils in the region allows for differentiated agricultural use. Knowledge of the specific soil types and their properties is crucial for sustainable cultivation practices and the long-term preservation of soil fertility. However, it should be noted that with an average of 33 soil points, Brandenburg ranks at the lower end of the nationwide comparison of soil quality. In addition, the water storage capacity of the soil is low, which is exacerbated by the low average precipitation level of 560 millimetres.

Adapted agricultural measures are therefore required to meet challenges such as drought and soil erosion.

The region also promotes sustainable agricultural practices. These aim to establish climate-resilient and regenerative farming methods through cooperation with local stakeholders.

At 12%, Brandenburg also has a relatively high proportion of organic farming compared to other German federal states, and this proportion is steadily increasing.

Cities such as Eberswalde and Frankfurt (Oder) serve as economic and cultural centers. Overall, the arable farming region of East Brandenburg shows how traditional agriculture can be combined with modern, sustainable approaches.
    `,
  },

  // ✅ Detailed: LL Madrid
  {
    id: 'll-madrid',
    title: 'Living Lab of Comunidad Autónoma de Madrid, Spain',
    regionId: 'Mediterranean',
    image: LL_Madrid,
    gallery: [],
    description: `
The Comunidad Autónoma de Madrid is located in the Centre of the Iberian Peninsula, and of the Central Plateau (Meseta Central). Its capital and largest municipality is Madrid, which is also the capital of Spain.

It has an extension of 8,028 km2 and 7,058,041 inhabitants (2024), these make Madrid the third most highly populated region in Spain, although mostly concentrated in the metropolitan area of Madrid city, with 98% of its population. It is the most densely populated autonomous community and has the largest nominal GDP (gross domestic product) in Spain. Nowadays Madrid's economy is mainly based on services (84% of the gross added value) and industry and construction (12%), representing agriculture and livestock sectors around 0.1%.

The economic activity of the region has historically been very much oriented towards agricultural production, thanks to its climate and soil that are quite favorable to cereal and horticultural production. However, from the 19th century onwards, Madrid became the financial Centre of the country and a powerful focus of industrial production. But Madrid's great economic development came with the 20th century, especially from the 1950s and 1960s, when the province became the main national Centre of the services sector. Nowadays, approximately 25% of Madrid land is dedicated to agriculture, being the main crops (in surface) cereals, olive trees and vineyards.  

The climate is Continental Mediterranean, and the orography makes important differences within the region. The Comunidad de Madrid is placed in the Central Plateau with a mean altitude of 678 m a.s.l. making Madrid city the highest capital in Europe with 667 m a.s.l. We find mountain peaks rising above 2,000 m a.s.l. in the North, with forests of Scots pine and Pyrenean oak, and an important livestock production in their permanent grasslands. Lower lands are dedicated to holm oak dehesas, and plains to agriculture. Near our main rivers (Tajo and Jarama), horticulture has the main role of our agriculture.

The Comunidad of Madrid is in the limit between the two main bedrocks of the Iberian Peninsula: siliceous in the north-northwest and limestone in the south-southeast. There are three types of landscapes in the Community of Madrid: alpine meadows and pine forests in Guadarrama mountains of the North and North-west, Mediterranean forests and pastures in the flatter northern area and steppe shrubs in the extreme southeast of the region.

In spite of the strong demographic pressure, we can find in Madrid also diverse and intact natural habitats. Madrid shares with the neighbor Autonomous Community of Castilla y Leon one of the National Parks of Spain, the Sierra de Guadarrama Park, in the highest mountains of the North. Likewise, the Comunidad de Madrid houses other conservation figures as the Regional Parks ‘Cuenca Alta del Manzanares’, also in the mountainous North, and ‘Cursos Bajos de los ríos Manzanares y Jarama’ in the Southeast.

Our community is also an important centre for knowledge generation, hosting 5 public universities and an important number of research centres (public and private). One of our public universities is one of the oldest in the country, the University of Alcalá, founded in 1499. As an Autonomous Community within Spain, Madrid has a regional government and a Parliament.

The Living Lab of Comunidad Autónoma de Madrid is located approximately at the coordinates 40° 25’ 31’’ N;  3° 41’ 26’’ W.
    `,
  },

  // ✅ Detailed: LL France (Normandy, Ver De Terre)
  {
    id: 'll-france',
    title: 'Living Lab in Normandy, France',
    regionId: 'Atlantic',
    image: LL_France,
    gallery: [],
    description: `
The living laboratory run by Ver De Terre Production is located in Normandy, a region with diverse climatic and agricultural characteristics. Located at coordinates 48° 52' 47.532" N, 0° 10' 16.511" E, Normandy benefits from a temperate oceanic climate, characterized by high humidity, an average annual temperature between 10 and 12°C, and precipitation ranging from 600 to 1,200 mm per year.

This regular distribution of precipitation, with a peak in autumn and winter, as well as prevailing westerly winds, shapes a diverse agricultural landscape. It includes the bocage and wet meadows of the Orne and Manche departments, favorable to cattle breeding, as well as fertile limestone plains in the Eure and Calvados departments, suitable for major crops such as wheat, rapeseed and beetroot. The alluvial valleys, particularly those of the Seine and Orne, offer rich soils suitable for market gardening and fodder crops. The region's agricultural activities reflect this landscape diversity, with a strong presence of cattle breeding, cereal crops, market gardening, and horticulture, as well as flax cultivation and cider production, emblematic of Normandy.

Furthermore, the forest landscapes are dominated by deciduous and alluvial forests, with a rarer presence of conifers. The living laboratory approach covers several soil types, whether agricultural, forest, or urban, in order to explore different solutions adapted to the region's challenges.

The experimental sites, including the experimental station: Les Serres de Marcel, as well as other plots or experimental sites, will serve as a field for action research and innovation in agroecology.

These sites will deepen our knowledge of soil, subsoil, and the mechanisms that impact them. The laboratory's mission will be to experiment with and document innovative agricultural practices, while promoting the creation and facilitation of networks of stakeholders involved in the agroecological transition. Through a participatory approach, it will seek to scale up sustainable practices and stimulate knowledge exchange between farmers, researchers, and other stakeholders.
    `,
  },

  // ——— Other labs (kept with empty data as requested) ———

  { id: 'll-finland',     title: 'Living Lab in North Savo, Finland',                regionId: 'Boreal',       image: '', gallery: [], description: '' },
  { id: 'll-galicia',     title: 'Living Lab in Galicia, Spain',                     regionId: 'Atlantic',     image: '', gallery: [], description: '' },
  { id: 'll-netherlands', title: 'Living Lab in the Netherlands',                    regionId: 'Atlantic',     image: '', gallery: [], description: '' },

  // Appears in Alpine list and Continental list
  { id: 'll-veneto',      title: 'Living Lab in Veneto, Italy',                      regionId: 'Alpine',       image: '', gallery: [], description: '' },

  { id: 'll-tuscany',     title: 'Living Lab in Tuscany, Italy',                     regionId: 'Mediterranean', image: '', gallery: [], description: '' },
  { id: 'll-portugal',    title: 'Living Lab in Região Centro, Portugal',            regionId: 'Mediterranean', image: '', gallery: [], description: '' },
  { id: 'll-turkey',      title: 'Living Lab in Turkey',                             regionId: 'Mediterranean', image: '', gallery: [], description: '' },
  { id: 'll-egypt',       title: 'Living Lab in Egypt',                              regionId: 'Mediterranean', image: '', gallery: [], description: '' },
  { id: 'll-tunisia',     title: 'Living Lab in Tunisia',                            regionId: 'Mediterranean', image: '', gallery: [], description: '' },
  { id: 'll-greece',      title: 'Living Lab in Greece',                             regionId: 'Mediterranean', image: '', gallery: [], description: '' },

  // Alpine-specific extra labs
  { id: 'll-slovakia',    title: 'Living Lab in Slovakia',                           regionId: 'Alpine',       image: '', gallery: [], description: '' },
  { id: 'll-bosnia-herzegovina', title: 'Living Lab in Bosnia & Herzegovina',       regionId: 'Alpine',       image: '', gallery: [], description: '' },
];