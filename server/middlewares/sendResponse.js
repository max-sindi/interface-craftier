// It works in the next way: controller takes some data from db, defines found data to response.data
// and call this next middleware.
// This middleware checks response.data: if it null - sends 404; if data exists - just sends it
export default function(request, response) {
  if(response.data === null) {
    response.status(404).json({ok: false})
  } else {
    response.json(response.data)
  }
}