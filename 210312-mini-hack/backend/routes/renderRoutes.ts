import express from "express"
import { loadCreate, loadEdit, loadHome } from "../controller/renderController"

const router = express.Router()

router.route("/").get(loadHome)
router.route("/create").get(loadCreate)
router.route("/edit/:id").get(loadEdit)

export default router
