// src/data/regions.js
import Region_Alpine        from "../assets/thumbnails/regions/Alpine.webp?url";
import Region_Atlantic      from "../assets/thumbnails/regions/Atlantic.webp?url";
import Region_Boreal        from "../assets/thumbnails/regions/Boreal.webp?url";
import Region_Continental   from "../assets/thumbnails/regions/Continental.webp?url";
import Region_Mediterranean from "../assets/thumbnails/regions/Mediterranean.webp?url";
import Region_Pannonian     from "../assets/thumbnails/regions/Pannonian.webp?url";

// Biogeographic regions (texts exactly as provided)
export const regions = [
  {
    id: "Boreal",
    info: "The Boreal Biogeographic Region",
    color: "#284b55",
    image: Region_Boreal,
    description: `
The Boreal Biogeographic Region spans across the northern parts of Europe, including large areas of Scandinavia, Finland, and the Baltic States. It is characterized by vast coniferous forests, known as the taiga, which form the largest biome in Europe. The region experiences long, harsh winters with heavy snowfall and short, mild summers.

This region has a relatively low diversity of plant species due to the cold climate, but it is home to extensive forests of pine, spruce, and birch. Wetlands, peat bogs, and thousands of lakes shape the landscape, providing habitats for moose, lynx, wolves, and a variety of bird species such as cranes and owls. Many rivers and lakes support populations of salmon and trout.

Human activity in the Boreal region has traditionally included forestry, reindeer herding, and fishing. However, climate change and logging pose threats to the fragile ecosystems. Conservation efforts focus on protecting old-growth forests and maintaining biodiversity in this unique region.
    `,
    livingLabs: ["LL Finland"],
  },
  {
    id: "Atlantic",
    info: "The Atlantic Biogeographic Region",
    color: "#2e8479",
    image: Region_Atlantic,
    description: `
The Atlantic Biogeographic Region covers the coastal areas of western Europe, including parts of Portugal, Spain, France, the United Kingdom, Ireland, the Netherlands, Belgium, and Germany. The region has a temperate oceanic climate, with mild winters, cool summers, and abundant rainfall throughout the year.

The landscape consists of rolling hills, wetlands, heathlands, and extensive coastal ecosystems such as estuaries, salt marshes, and cliffs. These environments support a variety of plant and animal species, including oak and beech forests, seabirds like puffins and gannets, and marine life such as seals and dolphins. The region’s rivers, including the Loire, Seine, and Thames, are important for migratory fish like salmon and eels.

Due to its long history of human settlement, much of the natural landscape has been modified for agriculture and urban development. However, conservation efforts aim to restore natural habitats, especially coastal wetlands and ancient woodlands.
    `,
    livingLabs: ["LL Galicia", "LL France", "LL Netherlands"],
  },
  {
    id: "Continental",
    info: "The Continental Biogeographic Region",
    color: "#b7543d",
    image: Region_Continental,
    description: `
The Continental Biogeographic Region stretches across central Europe, covering parts of Germany, Poland, the Czech Republic, Austria, Hungary, and Romania. It has a diverse climate with cold winters and warm summers, influenced by both Atlantic and Mediterranean weather patterns.

The region features a mix of deciduous and coniferous forests, grasslands, and large river systems such as the Danube and Vistula. Oak, beech, and fir trees dominate the forests, while grasslands provide habitat for species like deer, wild boar, and numerous bird species.

Agriculture is a key land use in this region, with vast fields of wheat, maize, and vineyards. Industrial development and deforestation have impacted natural ecosystems, leading to conservation initiatives focused on protecting river habitats, wetlands, and forested areas.
    `,
    livingLabs: ["LL Germany", "LL Veneto", "LL Slovakia", "LL Bosnia-Herzegovina"],
  },
  {
    id: "Mediterranean",
    info: "The Mediterranean Biogeographic Region",
    color: "#ee9c39",
    image: Region_Mediterranean,
    description: `
The Mediterranean Biogeographic Region surrounds the Mediterranean Sea and includes large parts of southern Europe, such as Spain, Portugal, France, Italy, Greece, Malta, and Cyprus. It is characterized by a hot-summer Mediterranean climate, with mild, humid winters and hot, dry summers. Average summer temperatures often exceed 22°C, while winter temperatures remain above 0°C. Precipitation varies across the region, with drier areas like southeastern Spain receiving less than 300 mm annually, while wetter zones like the Italian coast can exceed 1,000 mm.

The landscape is diverse, ranging from rugged mountain ranges, semi-arid steppes, and thick Mediterranean forests to coastal wetlands, rocky shores, and sandy beaches. The region is rich in biodiversity and is home to a large number of endemic plant species, including aromatic shrubs such as thyme and rosemary, as well as extensive forests of holm oak and cork oak. Wildlife includes Iberian lynxes, wild boars, golden eagles, and an abundance of reptiles and amphibians. The Mediterranean Sea itself is a hotspot for marine life, supporting vast Posidonia seagrass meadows that provide shelter for rare crustaceans, sponges, and fish.

Human activity has significantly shaped the Mediterranean landscape for thousands of years. Agriculture, deforestation, and livestock grazing have altered ecosystems, while urbanization and tourism have placed increasing pressure on coastal environments. Wildfires, often exacerbated by rising temperatures and droughts, pose an additional threat to biodiversity. Conservation efforts focus on habitat restoration, sustainable land use, and marine protection to preserve this unique and ecologically rich region.
    `,
    livingLabs: ["LL Tuscany", "LL Madrid", "LL Portugal", "LL Turkey", "LL Egypt", "LL Tunisia", "LL Greece"],
  },
  {
    id: "Alpine",
    info: "The Alpine Biogeographic Region",
    color: "#775786",
    image: Region_Alpine,
    description: `
The Alpine Biogeographic Region includes the high mountain areas of Europe, such as the Alps, Pyrenees, Carpathians, and parts of the Balkans. It is characterized by rugged terrain, high altitudes, and a cold mountain climate with heavy snowfall in winter and cool summers.

Vegetation varies with altitude, from dense forests of spruce and fir in the lower regions to alpine meadows and rocky landscapes at higher elevations. The region is home to many endemic species, including the Alpine ibex, chamois, marmots, and golden eagles. Glacial lakes and fast-flowing rivers provide habitats for freshwater species.

Human activities such as tourism, skiing, and mountain farming have altered the natural environment. Climate change is also causing glacier retreat and shifts in vegetation zones. Conservation efforts focus on maintaining biodiversity and protecting fragile alpine ecosystems.
    `,
    livingLabs: ["LL Slovakia"],
  },
  {
    id: "Pannonian",
    info: "The Pannonian Biogeographic Region",
    color: "#86884c",
    image: Region_Pannonian,
    description: `
The Pannonian Biogeographic Region is centered around the Pannonian Basin, covering parts of Hungary, Slovakia, Serbia, and Romania. It has a continental climate with hot summers and cold winters, creating a landscape of steppe grasslands, river plains, and wetlands.

This region is home to unique steppe vegetation, with grasses and scattered shrubs adapted to dry conditions. Wetlands along the Danube and Tisza Rivers provide important habitats for waterfowl, including herons and pelicans. The grasslands support species such as European ground squirrels and great bustards.

Agriculture, especially wheat and sunflower cultivation, dominates the land use in the Pannonian region. However, overgrazing and drainage of wetlands have threatened biodiversity. Conservation projects aim to restore grassland habitats and protect endangered species.
    `,
    livingLabs: ["LL Slovakia"],
  },
];


export { livingLabs } from './livingLabs';
