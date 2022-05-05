const uniqid = require("uniqid"),
    respLib = require("../helpers/response"),
    queries = require("../queries");

let controllers = {};

controllers.createGroup = async (req, res) => {
    const body = req.body;
    let grpOpts = {
        id: uniqid.time(),
        name: body.name || "No Name",
        users: body.users,
        userId: body.userId
    }
    queries.addNewGroup(grpOpts);
    respLib(res, grpOpts, null, "Group Created Successfully", 201);
};

controllers.addUserToGroup = async (req, res) => {
    const body = req.body;
    queries.addUserToGroup(body.user, body.grpId);
    respLib(res, {}, null, "User Added", 201);
};

controllers.addExpenseToGroup = async (req, res) => {
    const body = req.body;
    queries.addExpenseToGroup(body.expense, body.grpId);
    respLib(res, {}, null, "Expense Added", 201);
};

controllers.getGroupExpenses = async (req, res) => {
    const grpId = req.params.gid;
    let expenses = queries.getExpensesByGroup(grpId);
    respLib(res, expenses, null, "Group Expenses", 200);
};

module.exports = controllers;
