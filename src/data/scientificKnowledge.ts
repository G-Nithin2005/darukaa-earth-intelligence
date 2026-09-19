import { KnowledgeRecord } from '../types';

export const SCIENTIFIC_KNOWLEDGE_BASE: KnowledgeRecord[] = [
  {
    id: 'fao-soc-2020',
    title: 'Recarbonizing Global Soils: A Technical Manual of Recommended Management Practices',
    organization: 'Food and Agriculture Organization (FAO)',
    author: 'FAO Intergovernmental Technical Panel on Soils (ITPS)',
    year: 2021,
    category: 'SOIL',
    sourceType: 'technical_manual',
    source_url: 'https://www.fao.org/documents/card/en/c/cb6378en',
    verificationRequired: false,
    summary: 'Soil organic carbon (SOC) levels below 1.0% in semi-arid soils significantly constrain moisture retention, microbial biomass, and nutrient cycling, reducing agroecosystem buffering against drought.',
    relevant_variables: ['soil_organic_carbon', 'soil_moisture', 'rainfall', 'temperature'],
    supportedDimensions: ['SOIL', 'CLIMATE', 'WATER'],
    supportedVariables: ['soil_organic_carbon', 'soil_moisture', 'rainfall', 'temperature'],
    supportedRelationshipTypes: ['hydrological_soil_desiccation', 'soil_carbon_depletion'],
    evidenceStatements: [
      {
        claim: 'Soil organic carbon levels below 1.0% in semi-arid soils significantly constrain moisture retention and microbiological activity, diminishing natural drought buffering.',
        supportedVariables: ['soil_organic_carbon', 'soil_moisture'],
        supportedRelationships: ['hydrological_soil_desiccation']
      },
      {
        claim: 'Residue retention and minimal soil disturbance stabilize hydraulic conductivity and biological priming in dryland topsoils.',
        supportedVariables: ['soil_organic_carbon', 'soil_moisture'],
        supportedRelationships: ['hydrological_soil_desiccation']
      }
    ],
    content: 'In dryland croplands, low soil organic matter destabilizes aggregate structures, which impedes precipitation infiltration and accelerates moisture evaporation under elevated temperatures. Enhancing SOC through minimum soil disturbance, residue retention, and organic amendments helps re-establish hydraulic conductivity and biological activity, creating a baseline for biodiversity recovery.'
  },
  {
    id: 'ipbes-global-2019',
    title: 'Global Assessment Report on Biodiversity and Ecosystem Services',
    organization: 'Intergovernmental Science-Policy Platform on Biodiversity and Ecosystem Services (IPBES)',
    author: 'Díaz, S., Settele, J., Brondízio, E. S., et al.',
    year: 2019,
    category: 'BIODIVERSITY',
    sourceType: 'assessment_report',
    doi: '10.5281/zenodo.3831673',
    source_url: 'https://doi.org/10.5281/zenodo.3831673',
    verificationRequired: false,
    summary: 'Land-use intensification and landscape simplification through monocultures constitute primary drivers of terrestrial biodiversity loss, reducing functional diversity of pollinators, soil organisms, and natural pest predators.',
    relevant_variables: ['land_use', 'monoculture', 'species_richness', 'habitat_diversity', 'pesticide_pressure'],
    supportedDimensions: ['BIODIVERSITY', 'LAND', 'HUMAN IMPACT'],
    supportedVariables: ['land_use', 'monoculture', 'species_richness', 'habitat_diversity', 'pesticide_pressure'],
    supportedRelationshipTypes: ['monoculture_simplification', 'landscape_fragmentation'],
    evidenceStatements: [
      {
        claim: 'Agricultural land-use intensification and homogeneous monoculture mosaics are dominant drivers of terrestrial species decline.',
        supportedVariables: ['monoculture', 'species_richness'],
        supportedRelationships: ['monoculture_simplification']
      },
      {
        claim: 'Interconnected semi-natural floral habitats and linear margins within farming matrices provide essential refugia and ecological connectivity.',
        supportedVariables: ['habitat_diversity', 'species_richness'],
        supportedRelationships: ['monoculture_simplification', 'landscape_fragmentation']
      }
    ],
    content: 'Homogeneous agricultural fields create ecological barriers and biological deserts for native taxa. Establishing interconnected semi-natural vegetation patches, hedgerows, and multi-species buffer strips provides critical refugia, microclimates, and foraging resources that stabilize species richness even within working agricultural zones.'
  },
  {
    id: 'ipcc-land-2019',
    title: 'Special Report on Climate Change and Land: Land Degradation & Desertification',
    organization: 'Intergovernmental Panel on Climate Change (IPCC)',
    author: 'IPCC Working Group on Land Degradation',
    year: 2019,
    category: 'CLIMATE',
    sourceType: 'assessment_report',
    source_url: 'https://www.ipcc.ch/srccl/chapter/chapter-4/',
    verificationRequired: false,
    summary: 'The compound interaction of elevated surface temperatures, erratic precipitation, and depleted soil organic matter accelerates land degradation feedback loops in arid and semi-arid drylands.',
    relevant_variables: ['temperature', 'rainfall', 'rainfall_variability', 'soil_organic_carbon', 'soil_moisture'],
    supportedDimensions: ['CLIMATE', 'SOIL', 'WATER'],
    supportedVariables: ['temperature', 'rainfall', 'rainfall_variability', 'soil_organic_carbon', 'soil_moisture'],
    supportedRelationshipTypes: ['hydrological_soil_desiccation', 'compound_evaporative_deficit'],
    evidenceStatements: [
      {
        claim: 'High surface temperatures coupled with low and variable rainfall accelerate evaporative losses and topsoil desiccation.',
        supportedVariables: ['temperature', 'rainfall', 'soil_moisture'],
        supportedRelationships: ['hydrological_soil_desiccation', 'compound_evaporative_deficit']
      },
      {
        claim: 'Maintaining continuous vegetative cover and root channels mitigates thermal soil degradation and helps decouple atmospheric heat spikes from subsoil drying.',
        supportedVariables: ['soil_organic_carbon', 'soil_moisture', 'temperature'],
        supportedRelationships: ['hydrological_soil_desiccation']
      }
    ],
    content: 'When sparse precipitation falls on bare or degraded soil surfaces during high-temperature windows, high evapotranspiration rates prevent effective subsoil recharge. Ecological restoration must prioritize living vegetative cover and continuous root channels to decouple temperature spikes from rapid soil desiccation.'
  },
  {
    id: 'usda-nrcs-2021',
    title: 'Soil Health Principles for Semi-Arid Agroecosystems',
    organization: 'USDA Natural Resources Conservation Service (NRCS)',
    author: 'USDA-NRCS Soil Health Division',
    year: 2021,
    category: 'SOIL',
    sourceType: 'government_guidance',
    source_url: 'https://www.nrcs.usda.gov/resources/guides-and-instructions/soil-health',
    verificationRequired: false,
    summary: 'Four biological principles—maximizing soil cover, maximizing biodiversity, maximizing continuous living roots, and minimizing disturbance—restore degraded dryland soils without excessive water consumption.',
    relevant_variables: ['soil_organic_carbon', 'soil_moisture', 'crop_type', 'monoculture'],
    supportedDimensions: ['SOIL', 'LAND'],
    supportedVariables: ['soil_organic_carbon', 'soil_moisture', 'crop_type', 'monoculture'],
    supportedRelationshipTypes: ['hydrological_soil_desiccation', 'soil_biological_regeneration'],
    evidenceStatements: [
      {
        claim: 'Maximizing soil armor, living roots, and biological diversity mitigates surface crusting and promotes water-stable aggregate formation.',
        supportedVariables: ['soil_organic_carbon', 'soil_moisture'],
        supportedRelationships: ['hydrological_soil_desiccation', 'soil_biological_regeneration']
      }
    ],
    content: 'In water-limited cereal cropping systems, introducing drought-adapted cover crop mixtures or pulse rotations increases mycorrhizal colonization and rhizosphere exudates. This biologically binds soil particles into water-stable aggregates, lowering surface crusting and increasing available water capacity over multi-year horizons.'
  },
  {
    id: 'nature-diversification-2020',
    title: 'Crop diversification enhances multitrophic diversity and agricultural ecosystem functions',
    organization: 'Nature Ecology & Evolution',
    author: 'Tamburini, G., Bommarco, R., Kleijn, D., et al.',
    year: 2020,
    category: 'LAND',
    sourceType: 'peer_reviewed',
    doi: '10.1038/s41559-020-1281-2',
    source_url: 'https://doi.org/10.1038/s41559-020-1281-2',
    verificationRequired: false,
    summary: 'Meta-analysis across global agricultural studies demonstrates that crop diversification interventions (intercropping, rotations, and agroforestry) consistently improve biodiversity, pollination, and pest regulation without yield penalties.',
    relevant_variables: ['crop_type', 'monoculture', 'habitat_diversity', 'species_richness', 'pesticide_pressure'],
    supportedDimensions: ['LAND', 'BIODIVERSITY', 'HUMAN IMPACT'],
    supportedVariables: ['crop_type', 'monoculture', 'habitat_diversity', 'species_richness', 'pesticide_pressure'],
    supportedRelationshipTypes: ['monoculture_simplification', 'trophic_web_restoration'],
    evidenceStatements: [
      {
        claim: 'Diversified cropping practices improve overall biodiversity, natural pest regulation, and pollination without incurring systemic yield penalties.',
        supportedVariables: ['monoculture', 'habitat_diversity', 'species_richness'],
        supportedRelationships: ['monoculture_simplification', 'trophic_web_restoration']
      }
    ],
    content: 'Transitioning from continuous wheat monocultures to spatial or temporal crop mixtures diversifies root architectures and canopy strata. This disrupts pest life cycles, mitigates the need for aggressive chemical interventions, and creates heterogeneous microhabitats for beneficial arthropods and avian species.'
  },
  {
    id: 'unep-drylands-2022',
    title: 'Frontiers 2022: Emerging Issues of Environmental Concern',
    organization: 'United Nations Environment Programme (UNEP)',
    author: 'UNEP Scientific Assessment Panel',
    year: 2022,
    category: 'WATER',
    sourceType: 'institutional_report',
    source_url: 'https://www.unep.org/resources/frontiers-2022-emerging-issues-environmental-concern',
    verificationRequired: false,
    summary: 'Seasonal water stress combined with chemical pesticide pressure triggers severe declines in non-target soil invertebrates and aquatic microfauna in catchment boundaries.',
    relevant_variables: ['water_availability', 'seasonal_stress', 'pesticide_pressure', 'water_quality'],
    supportedDimensions: ['WATER', 'HUMAN IMPACT', 'BIODIVERSITY'],
    supportedVariables: ['water_availability', 'seasonal_stress', 'pesticide_pressure', 'water_quality'],
    supportedRelationshipTypes: ['compound_evaporative_deficit', 'aquatic_chemical_stress'],
    evidenceStatements: [
      {
        claim: 'Seasonal hydrological deficits combined with agricultural chemical concentrations heighten physiological stress on freshwater and soil invertebrates.',
        supportedVariables: ['water_availability', 'seasonal_stress', 'pesticide_pressure'],
        supportedRelationships: ['compound_evaporative_deficit', 'aquatic_chemical_stress']
      }
    ],
    content: 'During dry seasons, residual pesticides become concentrated in declining water bodies and thin topsoil layers. Implementing vegetated riparian buffer zones and bio-swales slows surface runoff, filters synthetic compounds, and sustains vital moisture pockets that serve as seasonal biological oases.'
  },
  {
    id: 'fao-soil-biodiversity-2020',
    title: 'State of Knowledge of Soil Biodiversity: Status, Challenges and Potentialities',
    organization: 'Food and Agriculture Organization (FAO)',
    author: 'FAO, ITPS, GSBI, SCBD and EC',
    year: 2020,
    category: 'SOIL',
    sourceType: 'institutional_report',
    source_url: 'https://www.fao.org/documents/card/en/c/cb1928en',
    verificationRequired: false,
    summary: 'Soil organisms represent over 25% of Earth\'s biodiversity; their activity directly controls carbon sequestration, nitrogen mineralization, and plant disease suppression.',
    relevant_variables: ['soil_organic_carbon', 'soil_moisture', 'species_richness', 'pesticide_pressure'],
    supportedDimensions: ['SOIL', 'BIODIVERSITY', 'HUMAN IMPACT'],
    supportedVariables: ['soil_organic_carbon', 'soil_moisture', 'species_richness', 'pesticide_pressure'],
    supportedRelationshipTypes: ['monoculture_simplification', 'soil_microbial_depletion'],
    evidenceStatements: [
      {
        claim: 'Soil biota regulate carbon sequestration and nutrient cycling; intensive physical tillage and low organic carbon reduce microbial and earthworm activity.',
        supportedVariables: ['soil_organic_carbon', 'species_richness'],
        supportedRelationships: ['monoculture_simplification', 'soil_microbial_depletion']
      }
    ],
    content: 'Intense chemical inputs and repeated tillage in low-carbon soils decimate earthworm populations, collembola, and arbuscular mycorrhizal fungi (AMF). Re-establishing soil organic carbon inputs triggers biological priming, improving soil structure and enabling deep root penetration even under moderate moisture constraints.'
  },
  {
    id: 'ipbes-ipcc-co-2021',
    title: 'IPBES-IPCC Co-Sponsored Workshop Report on Biodiversity and Climate Change',
    organization: 'IPBES and IPCC',
    author: 'Pörtner, H.-O., Scholes, R. J., Agard, J., et al.',
    year: 2021,
    category: 'CLIMATE',
    sourceType: 'assessment_report',
    doi: '10.5281/zenodo.5101125',
    source_url: 'https://doi.org/10.5281/zenodo.5101125',
    verificationRequired: false,
    summary: 'Climate change and biodiversity loss are deeply interconnected crises that must be addressed concurrently through nature-based ecological restoration.',
    relevant_variables: ['temperature', 'rainfall_variability', 'habitat_diversity', 'native_species'],
    supportedDimensions: ['CLIMATE', 'BIODIVERSITY'],
    supportedVariables: ['temperature', 'rainfall_variability', 'habitat_diversity', 'native_species'],
    supportedRelationshipTypes: ['compound_evaporative_deficit', 'climate_biodiversity_coupling'],
    evidenceStatements: [
      {
        claim: 'Synergistic restoration prioritizing locally adapted perennial vegetation confers dual benefits for microclimatic resilience and biodiversity retention.',
        supportedVariables: ['temperature', 'habitat_diversity', 'native_species'],
        supportedRelationships: ['compound_evaporative_deficit', 'climate_biodiversity_coupling']
      }
    ],
    content: 'Single-variable mitigation strategies risk unintended negative outcomes. Interventions in degraded drylands must utilize locally adapted native flora and drought-tolerant perennial structures to build biophysical resilience against extreme climatic oscillations and preserve indigenous evolutionary lineages.'
  },
  {
    id: 'eea-water-retention-2021',
    title: 'Nature-based Solutions for Water Retention in Agricultural Landscapes',
    organization: 'European Environment Agency (EEA)',
    author: 'EEA Water and Agriculture Group',
    year: 2021,
    category: 'WATER',
    sourceType: 'institutional_report',
    source_url: 'https://www.eea.europa.eu/publications/water-retention-in-agriculture',
    verificationRequired: false,
    summary: 'Landscape-level water retention measures, such as contour bunds, swales, and agroforestry shelterbelts, moderate hydrological extremes and enhance dry-season soil moisture.',
    relevant_variables: ['water_availability', 'rainfall', 'soil_moisture', 'seasonal_stress'],
    supportedDimensions: ['WATER', 'CLIMATE', 'SOIL'],
    supportedVariables: ['water_availability', 'rainfall', 'soil_moisture', 'seasonal_stress'],
    supportedRelationshipTypes: ['hydrological_soil_desiccation', 'surface_runoff_interception'],
    evidenceStatements: [
      {
        claim: 'Landscape-level micro-water harvesting structures intercept sporadic runoff, enhancing root-zone infiltration and extending soil moisture into dry intervals.',
        supportedVariables: ['water_availability', 'soil_moisture', 'rainfall'],
        supportedRelationships: ['hydrological_soil_desiccation', 'surface_runoff_interception']
      }
    ],
    content: 'Contour swales and vegetated micro-basins capture episodic rainfall events that would otherwise escape as erosive overland flow. By directing runoff into the root zone, these systems recharge shallow aquifers and maintain soil moisture levels above wilting point for extended periods.'
  },
  {
    id: 'cbd-technical-2022',
    title: 'Ecological Corridors and Functional Connectivity in Agricultural Matrices',
    organization: 'Convention on Biological Diversity (CBD)',
    author: 'CBD Secretariat Technical Series No. 98',
    year: 2022,
    category: 'LAND',
    sourceType: 'technical_manual',
    source_url: 'https://www.cbd.int/doc/publications/cbd-ts-98-en.pdf',
    verificationRequired: false,
    summary: 'Fragmented agricultural landscapes require functional corridors composed of native vegetation to facilitate gene flow, seasonal migration, and recolonization of local species.',
    relevant_variables: ['fragmentation', 'habitat_diversity', 'native_species', 'species_richness'],
    supportedDimensions: ['LAND', 'BIODIVERSITY'],
    supportedVariables: ['fragmentation', 'habitat_diversity', 'native_species', 'species_richness'],
    supportedRelationshipTypes: ['monoculture_simplification', 'landscape_fragmentation'],
    evidenceStatements: [
      {
        claim: 'Linear perennial habitat corridors across simplified agricultural matrices provide critical movement pathways, increasing functional connectivity for native fauna.',
        supportedVariables: ['fragmentation', 'habitat_diversity', 'species_richness'],
        supportedRelationships: ['monoculture_simplification', 'landscape_fragmentation']
      }
    ],
    content: 'Narrow linear strips of native perennial grasses, shrubs, and flowering forbs along field margins significantly decrease isolation between remnant woodlots. These linear corridors function as movement pathways for beneficial predators and pollinators across monocultural expanses.'
  },
  {
    id: 'agee-soil-carbon-2015',
    title: 'Carbon sequestration in agricultural soils via cultivation of cover crops – A meta-analysis',
    organization: 'Agriculture, Ecosystems & Environment',
    author: 'Poeplau, C., & Don, A.',
    year: 2015,
    category: 'SOIL',
    sourceType: 'peer_reviewed',
    doi: '10.1016/j.agee.2014.10.024',
    source_url: 'https://doi.org/10.1016/j.agee.2014.10.024',
    verificationRequired: false,
    summary: 'Global meta-analysis confirming that integrating non-legume and legume cover crops into agricultural rotations accumulates organic carbon in topsoil while moderating soil thermal extremes.',
    relevant_variables: ['soil_organic_carbon', 'temperature', 'soil_moisture', 'crop_type'],
    supportedDimensions: ['SOIL', 'CLIMATE', 'LAND'],
    supportedVariables: ['soil_organic_carbon', 'temperature', 'soil_moisture', 'crop_type'],
    supportedRelationshipTypes: ['hydrological_soil_desiccation', 'soil_carbon_accumulation'],
    evidenceStatements: [
      {
        claim: 'Cover crops in arable rotations significantly increase soil organic carbon stocks compared to bare fallows, moderating surface temperature fluctuations.',
        supportedVariables: ['soil_organic_carbon', 'temperature', 'soil_moisture'],
        supportedRelationships: ['hydrological_soil_desiccation', 'soil_carbon_accumulation']
      }
    ],
    content: 'In cereal cropping rotations, cover crops protect topsoil from direct solar radiation and wind erosion during fallow intervals. The continuous root activity and fungal biomass accumulation promote soil macro-aggregation, preventing thermal degradation of existing organic carbon pools.'
  },
  {
    id: 'wmo-drylands-2021',
    title: 'Climate Indicators, Evapotranspiration and Drought Management in Fragile Drylands',
    organization: 'World Meteorological Organization (WMO)',
    author: 'WMO Commission for Agricultural Meteorology',
    year: 2021,
    category: 'CLIMATE',
    sourceType: 'institutional_report',
    source_url: 'https://library.wmo.int/doc_num.php?explnum_id=10825',
    verificationRequired: false,
    summary: 'Atmospheric vapor pressure deficit (VPD) exacerbates soil moisture loss in semi-arid zones, necessitating windbreaks and shade architecture to buffer crop microclimates.',
    relevant_variables: ['temperature', 'rainfall', 'rainfall_variability', 'water_availability'],
    supportedDimensions: ['CLIMATE', 'WATER'],
    supportedVariables: ['temperature', 'rainfall', 'rainfall_variability', 'water_availability'],
    supportedRelationshipTypes: ['compound_evaporative_deficit'],
    evidenceStatements: [
      {
        claim: 'Elevated atmospheric vapor pressure deficit accelerates evaporative moisture loss from bare topsoil, underscoring the role of windbreaks and shade in microclimatic moderation.',
        supportedVariables: ['temperature', 'rainfall_variability', 'water_availability'],
        supportedRelationships: ['compound_evaporative_deficit']
      }
    ],
    content: 'Higher temperatures elevate vapor pressure deficits, accelerating transpirational draw from shallow roots. Agro-ecological interventions incorporating multi-tiered windbreaks reduce local wind speeds and canopy temperatures, substantially reducing evaporative losses from exposed topsoil.'
  }
];

