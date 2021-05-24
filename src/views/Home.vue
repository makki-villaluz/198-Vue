<template>
  <div class="home">
    <b-jumbotron>
      <b-container>
        <b-row>
          <b-col cols="2">
            <img src="/static/favicon.png" height="180">
          </b-col>
          <b-col>
            <div style="padding-top: 30px">
              <h1 class="display-3">JeePS</h1>
              <p>An online system for monitoring the service contracting measures of Public Utility Vehicles</p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-jumbotron>

    <div class="content">
      <b-container>
        <b-card>
          <template #header>
            <h2>Pages</h2>
          </template>
          <b-row>
            <b-col class="3">
              <b-button variant="outline-dark" to="/trajectories">
                <img src="/static/trajectories.png" height="150">
                <h3>Trajectories</h3>
                <div>Upload, View, Analyze, Edit, and Delete Trajectories</div>
              </b-button>
            </b-col>
            <b-col class="3">
              <b-button variant="outline-dark" to="/routes">
                <img src="/static/routes.png" height="150">
                <h3>Routes</h3>
                <div>Upload, View, Edit, and Delete Routes</div>
              </b-button>
            </b-col>
            <b-col class="3">
              <b-button variant="outline-dark" to="/stops">
                <img src="/static/stops.png" height="150">
                <h3>Stops</h3>
                <div>Upload, View, Edit, and Delete Stops</div>
              </b-button>
            </b-col>
            <b-col class="3">
              <b-button variant="outline-dark" to="/about">
                <img src="/static/about.png" height="150">
                <h3>About</h3>
                <div>Learn more about the JeePS Project</div>
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-container>
    </div>

    <div class="content">
      <b-container>
        <b-card>
          <template #header>
            <h2>Features</h2>
          </template>
          <div style="text-align: left">
            <b-container>
              <h3>Total Distance Travelled</h3>
              <p>Uses the Haversine formula to calculate the total distance travelled given a GPX file</p>
            </b-container>
            <b-container style="margin-top: 20px">
              <h3>Speeding Violation Detector</h3>
              <p>Determines if a speeding violation (in km/hr) occured for a given duration of time (in minutes). This can detect speeding in 2 ways: from the speed readings in the GPX file ('Explicit'), or by calcuating the speed from the latitude and longitude ('Location')</p>
            </b-container>
            <b-container style="margin-top: 20px">
              <h3>Stop Violation Detector</h3>
              <p>Determines if a stop violation occured. A vehicle is only allowed to stay in a given location for a defined duration of time The user must input the upper left and lower right points of the location, and the minimum and maximum allowed time (in seconds)</p>
            </b-container>
            <b-container style="margin-top: 20px">
              <h3>Liveness Checking</h3>
              <p>Determines the total time a vehicle is "alive" or active. A vehicle is considered alive if the gaps between GPS readings are less than a given time limit</p>
            </b-container>
            <b-container style="margin-top: 20px">
              <h3>Loop Counter</h3>
              <p>Calculates the number of loops a vehicle makes in a route, given a grid size in km</p>
            </b-container>
          </div>
        </b-card>
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
  .content {
    margin: 32px 0 32px;
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
