<template>
  <div class="home">
    <b-jumbotron>
      <b-container>
        <h1 class="display-3">Team 2 Project</h1>
        <p>Present 5 features we've implemented for CS 198</p>
      </b-container>
    </b-jumbotron>

    <div style="text-align: left">
      <b-container>
        <h1 class="display-4">Features</h1>
      </b-container>
      <b-container style="margin-top: 20px">
        <h2>Total Distance Travelled</h2>
        <p>Uses the Haversine formula to calculate the total distance travelled given a GPX file</p>
      </b-container>
      <b-container style="margin-top: 20px">
        <h2>Speeding Violation Detector</h2>
        <p>Determines if a speeding violation (in km/hr) occured for a given duration of time (in minutes). This can detect speeding in 2 ways: from the speed readings in the GPX file ('Explicit'), or by calcuating the speed from the latitude and longitude ('Location')</p>
      </b-container>
      <b-container style="margin-top: 20px">
        <h2>Stop Violation Detector</h2>
        <p>Determines if a stop violation occured. A vehicle is only allowed to stay in a given location for a defined duration of time The user must input the upper left and lower right points of the location, and the minimum and maximum allowed time (in seconds)</p>
      </b-container>
      <b-container style="margin-top: 20px">
        <h2>Liveness Checking</h2>
        <p>Determines the total time a vehicle is "alive" or active. A vehicle is considered alive if the gaps between GPS readings are less than a given time limit</p>
      </b-container>
      <b-container style="margin-top: 20px">
        <h2>Loop Counter</h2>
        <p>Calculates the number of loops a vehicle makes in a route, given a grid size in km</p>
      </b-container>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>

<style scoped>

</style>