export const DEMO_CASE_INPUT = {
  location: {
    region: 'Semi-arid agricultural region',
    country: 'Global Drylands Agroecosystem (Case Study: Sub-humid Dryland Basin)',
    latitude: 31.52,
    longitude: 34.85
  },
  soil: {
    ph: 7.6,
    organicCarbonPercent: 0.3,
    moisturePercent: 12,
    soilType: 'Sandy loam / degraded calcic dryland soil'
  },
  land: {
    landUse: 'Monoculture',
    cropType: 'Wheat',
    isMonoculture: true,
    habitatAreaHa: 120,
    fragmentation: 'High'
  },
  biodiversity: {
    speciesRichness: 'Low',
    habitatDiversity: 'Low',
    nativeSpecies: 'Low',
    invasiveSpecies: 'Moderate'
  },
  climate: {
    temperature: 'High',
    rainfall: 'Low',
    rainfallVariability: 'High',
    seasonality: 'Extended dry season with brief episodic winter rains'
  },
  humanImpact: {
    pollution: 'Low',
    deforestation: 'Moderate',
    pesticidePressure: 'Moderate',
    urbanPressure: 'Low'
  },
  water: {
    availability: 'Seasonal scarcity',
    quality: 'Moderate',
    seasonalStress: 'High'
  }
};
