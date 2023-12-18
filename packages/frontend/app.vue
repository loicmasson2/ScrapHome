<script setup lang="ts">
const {data} : Array<Home> = await useFetch('http://127.0.0.1:8008/homes')
interface Image {
  [key: number]: {
    id:number,
    uri:string
  }
}
interface Home {
  id: number;
  summary: string;
  price: number
  iamges: Image[]
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold underline py-4">
      Hello HomeScrap!
    </h1>
    <div class="flex flex-row">
      <div class="w-1/2">
        <div v-for="home in data">
          <div class="flex flex-row py-4">
            <div class="w-1/2">
              <AspectRatio :ratio="16 / 9">
                <img
                    class="h-full w-full object-cover"
                    v-bind:src="'https:'+ Object.values(home.images.images)[0].image.uri.replace('{imageParameters}', 'fit,q80')"
                    alt="First picture of the home"
                >
              </AspectRatio>
            </div>
            <div class="w-1/2 p-2">
              <h2>{{ home.summary }}</h2>
              <div class="flex flex-row">
                <div class="w-1/3">
                  <h3>Price</h3>
                  <span>
                  {{ home.price }} euros
                </span>
                </div>
                <div class="w-1/3">
                  <h3>Size</h3>
                  <span>
                  {{ home.size }} m²
                </span>
                </div>
                <div class="w-1/3">
                  <h3>Nbr of rooms</h3>
                  <span>
                  {{ home.rooms }}
                </span>
                </div>
              </div>
              <div>
                <h3>Predicted price</h3>
                <span>
                  {{ home.predicted_price}}
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2">
        <MapboxMap
            map-id="test"
            :options="{
              style: 'mapbox://styles/loicmasson/cjr81xe2o07l42so0vcxxw1pn', // style URL
              center: [24.945831, 60.192059], // starting position
              zoom: 10 // starting zoom
            }"
        >
          <div v-for="home in data">
            <MapboxDefaultMarker
                :marker-id="String(home.id)"
                :options="{
                  color: home.predicted_price > home.price ? 'green' : 'red'
                }"
                :lnglat="{ lng: 	home.geolocation.longitude, lat: 	home.geolocation.latitude}"
            >
            </MapboxDefaultMarker>
          </div>
        </MapboxMap>
      </div>
    </div>
  </div>
</template>
