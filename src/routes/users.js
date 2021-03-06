const router = require("express").Router(),
  { userControllers } = require("../controllers");

router.post("/", userControllers.createUser);

router.get("/spending-details/:gid/:userId", userControllers.getSpendingDetails);

router.get("/balances/:gid", userControllers.getBalances);

module.exports = router;
