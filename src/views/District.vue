<template>
  <v-layout fill-height column>
    <v-flex align-self-center>
      <h2 style="margin: 10px; text-align: center;">Postal Code: {{postalCode}}</h2>
      <h4 style="margin: 10px;">Neighbor: {{formattedNeighbor}}</h4>
    </v-flex>
    <gmap-map :center="{lat:10, lng:10}" style="height: inherit;" :options="mapOption" ref="map">
      <GmapMarker :position="center" :clickable="true"/>
    </gmap-map>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      mapOption: {
        disableDefaultUI: true,
        gestureHandling: "none",
        zoomControl: false
      },
      formattedNeighbor: "",
      postalCode: ""
    };
  },
  computed: {
    center() {
      const coords = this.$store.state.coords;
      const center = coords
        ? { lat: coords.latitude, lng: coords.longitude }
        : null;
      return center;
    }
  },
  watch: {
    center(newCoords) {
      console.log(arguments)
      if (newCoords !== null) {
        console.log(newCoords);
        this.geocode();
      }
    }
  },
  mounted() {
    if (this.center) {
      this.geocode();
    }
  },
  methods: {
    async geocode() {
      const { lat, lng } = this.center;
      const that = this;
      this.$refs.map.$mapPromise.then(map => {
        const location = new google.maps.LatLng(lat, lng);
        // map.panTo(location);
        const geo = new google.maps.Geocoder();
        geo.geocode(
          {
            location
          },
          (arr, status) => {
            if (arr.length > 0) {
              const postalCode = arr[0].address_components.find(cp =>
                cp.types.find(type => type === "postal_code")
              );
              const country = arr[0].address_components.find(cp =>
                cp.types.find(type => type === "country")
              );
              const { formatted_address } = arr.find(ob =>
                ob.types.find(type => type === "neighborhood")
              );
              that.formattedNeighbor = formatted_address;
              that.postalCode = postalCode.long_name;
              console.log(arr);
              new google.maps.KmlLayer({
                url: `https://iamswain25.github.io/zipcode-kml/${
                  country.short_name
                }/zip${postalCode.long_name}.kml`,
                map: map
              });
            } else {
              console.log(status);
            }
          }
        );
      });
    }
  }
};
</script>
