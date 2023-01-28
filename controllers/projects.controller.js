import Project from "../models/projects.model.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import fs from "fs-extra";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const { name, title, description } = req.body;

    const project = new Project({ name, title, description });

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      project.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };

      await fs.unlink(req.files.image.tempFilePath);
    }

    await project.save();

    res.json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project does not exist." });
    }

    if (project.image.public_id) {
      await deleteImage(project.image.public_id);
    }

    return res.json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project does not exist." });
    }

    return res.json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const projectUpdated = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json(projectUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
