const hereCredentials = {
   id: 'UQ75LhFcnAv0DtOUwBEA',
   code: 'f5nyezNmYF4wvuJqQgNSkg'
}

const xyz = {
   space: 'Vv1iS7FJ',
   token: 'AbuvUKANJJEZR4nb1zkEXBE'
}

const hereIsolineUrl = (coords, range) => `https://isoline.route.api.here.com/routing/7.2/calculateisoline.json?app_id=${hereCredentials.id}&app_code=${hereCredentials.code}&mode=shortest;pedestrian;traffic:disabled&start=geo!${coords[0]},${coords[1]}&range=${range * 60}&rangetype=time`

const maxIsolineRangeLookup = {
   time: 5000,
   distance: 80000
}

const hereGeocoderUrl = (query) => `https://geocoder.api.here.com/6.2/geocode.json?app_id=${hereCredentials.id}&app_code=${hereCredentials.code}&searchtext=${query}`;

const hereReverseGeocodeUrl = (coordinates) => `https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=${coordinates[0]},${coordinates[1]},250&mode=retrieveAddresses&maxresults=1&gen=9&app_id=${hereCredentials.id}&app_code=${hereCredentials.code}`;

export {
   hereCredentials,
   xyz,
   hereIsolineUrl,
   maxIsolineRangeLookup,
   hereGeocoderUrl,
   hereReverseGeocodeUrl
}
