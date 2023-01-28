import { Router } from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProject,
} from "../controllers/projects.controller.js";
import fileUpload from "express-fileupload";

const router = Router();

router.get("/projects", getProjects);
router.post(
  "/projects",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  createProject
);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);
router.get("/projects/:id", getProject);

export default router;
