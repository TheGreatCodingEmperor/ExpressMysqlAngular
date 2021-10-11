module.exports = app => {
    const accounts = require('../controllers/account.controller.js');
    var router = require('express').Router();
    // Create a new Tutorial
    router.post("/signup", accounts.create);

    // Retrieve all accounts
    router.get("/", accounts.findAll);

    // Authentication
    router.post("/token", accounts.auth);

    // Retrieve all published accounts
    router.get("/published", accounts.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", accounts.findOne);

    // Update a Tutorial with id
    router.put("/:id", accounts.update);

    // Delete a Tutorial with id
    router.delete("/:id", accounts.delete);

    // Delete all accounts
    router.delete("/", accounts.deleteAll);

    app.use('/api/accounts', router);
}