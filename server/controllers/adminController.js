import adminModel from "../models/Admins.js";
import express from "express";
const router = express.Router();


//GET ALL admin
router.get("/getall", async (req, res) => {
  try {
    const admins = await adminModel.find({});
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//GET admin BY ID
router.get("/getbyid/:id", async (req, res) => {
  try {
    let uid = req.params.id;

    let admins = await adminModel.findOne({ uid });
    res.status(200).json(admins);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error" });
  }
});

//UPDATE admin BY ID
router.put("/updateAdmin/:id", async (req, res) => {
  try {
    let uid = req.params.id;
    let adminData = req.body;
    await adminModel.findOneAndUpdate(
      { uid },
      {
        $set: adminData,
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
    await adminModel.deleteMany({});
    res.status(200).json({ msg: " Deleted Sucessfully!! " });
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE BY ID
router.delete("/delete/:uid", async (req, res) => {
  try {
    let uid = req.params.uid;
    await adminModel.findOneAndDelete(uid);
    res.status(200).json({ msg: "Deleted Sucessfully!!" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Internel server error" });
  }
});

//Get all Projects
router.get("/getall/:adminId/projects", async (req, res) => {
  try {
    const uid = req.params.adminId;

    const admin = await adminModel.findOne({ uid });

    if (!admin) {
      return res.status(404).json({ success: "admin not found" });
    }

    const projects = admin.projects;

    res.status(200).json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "Internal server error" });
  }
});

//GET PROJECTS BY ID
router.get("/getbyid/:adminId/:projectId/projects", async (req, res) => {
  try {
    const uid = req.params.adminId;
    const projectId = req.params.projectId;

    const admin = await adminModel.findOne({ uid });

    if (!admin) {
      return res.status(404).json({ success: "admin not found" });
    }

    const project = admin.projects.find((proj) => proj.uid == projectId);

    if (!project) {
      return res
        .status(404)
        .json({ success: "Project not found for this admin" });
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

    // Find projects created at the specified date
    const projects = await adminModel.aggregate([
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
router.post("/addprojects/:adminId/projects", async (req, res) => {
  try {
    const uid = req.params.adminId;
    const projectData = req.body;

    const admin = await adminModel.findOne({ uid });

    if (!admin) {
      return res.status(404).json({ success: "admin not found" });
    }

    admin.projects.push(projectData);

    await admin.save();

    res.status(200).json({ success: "Project added successfully", admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "Internal server error" });
  }
});

//UPDATE PROJECTS BY ID
router.put("/updatebyid/:adminId/:projectId/projects", async (req, res) => {
  try {
    const uid = req.params.adminId;
    const projectId = req.params.projectId;
    const updatedProjectData = req.body;

    const admin = await adminModel.findOne({ uid });

    if (!admin) {
      return res.status(404).json({ success: "admin not found" });
    }

    const project = admin.projects.find(
      (proj) => String(proj.uid) === projectId
    );

    if (!project) {
      return res
        .status(404)
        .json({ success: "Project not found for this admin" });
    }

    // Update the project data
    Object.assign(project, updatedProjectData);

    await admin.save();

    res.status(200).json({ success: "Project updated successfully", admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "Internal server error" });
  }
});

// DELETE PROJECTS BY ID
router.delete("/delete/:adminId/:projectId/projects", async (req, res) => {
  try {
    const uid = req.params.adminId;
    const projectId = req.params.projectId;

    const admin = await adminModel.findOne({ uid });

    if (!admin) {
      return res.status(404).json({ success: "admin not found" });
    }

    const projectIndex = admin.projects.findIndex(
      (proj) => String(proj.uid) === projectId
    );

    if (projectIndex === -1) {
      return res
        .status(404)
        .json({ success: "Project not found for this admin" });
    }

    // Remove the project from the admin's projects array
    admin.projects.splice(projectIndex, 1);

    // Save the updated admin object (with the project removed)
    await admin.save();

    res.status(200).json({ success: "Project deleted successfully", admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "Internal server error" });
  }
});

//Delete all projects
router.delete("/deleteall/:adminId/projects", async (req, res) => {
  try {
    const uid = req.params.adminId;

    const admin = await adminModel.findOne({ uid });

    if (!admin) {
      return res.status(404).json({ success: "admin not found" });
    }

    admin.projects = [];
    
    await admin.save(); // Save the updated admin object with empty projects array

    res.status(200).json({ success: "All projects deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "Internal server error" });
  }
});

export default router;
