const express = require("express");
const router = express.Router();
const wrayAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
   .route("/")
   .get(wrayAsync(listingController.index))
   .post(
        isLoggedIn, 
        upload.single("listing[image]"),
        validateListing, 
        wrayAsync(listingController.createListing)
   );
   
// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm );

router
     .route("/:id")
     .get(wrayAsync(listingController.showListing))
     .put( 
        isLoggedIn, 
        isOwner, 
        upload.single("listing[image]"), 
        validateListing, 
        wrayAsync(listingController.updateListing))
     .delete(isLoggedIn, isOwner, wrayAsync(listingController.destroyListing));

// Edit Route
router.get("/:id/edit",isLoggedIn, isOwner, wrayAsync(listingController.renderEditForm));

module.exports = router;