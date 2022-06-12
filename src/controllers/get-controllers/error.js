const ErrorPageRenderer = require("../../services/page-renderer-service/error-page-renderer");

module.exports.get404 = ErrorPageRenderer.render404Page;
