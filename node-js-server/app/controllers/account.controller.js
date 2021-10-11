const db = require("../models");
const Account = db.accounts;
const Op = db.Sequelize.Op;
const CryptoJs = require("crypto-js");
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const JWTGuard  = require('express-jwt');

function encrypt(plainText) {
  let salt = crypto.randomBytes(16).toString('hex');

  // Encrypt
  var ciphertext = CryptoJs.AES.encrypt(salt + plainText, 'secret key 123').toString();

  return {
    salt: salt,
    hash: ciphertext
  }
}

function decrypt(salt, ciphertext) {
  // Decrypt
  var bytes = CryptoJs.AES.decrypt(ciphertext, 'secret key 123');
  var plainText = bytes.toString(CryptoJs.enc.Utf8);
  return plainText.replace(salt,'');
}

function authentication(input,answer,info){
  if(input == answer){
    return jwt.sign({email:info.email,userId:info.userId},'123');
  }
  else{
    return null;
  }
}

// Authentication
exports.auth = (req,res)=>{
  Account.findOne({where: { username:req.body?.username }})
  .then(function(account) {
    if(!account){
      res.status(400).send("account or password is not currect");
    }
    let answer = decrypt(account.salt,account.hash);
    let token = authentication(req.body?.password,answer,{email:account.email,userId:account.id});
    if(token){
      res.status(200).send({token:token,username:account.username}); 
    }
    else{
      res.status(400).send("account or password is not currect");
    }
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while auth the Account."
    });
  });
}

// Create and Save a new Account
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  let pwdinfo = encrypt(req.body.password);
  // Create a Account
  const account = {
    username: req.body.username,
    salt:pwdinfo.salt,
    hash:pwdinfo.hash,
    email: req.body.email ? req.body.email : ''
  };

  // Save Account in the database
  Account.create(account)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Account."
      });
    });
};

// Retrieve all Accounts from the database.
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  Account.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving accounts."
      });
    });
};

// Find a single Account with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Account.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Account with id=" + id
      });
    });
};

// Update a Account by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Account.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Account was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Account with id=${id}. Maybe Account was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Account with id=" + id
      });
    });
};

// Delete a Account with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Account.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Account was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Account with id=${id}. Maybe Account was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Account with id=" + id
      });
    });
};

// Delete all Accounts from the database.
exports.deleteAll = (req, res) => {
  Account.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Accounts were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Accounts."
      });
    });
};

// find all published Account
exports.findAllPublished = (req, res) => {
  Account.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Accounts."
      });
    });
};
