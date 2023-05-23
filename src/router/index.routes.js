import { Router } from "express";
const router = Router();

import teaRoutes from "./tea.routes.js";
import categoryRoutes from "./category.routes.js";
import packagingRoutes from "./packaging.routes.js";

const API = "/api/v1";

router.get("/", (req, res) => {
    res.json({ msg: "server is running" });
});

router.use(`${API}/tea`, teaRoutes);
router.use(`${API}/category`, categoryRoutes);
router.use(`${API}/packaging`, packagingRoutes);

export default router;
