const express = require("express");
const router = express.Router();
const Animal = require("../models/animal.js");
const Shelter = require("../models/shelter.js");

router.get("/", async (req, res) => {
    try {
        const shelters = await Shelter.find();
        res.render("shelters/index", { shelters });
    } catch (err) {
        console.log(err);
    }
});

router.get("/new", (req, res) => {
    res.render("shelters/new");
});

router.post("/", async (req, res) => {
    try {
        const shelter = new Shelter(req.body);
        await shelter.save();
        res.redirect("/shelters");
    } catch (err) {
        console.log(err);
}});

router.get('/:id', async (req, res) => {
    try {
        const shelter = await Shelter.findById(req.params.id).populate('animals');
        res.render('shelters/show', { shelter });
    } catch (error) {
        console.log(error);
        res.redirect('/shelters');
    }
});

router.get("/:id/edit", async (req, res) => {
    try {
        const shelter = await Shelter.findById(req.params.id);
        res.render("shelters/edit", { shelter });
    } catch (err) {
        console.log(err);
}});
router.put("/:id", async (req, res) => {
    try {
        const shelter = await Shelter.findByIdAndUpdate(req.params.id, req.body,)
        res.redirect(`/shelters/${shelter._id}`);
    } catch (err) {
        console.log(err);
}});

router.delete("/:id", async (req, res) => {
    try {
        await Shelter.findByIdAndRemove(req.params.id);
        res.redirect("/shelters");
    } catch (err) {
        console.log(err);
}});

module.exports = router;
