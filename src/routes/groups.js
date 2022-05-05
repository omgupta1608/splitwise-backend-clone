const router = require("express").Router(),
  { groupControllers } = require("../controllers");

router.post("/", groupControllers.createGroup);

router.post("/add/user", groupControllers.addUserToGroup);

router.post("/add/expense", groupControllers.addExpenseToGroup);

router.get("/expenses/:gid", groupControllers.getGroupExpenses);

module.exports = router;
