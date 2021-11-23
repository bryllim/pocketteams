const asyncHandler = require("express-async-handler");
const Project = require("../models/ProjectModel");

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user._id }).populate({
    path: "sections",
    populate: {
      path: "tasks",
      populate: {
        path: "task_comments",
      },
    },
  });
  res.json(projects);
});

const createProject = asyncHandler(async (req, res) => {
  const { project_name, project_description, project_status } = req.body;

  if (!project_name || !project_status || !project_description) {
    res.status(400);
    throw new Error("Please Fill all the Fields");
  } else {
    const project = new Project({
      user: req.user._id,
      project_name,
      project_status,
      project_description,
    });

    const createdProject = await project.save();

    res.status(201).json(createdProject);
  }
});

const getProjectById = asyncHandler(async (req, res) => {
  console.log("test");
  const project = await Project.findById(req.params.id).populate({
    path: "sections",
    populate: {
      path: "tasks",
      populate: {
        path: "task_comments",
      },
    },
  });
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: "Project not found" });
  }
});

const updateProject = asyncHandler(async (req, res) => {
  const { project_name, project_status, project_description } = req.body;

  const project = await Project.findById(req.params.id);

  //Check if this project belongs to the user
  if (project.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (project) {
    project.project_name = project_name;
    project.project_description = project_description;
    project.project_status = project_status;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (project) {
    await project.remove();
    res.json({ message: "Project Removed" });
  }
});

const updateSectionOrder = asyncHandler(async (req, res) => {
  try {
    const { sourceDragIndex, destinationDragIndex } = req.body;
    const project_id = req.params.id;
    //Check if this SectionOrder belongs to the user
    // if(!sourceDragIndex || !destinationDragIndex){
    //     let err = new Error("Please Fill all the Fields");
    //     err.status = 400;
    //     throw err;
    // }
    const sectionOrder = await Project.findById(project_id);
    if (sectionOrder.user.toString() !== req.user._id.toString()) {
      let err = new Error("You can't perform this action");
      err.status = 401;
      throw err;
    }
    if (sectionOrder) {
      const [removed] = sectionOrder.sections.splice(sourceDragIndex, 1); //mutating the array
      sectionOrder.sections.splice(destinationDragIndex, 0, removed);
      const updatedSectionOrder = await sectionOrder.save();
      console.log(updatedSectionOrder);
      res.json(updatedSectionOrder);
    } else {
      let err = new Error("SectionOrder not found");
      err.status = 404;
      throw err;
    }
  } catch (err) {
    console.log(err.status, err.message);
    res.status(err.status).json({ message: err.message });
  }
});

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectById,
  updateSectionOrder,
};
