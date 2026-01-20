// src/data/regions.js
import LL_France        from "../assets/thumbnails/ll/LL_France.jpg";
import LL_Germany       from "../assets/thumbnails/ll/LL_Germany.png";
import LL_Spain_Galicia from "../assets/thumbnails/ll/LL_Spain_Galicia.jpeg";
import LL_Finland       from "../assets/thumbnails/ll/LL_Finland.jpeg";
import LL_Bosnia        from "../assets/thumbnails/ll/LL_Bosnia.jpeg";
import LL_Spain_Madrid  from "../assets/thumbnails/ll/LL_Spain_Madrid.jpeg";
import LL_Greece        from "../assets/thumbnails/ll/LL_Greece.jpeg";
import LL_Slovakia      from "../assets/thumbnails/ll/LL_Slovakia.JPG";
import LL_Tunisia       from "../assets/thumbnails/ll/LL_Tunisia.jpeg";

import Region_Alpine        from "../assets/thumbnails/regions/Alpine.jpg";
import Region_Atlantic      from "../assets/thumbnails/regions/Atlantic.jpg";
import Region_Boreal        from "../assets/thumbnails/regions/Boreal.jpg";
import Region_Continental   from "../assets/thumbnails/regions/Continental.jpg";
import Region_Mediterranean from "../assets/thumbnails/regions/Mediterranean.jpg";
import Region_Pannonian     from "../assets/thumbnails/regions/Pannonian.jpg";



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
    livingLabs: ["LL Germany", "LL Veneto", "LL Bosnia-Herzegovina"],
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
  {
    id: "BlackSea",
    info: "The Black Sea Biogeographic Region",
    color: "#5c81b5",
    image: null,
    description: `
The Black Sea Biogeographic Region includes the coastal areas surrounding the Black Sea, particularly in Bulgaria and Romania. It has a humid subtropical to continental climate, with mild winters and warm summers.

The region is characterized by coastal lagoons, sand dunes, and wetlands that serve as critical habitats for migratory birds. The Black Sea itself is home to diverse marine life, including dolphins, sturgeons, and seagrass meadows that support fish populations.

Pollution, overfishing, and habitat destruction have affected the region’s ecosystems. Conservation efforts focus on protecting coastal wetlands, reducing pollution, and managing fisheries sustainably.
    `,
    livingLabs: ["LL Turkey"],
  },
  {
    id: "Anatolian",
    info: "The Anatolian Biogeographic Region",
    color: "#a02b16",
    image: null,
    description: `
The Anatolian Biogeographic Region covers most of Turkey and is influenced by both Mediterranean and continental climates. It has a diverse landscape that includes mountains, plateaus, and semi-arid steppes.

Vegetation in the region ranges from Mediterranean forests of oak and pine to dry steppe grasslands. The Anatolian region is home to many endemic species, including wild goats, Anatolian leopards, and rare bird species like the Dalmatian pelican.

Human activity, particularly agriculture and urban expansion, has significantly altered natural habitats. Conservation efforts focus on protecting wetlands, forests, and endangered species unique to this region.
    `,
    livingLabs: ["LL Turkey"],
  },
];

