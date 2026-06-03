const express = require("express");
const router = express.Router();
const SiteData = require("../models/SiteData");
const authMiddleware = require("../middleware/auth");

// GET all sections (public - used by frontend)
router.get("/", async (req, res) => {
  try {
    const all = await SiteData.find();
    const result = {};
    all.forEach(doc => { result[doc.section] = doc.data; });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single section (public)
router.get("/:section", async (req, res) => {
  try {
    const doc = await SiteData.findOne({ section: req.params.section });
    if (!doc) return res.status(404).json({ message: "Section not found" });
    res.json(doc.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update/create a section (admin only)
router.put("/:section", authMiddleware, async (req, res) => {
  try {
    const doc = await SiteData.findOneAndUpdate(
      { section: req.params.section },
      { data: req.body },
      { new: true, upsert: true }
    );
    res.json(doc.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST seed all sections at once (admin only) - used for initial setup
router.post("/seed", authMiddleware, async (req, res) => {
  try {
    const sections = req.body; // { heroSlides: [...], services: [...], ... }
    const ops = Object.entries(sections).map(([section, data]) => ({
      updateOne: {
        filter: { section },
        update: { $setOnInsert: { section, data } },
        upsert: true,
      }
    }));
    await SiteData.bulkWrite(ops);
    res.json({ message: "Seeded successfully", sections: Object.keys(sections) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
