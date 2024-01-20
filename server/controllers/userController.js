import userModel from "../models/Users.js";
import express from "express";

const router = express.Router();

//GET ALL USER
router.get("/getall", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//GET USER BY ID
router.get("/getbyid/:id", async (req, res) => {
  try {
    let uid = req.params.id;

    let users = await userModel.findOne({ uid });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error" });
  }
});

//update user by id
router.put("/updateUser/:id", async (req, res) => {
  try {
    let uid = req.params.id;
    let userData = req.body;
    await userModel.findOneAndUpdate(
      { uid },
      {
        $set: userData,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ msg: "Task Updated sucessfully..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, msg: "Internel Server Error" });
  }
});

// DELETE ALL
router.delete("/deleteall", async (req, res) => {
  try {
    await userModel.deleteMany({});
    res.status(200).json({ msg: " Deleted Sucessfully!! " });
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE BY ID
router.delete("/delete/:uid", async (req, res) => {
  try {
    let uid = req.params.uid;
    await userModel.findOneAndDelete(uid);
    res.status(200).json({ msg: "Deleted Sucessfully!!" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Internel server error" });
  }
});

//Get all Projects
router.get("/getall/:userId/projects", async (req, res) => {
  try {
    const uid = req.params.userId;

    const user = await userModel.findOne({ uid });

    if (!user) {
      return res.status(404).json({ success: "User not found" });
    }

    const projects = user.projects;

    res.status(200).json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "Internal server error" });
  }
});

//GET PROJECTS BY ID
router.get("/getbyid/:userId/:projectId/projects", async (req, res) => {
  try {
    const uid = req.params.userId;
    const projectId = req.params.projectId;

    const user = await userModel.findOne({ uid });

    if (!user) {
      return res.status(404).json({ success: "User not found" });
    }

    const project = user.projects.find((proj) => proj.uid == projectId);

    if (!project) {
      return res
        .status(404)
        .json({ success: "Project not found for this user" });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "Internal server error" });
  }
});

//GET PROJECTS BY CREATEDAT
router.get("/projects/created-at/:date", async (req, res) => {
  try {
    const targetDate = req.params.date; // Date in format 'YYYY-MM-DD'
    const projects = await userModel.aggregate([
      { $unwind: "$projects" },
      {
        $match: {
          "projects.createdAt": new Date(targetDate),
        },
      },
      {
        $group: {
          _id: "$_id",
          projects: { $push: "$projects" },
        },
      },
    ]);

    if (!projects || projects.length === 0) {
      return res
        .status(404)
        .json({ success: "No projects found for the specified date" });
    }

    res.status(200).json({ projects: projects[0].projects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "Internal server error" });
  }
});

//POST PROJECTS
router.post("/addprojects/:userId/projects", async (req, res) => {
  try {
    const uid = req.params.userId;
    const projectData = req.body;
    // console.log(uid);
    const user = await userModel.findOne({ uid });
    // console.log(user);

    if (!user) {
      return res.status(404).json({ success: "User not found" });
    }

    user.projects.push(projectData);

    await user.save();

    res.status(200).json({ success: "Project added successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "Internal server error" });
  }
});

//UPDATE PROJECTS BY ID
router.put("/updatebyid/:userId/:projectId/projects", async (req, res) => {
  try {
    const uid = req.params.userId;
    const projectId = req.params.projectId;
    const updatedProjectData = req.body;

    const user = await userModel.findOne({ uid });

    if (!user) {
      return res.status(404).json({ success: "User not found" });
    }

    const project = user.projects.find(
      (proj) => String(proj.uid) === projectId
    );

    if (!project) {
      return res
        .status(404)
        .json({ success: "Project not found for this user" });
    }

    // Update the project data
    Object.assign(project, updatedProjectData);

    await user.save();

    res.status(200).json({ success: "Project updated successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "Internal server error" });
  }
});

// DELETE PROJECTS BY ID
router.delete("/delete/:userId/:projectId/projects", async (req, res) => {
  try {
    const uid = req.params.userId;
    const projectId = req.params.projectId;

    const user = await userModel.findOne({ uid });

    if (!user) {
      return res.status(404).json({ success: "User not found" });
    }

    const projectIndex = user.projects.findIndex(
      (proj) => String(proj.uid) === projectId
    );

    if (projectIndex === -1) {
      return res
        .status(404)
        .json({ success: "Project not found for this user" });
    }

    // Remove the project from the user's projects array
    user.projects.splice(projectIndex, 1);

    // Save the updated user object (with the project removed)
    await user.save();

    res.status(200).json({ success: "Project deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "Internal server error" });
  }
});

//Delete Project By ID
router.delete("/deleteall/:userId/projects", async (req, res) => {
  try {
    const uid = req.params.userId;

    const user = await userModel.findOne({ uid });

    if (!user) {
      return res.status(404).json({ success: "User not found" });
    }

    user.projects = [];

    await user.save(); // Save the updated user object with empty projects array

    res.status(200).json({ success: "All projects deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "Internal server error" });
  }
});

export default router;
