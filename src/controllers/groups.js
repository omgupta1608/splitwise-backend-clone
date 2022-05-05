const uniqid = require("uniqid"),
    respLib = require("../helpers/response"),
    helpers = require("../helpers/balance"),
    queries = require("../queries");

let controllers = {};

controllers.createGroup = async (req, res) => {
    const body = req.body;
    let grpOpts = {
        id: uniqid.time(),
        name: body.name || "No Name",
        users: body.users,
        userId: body.userId,
        total: 0
    }
    queries.addNewGroup(grpOpts);
    respLib(res, grpOpts, null, "Group Created Successfully", 201);
};

controllers.addUserToGroup = async (req, res) => {
    const body = req.body;
    let userOpts = {
        id: uniqid.time(),
        balance: {
            amount: 0,
            type: ""
        },
        totalSpent: 0,
        ...body
    }
    queries.addUserToGroup(userOpts, body.grpId);
    respLib(res, userOpts, null, "User Added", 201);
};

controllers.addExpenseToGroup = async (req, res) => {
    const body = req.body;
    let expenseOpts = {
        id: uniqid.time(),
        ...body
    };

    let grp = queries.getGroupById(body.grpId);
    grp.total = parseFloat(grp.total) + parseFloat(body.totalAmount);
    grp.users.forEach(user => {
        if(user.id === body.payer) {
            user.totalSpent = parseFloat(user.totalSpent) + parseFloat(body.totalAmount);
        }
    })
    
    helpers.updateUserBalances(body.grpId);
    queries.updateGroup(grp);
    queries.addExpenseToGroup(expenseOpts, body.grpId);
    respLib(res, expenseOpts, null, "Expense Added", 201);
};

controllers.getGroupExpenses = async (req, res) => {
    const grpId = req.params.gid;
    let expenses = queries.getExpensesByGroup(grpId);
    respLib(res, expenses, null, "Group Expenses", 200);
};

module.exports = controllers;
