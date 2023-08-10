const {
  addMessage,
  getAllMessage,
} = require("../controllers/MessagesController");

const router = require("express").Router();

router.post("/addmsg", addMessage);
router.post("/getmsg", getAllMessage);

module.exports = router;
