

module.exports.render404Page = (request, response)=>{
  response.render404Page("errors/404", {
    documentTitle: "Error! 404 Not found"
  })
}
