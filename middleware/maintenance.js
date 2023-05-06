/* eslint-disable consistent-return */
export default function ({ route, redirect }) {
  const maintenanceMode = true; // change to false when you want to disable the maintenance mode
  const allowedRoutes = ['/maintenance']; // routes that are allowed even when in maintenance mode

  if (maintenanceMode && !allowedRoutes.includes(route.path)) {
    return redirect('/maintenance');
  }
}