// Living Labs (texts exactly as provided; gallery left empty on purpose)
export const livingLabs = [
  // Germany (image imported)
  {
    id: "ll-germany",
    title: "Living Lab in East Brandenburg, Germany",
    regionId: "Continental",
    image: LL_Germany,
    gallery: [],
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

  // Madrid (image imported)
  {
    id: "ll-madrid",
    title: "Living Lab of Comunidad Autónoma de Madrid, Spain",
    regionId: "Mediterranean",
    image: LL_Spain_Madrid,
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

  // France (image imported)
  {
    id: "ll-france",
    title: "Living Lab in Normandy, France",
    regionId: "Atlantic",
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

  // Galicia
  {
    id: "ll-galicia",
    title: "Living Lab in Galicia, Spain",
    regionId: "Atlantic",
    image: LL_Spain_Galicia,
    gallery: [],
    description: `
The Galician Living Lab (LL) is leaded by the University of Santiago de Compostela (USC) and located in the Atlantic biogeographic region of Galicia, northwest Spain. This region is predominantly characterized by a temperate oceanic climate due to its position with respect to the Atlantic Ocean. Galicia covers approximately 29,574 km² and faces diverse topography with mountainous regions such as Serra do Xistral and Serra dos Ancares reaching altitudes over 1,800 meters above sea level, as well as agricultural and extensive coastal plains.

Galician climate is characterised by mild temperatures and high precipitation levels, averaging annual rainfall between 1,000 and 2,000 mm, distributed regularly throughout the year but with peaks during autumn and winter. Mean temperatures range from 8°C in winter to 20°C in summer. This climatic regime supports a landscape dominated by extensive forest plantations reaching up to 2.03 million hectares, representing almost half of the forest productive area and forest lodging / timber production despite representing roughly a 5.8% of Spanish territory.  Forest stands in Galicia accounts mainly pine (Pinus pinaster and Pinus radiata) and eucalyptus, but also more traditional chestnuts and oaks alongside traditional agricultural systems including permanent grasslands, diverse crop rotations, and urban green spaces such as parks and kitchen gardens.

Galician soils are highly diverse due to multiple geological substrates dominated by granitic and schistose materials. According to FAO, the most common soil types include Leptosols and Umbrisols (prevalent in mountainous and granitic regions), Cambisols (deeper profiles suitable for forestry and agriculture) and Fluvisols (along river valleys). Less extensive are Regosols on steeper slopes, Podzols (associated with sandy substrates) and Histosols in wetland areas. This soil diversity significantly influences land-use patterns, supporting forestry, agriculture, and traditional grazing systems in the region.

The activities carried out within the Galician LL aim to improve soil and subsoil health by promoting agroecological practices in order to enhance organic matter content, biodiversity, nutrient cycling, carbon sequestration, and water retention. The Galician LL pursues to serve as a collaborative innovation space where farmers, researchers, policymakers, and civil society co-create and test sustainable solutions tailored to regional conditions.

The Galician experimental sites include long-term managed agricultural fields, selected forest stands in representative municipalities, and urban community gardens. The selected sites will support the development of innovative management practices and will contribute to the SUS-SOIL monitoring database.
    `,
  },

  // Portugal
  {
    id: "ll-portugal",
    title: "Living Lab in Região Centro, Portugal",
    regionId: "Mediterranean",
    image: "",
    gallery: [],
    description: `
The Portuguese Living Lab is located in the Central Region of Portugal (Região Centro), one of the largest and most diverse areas in the country, stretching from the Atlantic Ocean to the Spanish border. Covering approximately 28,462 km², the region includes important urban centers such as Coimbra, Aveiro, Leiria, Viseu, Guarda, and Castelo Branco. It is characterized by a wide range of landscapes—from coastal plains to the Serra da Estrela mountains, the highest in mainland Portugal—supporting both agricultural productivity and biodiversity conservation.

The Beira Baixa subregion, located in the eastern part of the Central Region and bordering Spain, is a key area of focus. Beira Baixa features varied terrain, including mountainous zones, river valleys, and dry plateaus. The area is known for olive groves, cork oak forests, and cereal crops, reflecting a long-standing tradition of Mediterranean dryland agriculture.

Biogeographically, the region belongs to the Mediterranean zone, marked by hot, dry summers and mild, wet winters. This climate supports ecosystems ranging from coastal dune vegetation to oak and pine forests at higher elevations. The Serra da Estrela area, part of the Natural Park, is especially rich in endemic species adapted to colder and more variable conditions.

The soils across the region are heterogeneous, with granitic and schistose formations dominating the highlands and alluvial deposits in the valleys. This diversity influences agricultural practices and land-use planning. In lower elevations, more fertile soils support fruit cultivation, olive oil production, and vineyards, while in higher altitudes, forestry and pastoral activities are more common.

Agriculture in Beira Baixa remains a vital part of the regional economy, although it faces challenges from soil erosion, land abandonment, and climate variability. However, opportunities are emerging through organic farming, agrotourism, and the revitalization of traditional crops and rural landscapes.

The region also has significant cultural heritage, with sites such as Monsanto—renowned for its stone architecture—and Belmonte, known for its Jewish legacy and as the birthplace of navigator Pedro Álvares Cabral. Educational institutions like the University of Beira Interior in Covilhã and the University of Coimbra contribute to research, innovation, and regional development.

Overall, the Central Region of Portugal, and Beira Baixa in particular, exemplifies how agricultural and ecological diversity can be leveraged to promote sustainable rural development while preserving cultural identity and natural heritage.
    `,
  },

  // Tunisia
  {
    id: "ll-tunisia",
    title: "Living Lab in Tunisia",
    regionId: "Mediterranean",
    image: LL_Tunisia,
    gallery: [],
    description: `
The Tunisian Living Lab is located in the Grand Tunis region, encompassing the delegations of Tunis, Ariana, Ben Arous, and Manouba. It is coordinated by the Faculty of Sciences of Tunis (FST-UTM), approximately at coordinates 36°50′ N, 10°8′ E. The region spans around 260,000 hectares, of which 30,000 ha are urbanized and 230,000 ha are used for agriculture or preserved as natural land. Its proximity to the Mediterranean Sea and predominantly flat terrain make it suitable for diverse agricultural activities closely linked to subsoil structure and sediment composition.

The region is part of the Mediterranean Woodlands and Forests ecoregion. It features a complex geological structure with Neogene sandy and clayey formations, as well as Cretaceous and Jurassic marl-limestone layers. Fertile alluvial Quaternary deposits dominate the lowlands and agricultural plains. This lithological diversity supports a mosaic of soils including vertisols, fluvisols, and calcisols, each offering different agricultural potentials and limitations.

With a population of approximately 2.7 million (as of 2014), Grand Tunis is Tunisia’s most densely populated area and includes major cities such as Tunis, Ariana, Ben Arous, and Manouba. The region experiences a Mediterranean climate, with mild, rainy winters and hot, dry summers. Temperatures range from 7°C in January to 33°C in August, and annual precipitation varies between 400 and 600 mm, mostly concentrated in winter months.

Agriculture in Grand Tunis is diverse and dynamic. The Manouba plain is known for durum wheat, while the Ariana and Mornag areas are important olive oil production zones. Mornag is also recognized for viticulture, producing both table grapes and wine. Fruit farming (especially citrus and stone fruits) thrives in fertile zones like La Soukra, and vegetable farming—including tomatoes, potatoes, onions, peppers, and artichokes—is widespread, serving both local and national markets.

Despite its agricultural productivity, the region faces challenges from urban expansion, erosion, and poor resource management. Improper irrigation practices have led to soil salinization and reduced productivity, while over-tillage and intensive cultivation have depleted organic matter in soils. Nonetheless, promising developments such as organic farming and floriculture are emerging to improve sustainability.

The Tunisian Living Lab is a collaborative innovation space involving end-users in real-world testing of agroecological and subsoil management practices across urban, peri-urban, forest, and agricultural landscapes. It emphasizes conservation of organic matter, use of compost and biofertilizers, and water-efficient cropping systems tailored to variable soil textures and depths.
    `,
  },

  // Egypt
  {
    id: "ll-egypt",
    title: "Living Lab in Egypt",
    regionId: "Mediterranean",
    image: "",
    gallery: [],
    description: `
The Sekem Living Lab is located in the Eastern part of the Nile Delta, within the Sharkia Governorate of Egypt. Centered around the town of Belbies (Latitude: 31.517, Longitude: 30.418), this Living Lab represents a key agricultural and ecological site within the Mediterranean biogeographical region.

Sharkia is one of Egypt’s largest agricultural governorates, with more than 850,000 feddans of cultivated land. The region is a vital contributor to national food security, known for producing staple crops such as cotton, wheat, rice, fava beans, sugar beets, and barley. This intensive agricultural activity is complemented by notable industrial sectors including textiles, chemicals, and building materials.

The geographical landscape of the Living Lab includes fertile plains bordered by Lake Manzalla to the north and the governorates of Ismailia, Qalyubiya, and Gharbia in other directions. In addition to its agricultural importance, the region is rich in cultural heritage, with archaeological sites from pre-dynastic Egypt to modern history scattered across Blbes, Tal Basta, and Qanteer.

Biogeographically, the Sekem Living Lab falls within the Mediterranean region, characterized by dry, hot summers and mild, wetter winters. The average summer temperature hovers around 27°C, while winter averages drop to 18°C. Rainfall is more frequent in the northern and western parts of the governorate, influenced by Mediterranean weather depressions, while wind patterns—mainly northeastern and northwestern—help moderate the climate. However, seasonal southwestern winds known as Al-Khamaseen can raise temperatures sharply and transport dust, negatively impacting soil and crop quality.

The region is also culturally significant for its traditional practices, including the breeding of pure Arabian horses, with annual festivals held in honour of this heritage. This social dimension adds a unique layer to the Living Lab, allowing the integration of sustainable land-use strategies with the preservation of local traditions.

The population of Sharkia Governorate exceeds 8 million, highlighting both the opportunities and pressures of implementing sustainable soil and agricultural management at scale. The Sekem Living Lab, within the SUS-SOIL project, serves as a platform for testing regenerative agriculture practices, promoting stakeholder collaboration, and addressing challenges such as soil degradation, climate stress, and land-use competition.

By rooting its activities in such a historically and agriculturally rich setting, the Sekem Living Lab provides valuable insights into sustainable land management applicable not only in Egypt but across arid and semi-arid regions of the Mediterranean basin.
    `,
  },

  // Greece
  {
    id: "ll-greece",
    title: "Living Lab in Central Greece",
    regionId: "Mediterranean",
    image: LL_Greece,
    gallery: [],
    description: `
Central Greece (Sterea Ellada) is one of Greece’s thirteen administrative regions, with a total population of approximately 500,000. It is located in the central part of the Greek mainland, bordered by Thessaly to the North, Attica to the southeast, and Western Greece to the west. Ιts administrative capital is Lamia, a city located in the regional unit of Phthiotis. The region fertures a diverse landscape of coastal areas, fertile plains, and  extensive mountain ranges, supporting multiple land uses, including agriculture, livestock farming, forestry, and tourism. Evrytania, one of the regional units of Central Greece, is characterized by a rugged mountainous terrain and rich forest cover. 

To support applied research on agroforestry systems and better understand soil properties accross mixed land use types, a Living Lab has been established across the mountainous landscape of Evrytania and part of northern Fthiotida-a transitional area that borders Evrytania and shares similar topographic and ecological characteristics. The focus area includes the wider region of Saint Nikolaos, near Karpenisi (capital of Evrytania), where traditional agriculture coexists with forested land, creating ideal conditions for studying soil-crop-forest interaction under real field conditions. 

The Saint Nikolaos area is situated approximately 1,000 meters elevation in the Pindus Mountain range, and is characterized by steep terrain, dense fir forests, and numerous springs and streams. It has a mountain Mediterranean climate with cold, snowy winters and warm, dry summers. This seasonal weather affects the type of plants that grow and the way farming is done. The geological substrate is complex, with flysch being the dominant formation. Flysch consists of alternating layers of sandstones, shale and siltstone, and its weathering leads to the formation of shallow, erodible, and often acidic soils. In addition to flysch, there are also occurrences of limestone (karstic) formations, particularly in higher zones, with produce more alkaline soils with different drainage properties. Other rock types in the broader area include schist, alluvium and ophiΙolites, which contribute to localized variations in soil texture and mineral composition.

The soils of the Living Lab area are primarily developed on flysch parent material and exhibit variation in depth, stoniness and texture, creating a heterogeneous soilscape that influences local vegetation patterns, erosion dynamics, and land use practices. 

The landscape includes cultivated plots, extensive forested areas and semi-natural zones, providing an ideal setting for comparing soil characteristics across various land use types. Local agriculture is predominantly small-scale, featuring crops such as potatoes, beans, and aromatic herbs, alongside pasturelands used for grazing. The forested areas are dominated by Greek fir (Abies Cephalonica) and Bulgarian fir (Abies borisii-regis), mixed oak species, and chestnut trees, forming dense montane forests that play a crucial role in maintaining soil stability and local biodiversity. This Living Lab offers a practical and diverse environment for conducting field-based soil analyses, facilitating accurate land evaluation and supporting evidence-based agricultural planning in mountainous regions.
    `,
  },

  // Bosnia & Herzegovina (note: region is Continental per your list)
  {
    id: "ll-bosnia-herzegovina",
    title: "Living Lab in Bosnia-Herzegovina",
    regionId: "Continental",
    image: LL_Bosnia,
    gallery: [],
    description: `
The Bosnian-Herzegovinian Living Lab is located in the central and northeastern part of the country, within the Federation of Bosnia and Herzegovina. It spans three municipalities, Ilidža, Bugojno, and Živinice, each strategically selected for their diverse geographical, climatic, and socio-economic conditions. Together, they represent a broad spectrum of landscapes and land-use systems, from lowland floodplains and hilly terrain to mountainous forested areas.

The region covered by the Living Lab includes suburban, rural, and industrial zones, offering a representative cross-section of Bosnia and Herzegovina’s environmental and agricultural contexts. Landscapes range from river valleys and natural springs in Ilidža, to the forested highlands of Bugojno, and the lowland-hilly mosaic of Živinice. The climate is predominantly moderate continental, with variations due to altitude: warmer conditions in the lowlands and colder, more variable weather in the mountains.

Biogeographically, the area belongs to the Continental region, marked by deciduous forests, mountain ecosystems, and transitional zones that support both biodiversity and agricultural production. Soil types vary significantly: Fluvisols in river valleys, suitable for intensive agriculture; Calcomelanosols in mountainous zones, supporting forestry and pasture; and hydromorphic soils like Pseudogley and Stagnogley in wetter lowland areas, which require specific management due to poor drainage.

Agricultural practices across the Living Lab are shaped by these varied soil and climate conditions. In the floodplains and valleys, crop production is common, while mountain areas are more oriented towards forestry and pasture-based systems. The region faces typical challenges such as soil erosion, climate variability, and land-use pressure, particularly in zones affected by urban expansion or industrial activity.

The selection of Ilidža, Bugojno, and Živinice within the SUS-SOIL project reflects an integrated approach to sustainable soil management that acknowledges the complex interplay of environmental and social factors. Cooperation with local agricultural services supports the identification of experimental sites and fosters inclusive stakeholder engagement. This Living Lab thus provides a grounded, adaptable framework for developing and testing sustainable land-use strategies applicable both locally and in similar contexts across Southeast Europe.
    `,
  },

  // Slovakia (mapped to Alpine, also appears in Pannonian list)
  {
    id: "ll-slovakia",
    title: "Living Lab in Slovakia",
    regionId: "Alpine",
    image: LL_Slovakia,
    gallery: [],
    description: `
The Slovak Living Lab is located in two regions (or districts):  Zvolen and Trnava.  They differ in geology, relief, history of land use and socio-economic parameters. Sample point locations were selected to meet the requirements and objectives of the project, while also representing the landscape, geological, soil, land use, and socio-economic diversity of the region.

Most of the sampling points are located in the Zvolenská kotlina (Zvolen Basin), forming a cluster near the LUCAS point at coordinates 48.5271 N, 19.1894 E, not far from the town of Zvolen. The centre of this region is Zvolen (about 300 m a.s.l.), a town with the population of about 39,000 inhabitants.  The Zvolen basin is surrounded by mountain ranges covered by managed broadleaved and mixed forests. The highest mountain is Poľana (1457 m a.s.l.), one of the highest extinct volcanos in Central Europe. The dominated geological substrates are andesites and other volcanic rocks. Most soils are classified as various subtypes of Cambisols.  In central part of this region, in the bottom of the Zvolen basin, the geological substrates are quaternary alluvial sediments and loams with Fluvisols (at the rivers) and Planosols. Mean annual temperature near Zvolen is 8.0 °C (decreasing with increasing altitude toward the surrounding mountains). The dominant land use is agriculture (mainly cropland, and to a certain extent also grassland). Several well-developed villages are here, and scattered settlement is characteristic at the periphery of the basin. This part of the LL belongs to the Alpine biogeographical region.  

The contrasting part of the Living Lab is located in the south-western part of Slovakia, in the Danube lowland. The cluster of sampling points is situated in the Trnavská tabuľa (Trnava Table), centred around the LUCAS point at coordinates 48.5349 N, 17.6634 E, in the vicinity of the town of Trnava, which has a population of about 66,000 inhabitants (146 m a.s.l.). This town is one of important centres of intensive agriculture and the food industry ((although in recent decades, the automotive industry and the nearby nuclear power plant have also become significant from a socio-economic perspective). This part of the Danube lowland is called Trnava table. The geological substrate is loess or loess-loam, the most productive soils here are Chernozems, however, Luvisols are also significantly represented, and in areas with long-term intensive agricultural land use, some soils have degraded into Regosols (due to soil erosion). The mean annual temperature is 10.0 °C, and the mean annual precipitation is about 550 mm. This part of the LL belongs to the Pannonian biogeographical region.  
    `,
  },

  // Finland
  {
    id: "ll-finland",
    title: "Living Lab in North Savo, Finland",
    regionId: "Boreal",
    image: LL_Finland,
    gallery: [],
    description: `
The region of North Savo, or Pohjois-Savo in Finnish, is the sixth largest region of Finland and is spread over 17345 km2 of with 248190 of total population. It is located in Eastern Finland and borders with regions of South Savo, Central Finland, North Ostrobothnia and North Karelia. In the region there are 19 municipalities, and Kuopio is the biggest municipality with 124021 population. As per the population statistics, the population change from 2020 to 2023 in this region has been negative, - 0.01%. Over 62% of population in the region lives within and in the periphery of urban areas and about 56% of population share 18-64 working age group. 

According to Köppen-Geiger climate classification the region of North Savo in Finland is categorized under continental subarctic climate (Dfc). Being situated in a northern latitude, North-Savo region experiences a large variation in air temperature within a year. The coldest months in the North-Savo region are January and February where air temperature can plummet down to -33 °C. The temperature starts to rise gradually with spring months and can reach up to 33 °C during June-July. The region has short growing seasons lasting about 150 days and expanding from May to September. While most of the precipitation in the region is in the form of snow during winter, July and August are the wettest months in the year where rainfall can reach up to 96 mm. The annual precipitation in the region is 617 mm per year.

As the sixth largest county of Finland, North-Savo has a regional council and is a statutory joint authority representing inhabitant, municipalities and business interest nationally and internationally. All 19 municipalities of the region are members of the council. 

Jointly with Ostrobothnia, the neighbouring region, North-Savo region is one of the largest milk and beef producing regions in Finland. Together, they are the biggest grass producing regions in Finland. Grass, milk and beef production is a crucial factor for socio-economic development of the region and the SUSGRASS Living Lab will play a major role towards achieving the sustainability of grassland-based livestock farming. 
    `,
  },

  // Tuscany
  {
    id: "ll-tuscany",
    title: "Living Lab in Tuscany, Italy",
    regionId: "Mediterranean",
    image: "",
    gallery: [],
    description: `
‘Agro-SALUTE’ is a Living Lab of the SUS-SOIL network based in San Piero a Grado, Pisa. It is located at the Department of Veterinary Science (DSV) of the University of Pisa, in this centre students do their apprenticeships, researcher conduct various experiments but there are also productive fields. Pisa is one of the lowest density provinces in the region with 167 inhabitants per km2 for this reason it has strong agricultural traditions: cereals, sunflowers and forage crops are the most important crops of the area, olive groves and vineyards are also widespread as well as livestock farming. 

The location is found in central Tuscany, just 5 km from the see at it is located in a floodplain created by the Arno River, the second most important river in Central Italy. It presents a typical Mediterranean Climate causing rainfall to be concentrated in Spring and Autumn, and summer to be hot and dry.

Agricultural practices in the area were heavily incentivized in the last century by land reclamation processes that involved huge areas of the Arno basin creating agricultural land from humid areas. The fluvial soil below the living lab fields is both clay soil and sandy soil enabling the Living Lab to be a perfect environment for experimentation. Agriculture in the area is at risk of extreme heat, scarcity of water but also floods and fires. 

The region Tuscany has dedicated many funds to agriculture related project within its boundaries, trough the PNRR and the RDP many activities related to agroforestry in mountains areas or funded farms to integrate activities related to environmental education, and community engagement. One third of the Tuscany farms is also certified as organic, Tuscany shows to be a thriving agricultural ecosystem and the Agro-SALUTE living lab aims to integrate the best environmental practices to farmers, following them during the course of the years and assist them in their transition.
    `,
  },

  // Veneto (mapped to Continental)
  {
    id: "ll-veneto",
    title: "Living Lab in Veneto, Italy",
    regionId: "Continental",
    image: "",
    gallery: [],
    description: `
The Living Lab "SUS-SOIL Agroforest Veneto" is located at Azienda Agricola Pettorina di Francesco da Schio, in Cambio di Villadose, within the Veneto region of northeastern Italy (coordinates: 45.090834, 11.929652) and within the Continental Biogeographical Region. This area lies in the fertile Po Valley, a vast and highly productive agricultural region between the Po and Adige rivers, two of the most significant waterways in northern Italy. Veneto is one of Italy’s twenty regions, with Venice as its capital, and is known for its strong agricultural, industrial, and tourism sectors. The province of Rovigo, where the Living Lab is situated, is characterized by extensive plains, a well-developed irrigation system, and a rural population density of approximately 130-140 inhabitants per km².

The local climate features cold, rainy winters and warm, humid summers, which, combined with deep and fertile soils, make it an ideal area for intensive agriculture. The region plays a crucial role in national food production, particularly for maize, soybeans, and wheat. The landscape is shaped by a dense network of canals and drainage ditches, originally constructed to regulate water levels and support agricultural activities. Historically, hedgerows were commonly planted along these waterways, serving as windbreaks and enhancing biodiversity. However, over recent decades, the expansion of monoculture cereal farming has led to the widespread removal of these natural barriers.

Politically, Veneto has a strong identity and has seen periodic pushes for greater autonomy, with referendums advocating for increased fiscal independence from Rome. The region plays a crucial role in shaping Italy’s agricultural policies, given its economic influence and its alignment with EU Common Agricultural Policy (CAP) objectives. Investments in rural development, water management, and agroforestry initiatives are often co-financed by the EU, the Italian government, and the Veneto regional administration, reflecting broader efforts to balance economic growth with environmental sustainability.
    `,
  },

  // Turkey
  {
    id: "ll-turkey",
    title: "Living Lab in Çukurova, Turkey",
    regionId: "Mediterranean",
    image: "",
    gallery: [],
    description: `
The Central Taurus Mountains geographically border the Çukurova region to the north and west, the Amanos Mountains to the east, and the Mediterranean Sea to the south. Home to more than 7 million people, it also hosts some of Türkiye’s most significant cultural heritage sites.. The Çukurova plain is a geographical region known for its high agricultural potential. Çukurova is located in the top third of the most extensive agricultural plains. The Ceyhan, Seyhan, and Berdan Rivers irrigate the agricultural plains. Adana, one of the largest cities in the Çukurova plain, is primarily engaged in agriculture and related industries. With latitudes of approximately 37.053243°N and longitudes of 35.246517°E, the city has an approximate area of 13,844 km2 (2024 km²) and an elevation of approximately 133 meters above sea level.

Due to its Mediterranean climate, precipitation is generally concentrated in the winter months, while summers are quite dry. The average annual rainfall is approximately 726 mm. The yearly average temperature is approximately 19.3°C. Adana's agricultural structure is based on a balanced trio of grains, industrial crops, and citrus fruits. Grains (wheat, barley, and corn) account for 35% of total production, industrial crops (cotton, sunflower, soybean, and peanuts) account for 25%, and fruits (citrus, grapes, pomegranates, and bananas) account for 20%.

Living Laboratories aim to protect and maintain the health of surface (0-30 cm) and subsurface (30-100 cm) soils. They aim to identify measures to prevent the loss of subsurface soil functions, particularly in today's world, where surface soils are severely degraded, and also to understand the role of subsurface soil in ecosystem services. In this context, the living laboratory activities we will carry out in our region will bring together regional producers who have adopted agroecological and regenerative agriculture activities, carry out innovative and sustainable agricultural practices, and report the results and share them with other stakeholders (public, academia, producers, and non-governmental organisations) to become a lighthouse for other producers.
    `,
  },

  // Netherlands (no detailed description provided beyond inclusion)
  {
    id: "ll-netherlands",
    title: "Living Lab in the Netherlands",
    regionId: "Atlantic",
    image: "",
    gallery: [],
    description: "",
  },
];