const express = require("express");
const videoController = require("../../controllers/video.controllers");

const router = express.Router();

router.get("/", videoController.getVideos);
router.get("/:videoID", videoController.getVideoByID);
router.post("/", videoController.insertVideo);
router.patch("/:videoId/votes", videoController.updateVotes );
router.patch("/:videoId/views", videoController.updateViews);

module.exports = router;