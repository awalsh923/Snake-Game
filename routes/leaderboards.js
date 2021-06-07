const express = require("express")
const router = express.Router()
const Leaderboard = require("../models/leaderboard")

// Top 10 Leaderboards
router.get('/leaderboards', async (req, res) => {
  try {
    const leaderboards = await Leaderboard.find().sort({score: -1}).collation({locale: "en_US", numericOrdering: true}).limit(10);
    res.render('leaderboards/index', {
      leaderboards: leaderboards
    })
  } catch {
    res.redirect('/')
  }
})

// Search for a Single Leaderboard Entry
router.get('/leaderboards/:id', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const leaderboards = await Leaderboard.find(searchOptions).sort({score: -1}).limit(10);
    res.render('leaderboards/search', {
      leaderboards: leaderboards,
    })
  } catch {
    res.redirect('/')
  }
})

// Create New Leaderboard Entry
router.post('/', async (req, res) => {
  const leaderboard = new Leaderboard({
    name: req.body.name,
    score: req.body.score
  })
  try {
    const newLeaderboard = await leaderboard.save()
    res.redirect(`leaderboards/${newLeaderboard.id}`)
  } catch {
    res.render("error/error", {errorMessage:"Error creating leaderboard entry"})
  }
})

module.exports = router