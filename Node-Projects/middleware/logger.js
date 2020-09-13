const express = require('express');

function log(req, res, next) {
  console.log('I am logging this shit...');
  next();
}

module.exports = log;
