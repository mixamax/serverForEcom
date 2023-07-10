const express = require("express");
const router = express.Router();

// router.get("/:id", (req, res) => {
//     console.log("get id");
//     const { id } = req.params;
//     const prodUrl = require("../db/DATA/DATA.json");

//     const prod = prodUrl.find((item) => item.id === id);

//     prod
//         ? res.json({ status: "ok", prod })
//         : res.json({ status: "error", message: "user not found" });
// });

router.get("/", (req, res) => {
    console.log("DATA");
    const product = require("../db/DATA/DATA.json");
    res.json({ status: "ok", product });
});

module.exports = router;
