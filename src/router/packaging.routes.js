import { Router } from "express";
const router = Router();

import { all, one, add } from "../controller/packaging.js";

router.get("/", all);
router.get("/:id", one);

router.post("/add", add);

export default router;
