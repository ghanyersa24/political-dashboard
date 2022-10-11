<template>
  <div>
    <atoms-card>
      <template v-slot:header>
        <h4>Data Request</h4>
        <div class="card-header-action">
          <atoms-button to="/data-request">
            Add <i class="fas fa-plus"></i>
          </atoms-button>
          <atoms-button secondary>
            View More <i class="fas fa-chevron-right"></i>
          </atoms-button>
        </div>
      </template>
      <div class="table-responsive">
        <table class="table table-striped">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Tags</th>
              <th>Date Range</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            <tr>
              <td><a href="#">INV-87239</a></td>
              <td class="font-weight-600">Presiden RI</td>
              <td>10 July 2022 - 30 Oktober 2022</td>
              <td><div class="badge badge-warning">In Progress</div></td>
              <td>
                <a href="#" class="btn btn-primary">Detail</a>
              </td>
            </tr>
            <tr>
              <td><a href="#">INV-87240</a></td>
              <td class="font-weight-600">DPR RI</td>
              <td>10 July 2022 - 30 Oktober 2022</td>
              <td><div class="badge badge-success">Done</div></td>
              <td>
                <a href="#" class="btn btn-primary">Detail</a>
              </td>
            </tr>
            <tr>
              <td><a href="#">INV-87239</a></td>
              <td class="font-weight-600">POLISIRI</td>
              <td>10 July 2022 - 30 Oktober 2022</td>
              <td><div class="badge badge-danger">Failed</div></td>
              <td>
                <a href="#" class="btn btn-primary">Detail</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </atoms-card>
  </div>
</template>
<script>
export default {
  name: 'home-page',
};
</script>
