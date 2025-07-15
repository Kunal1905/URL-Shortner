const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewURL(req, res) {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "url is required " });
  const shortId = shortid.generate();

  await URL.create({
    shortId,
    redirectURL: url,
    visitHistory: [],
  });

  return res.render("home" , {
    id: shortId,
  })
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  if(!result) return res.status(404).json({ error: "Short URL not found"})
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = {
  handleGenerateNewURL,
  handleGetAnalytics,
};
