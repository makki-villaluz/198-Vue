<template>
  <div class="home">
    <b-jumbotron>
      <b-container style="height: 180px">
          <img src="/static/favicon.png" height="180">
          <!-- <img src="../../public/favicon.png" height="180" style="padding-right: 10px; float: left"> -->
          <div style="display: inline">
            <h1 class="display-3" style="padding-top: 30px">JeePS</h1>
            <p>An online system for monitoring the service contracting measures of Public Utility Vehicles</p>
          </div>
      </b-container>
    </b-jumbotron>

    <div class="content">
      <b-container>
        <b-card>
          <template #header>
            <h2>Pages</h2>
          </template>
          <b-row>
            <b-col style="padding: 20px 0">
              <div style="margin: auto; width: 180px">
                <b-button variant="outline-dark" to="/vehicles" style="width: 180px;">
                  <img src="/static/trajectories.png" height="150">
                  <!-- <img src="../../public/vehicles.png" height="150"> -->
                  <h3>Vehicles</h3>
                  <div>View and Analyze Vehicles</div>
                </b-button>
              </div>
            </b-col>
            <b-col style="padding: 20px 0">
              <div style="margin: auto; width: 180px">
                <b-button variant="outline-dark" to="/routes" style="width: 180px;">
                  <img src="/static/routes.png" height="150">
                  <!-- <img src="../../public/routes.png" height="150"> -->
                  <h3>Routes</h3>
                  <div>Upload and View Routes</div>
                </b-button>
              </div>
            </b-col>
            <b-col style="padding: 20px 0">
              <div style="margin: auto; width: 180px">
                <b-button variant="outline-dark" to="/parameters" style="width: 180px;">
                  <img src="/static/trajectories.png" height="150">
                  <!-- <img style="margin: 10px 0" src="../../public/parameters.png" height="130"> -->
                  <h3>Parameters</h3>
                  <div>Edit Analysis Parameters</div>
                </b-button>
              </div>
            </b-col>
            <b-col style="padding: 20px 0">
              <div style="margin: auto; width: 180px">
                <b-button variant="outline-dark" to="/admin" style="width: 180px;">
                  <img src="/static/trajectories.png" height="150">
                  <!-- <img src="../../public/admin.png" height="150"> -->
                  <h3>Admin</h3>
                  <div>Manage Accounts and Settings</div>
                </b-button>
              </div>
            </b-col>
            <b-col style="padding: 20px 0">
              <div style="margin: auto; width: 180px">
                <b-button variant="outline-dark" to="/about" style="width: 180px;">
                  <img src="/static/about.png" height="150">
                  <!-- <img src="../../public/about.png" height="150"> -->
                  <h3>About</h3>
                  <div>Learn more about the JeePS Project</div>
                </b-button>
              </div>
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
            <b-container style="margin-top: 20px">
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
  h2 {
    margin: 0;
  }
</style>
