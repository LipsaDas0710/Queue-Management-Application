const express = require("express");
const {
  addPerson,
  getPeopleByQueue,
  deletePerson,
  serveNext,
  movePerson,
} = require("../controllers/personController");

const router = express.Router();

router.post("/", addPerson);
router.patch("/serve/:queueId", serveNext);
router.patch("/move", movePerson);
router.get("/:queueId", getPeopleByQueue);
router.delete("/:personId", deletePerson);


module.exports = router;