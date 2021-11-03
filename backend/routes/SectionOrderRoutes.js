const express = require("express");
// const {createSectionOrder,createSectionOrder,getSectionOrderById, updateSectionOrder, deleteSectionOrder,updateSectionOrderOrder,updateSectionOrderTask} = require("../controllers/SectionOrderController");
const {createSectionOrder,getSectionOrders,getSectionOrderById,updateSectionOrder,deleteSectionOrder} = require("../controllers/SectionOrderController");
const { protect } = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.route("/").get(protect, getSectionOrders);
router.route("/create").post(protect, createSectionOrder);
router.route("/:id").get(protect, getSectionOrderById).put(protect, updateSectionOrder).delete(protect, deleteSectionOrder);
// router.route("/items/:id").put(protect, updateSectionOrderItems);

module.exports = router;
