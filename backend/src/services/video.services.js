const { Video } = require("../models");

const getAllVideos = async () => {
  return await Video.find({}).exec();
};

const getVideosByQueries = async (queries) => {
  const ageFilter = (contentRatingInput) => {
    let filters = [];
    if (contentRatingInput === "Anyone")
      filters.push("7+", "12+", "16+", "18+");
    else {
      let age = Number(contentRatingInput.slice(0, -1)); // Slicing the input to remove the + and converting it to a number
      if (age >= 18) {
        filters.push("18+");
      } else if (age >= 16) {
        filters.push("16+");
        filters.push("18+");
      } else if (age >= 12) {
        filters.push("12+");
        filters.push("16+");
        filters.push("18+");
      } else if (age >= 7) {
        filters.push("7+");
        filters.push("12+");
        filters.push("16+");
        filters.push("18+");
      }
    }
    return filters;
  };

  let chainedQuery = null;
  if (queries.title) {
    // Quering for all videos whose title has "queries.title" in it, either upper or lower case
    chainedQuery = Video.find({
      title: { $regex: queries.title, $options: "i" },
    });
  }
  if (queries.genres) {
    if (queries.genres === "All") {
      if (chainedQuery) chainedQuery = chainedQuery.find({});
      else chainedQuery = Video.find({});
    } else {
      genres = queries.genres.split(",");
      if (chainedQuery)
        chainedQuery = chainedQuery.find({ genre: { $in: genres } });
      else chainedQuery = Video.find({ genre: { $in: genres } });
      console.log(chainedQuery);
    }
  }

  if (queries.contentRating) {
    contentRatingInput = ageFilter(decodeURI(queries.contentRating));
    if (chainedQuery)
      chainedQuery = chainedQuery.find({
        contentRating: { $in: contentRatingInput },
      });
    else
      chainedQuery = Video.find({ contentRating: { $in: contentRatingInput } });
    console.log(chainedQuery);
  }
  if (queries.sortBy) {
    if (queries.sortBy === "viewCount") {
      if (chainedQuery)
        chainedQuery = chainedQuery
          .sort({ viewCount: -1 })
          .collation({ locale: "en_US", numericOrdering: true });
      else
        chainedQuery = Video.find({})
          .sort({ viewCount: -1 })
          .collation({ locale: "en_US", numericOrdering: true });
      console.log(chainedQuery);
    }
    if (queries.sortBy === "releaseDate") {
      let videoList = null;
      if (chainedQuery) videoList = await chainedQuery.exec();
      else videoList = await Video.find({}).exec();

      return videoList.sort((vid1, vid2) => {
        return new Date(vid2.releaseDate) - new Date(vid1.releaseDate);
      });
    }
  }
  return await chainedQuery.exec();
};

const findVideo = async (videoID) => {
  return await Video.findOne({ _id: videoID });
};

const addVideo = async (video) => {
  return await Video.create(video);
};

const changeVotes = async (videoID, body) => {
  let video = await Video.findOne({ _id: videoID });
  if (!video) return null;
  video.votes[(body.vote += "s")] += body.change == "increase" ? 1 : -1;
  await video.save();
  return video;
};

const changeViews = async (videoID) => {
  let video = await Video.findOne({ _id: videoID });
  if (!video) return null;
  video.viewCount += 1;
  await video.save();
  return video;
};

module.exports = {
  getAllVideos,
  getVideosByQueries,
  findVideo,
  addVideo,
  changeVotes,
  changeViews,
};