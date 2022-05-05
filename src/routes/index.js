const userRoutes = require("./users"),
    groupRoutes = require("./groups"),
    router = require("express").Router();

router.use("/user/",userRoutes);

router.use("/group/", groupRoutes);

module.exports = router;