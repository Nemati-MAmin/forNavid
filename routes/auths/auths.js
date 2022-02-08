const express = require('express');
const {credentialValidator} = require('../../validator/auths/auths')
const authValidationErrorHandling = require('../../middlewares/errorhandling/auths')
const authControler = require('../../controlers/auths/auths')
const router = express.Router();

  router.post(
    '/login',
    credentialValidator,
    authValidationErrorHandling,
    authControler
  );

  module.exports = router
