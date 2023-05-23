import { Router } from "express";
const router = Router();

import { all, one, add } from "../controller/tea.js";

// http://localhost:9000/api/v1/tea
router.get("/", all);
router.get("/:id", one);

router.post("/add", add);

export default router;