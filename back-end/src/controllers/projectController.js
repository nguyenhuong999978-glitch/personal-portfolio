const Project = require("../models/Project");

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    console.error("Get projects error:", error);

    res.status(500).json({
      message: "Không thể lấy danh sách dự án",
      error: error.message,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Không tìm thấy dự án",
      });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      message: "Không thể lấy dự án",
      error: error.message,
    });
  }
};

const createProject = async (req, res) => {
  try {
    const { name, description, technology, demo, github } = req.body;

    let technologies = [];

    try {
      technologies = technology ? JSON.parse(technology) : [];
    } catch {
      technologies = [];
    }

    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const project = await Project.create({
      name,

      description,

      technology: technologies,

      image,

      demo: demo || "#",

      github: github || "",
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Không thể tạo dự án",
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Không tìm thấy dự án",
      });
    }

    const { name, description, technology, demo, github } = req.body;

    let technologies = [];

    try {
      technologies = technology ? JSON.parse(technology) : project.technology;
    } catch {
      technologies = project.technology;
    }

    project.name = name;

    project.description = description;

    project.technology = technologies;

    project.demo = demo || "#";

    project.github = github || "";

    // =========================
    // CHỈ ĐỔI ẢNH NẾU CÓ ẢNH MỚI
    // =========================

    if (req.file) {
      project.image = `/uploads/${req.file.filename}`;
    }

    const updatedProject = await project.save();

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Không thể cập nhật dự án",
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Không tìm thấy dự án",
      });
    }

    res.status(200).json({
      message: "Xóa dự án thành công",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    res.status(500).json({
      message: "Không thể xóa dự án",
      error: error.message,
    });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
