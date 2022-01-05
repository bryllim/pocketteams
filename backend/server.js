//Get the package from node.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/UserRoutes");
const projectRoutes = require("./routes/ProjectRoutes");
const taskRoutes = require("./routes/TaskRoutes");
const noteRoutes = require("./routes/NoteRoutes");
const sectionRoutes = require("./routes/SectionRoutes");
const { NotFound, ErrorHandler } = require("./middlewares/ErrorMiddleware");
const teamRoutes = require("./routes/TeamRoutes");
const commentsRoutes = require("./routes/CommentsRoutes");
const app = express();
dotenv.config();
connectDB();
app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/comments", commentsRoutes);

app.use(NotFound);
app.use(ErrorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}

//Web server
const server = app.listen(PORT, console.log(`Server started on PORT ${PORT}`));

//Socket.io
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
io.on("connection", function (socket) {
  socket.on("Join_Board", (projectId) => {
    socket.join(projectId);
    socket.to(projectId).emit("New_User_Joined", projectId);
    console.log("user ",socket.id," joined ",projectId);
  });
  socket.on("Update_Board", ({initialData,projectId}) => {
    console.log("Update_Board",projectId);
    socket.to(projectId).emit("New_Board_Update", initialData);
  });
  socket.on("Leave_Board", (data) => {
    console.log("user disconnected",data );
  });
  socket.on("Create_Task", ({taskCreateData,projectId}) => {
    console.log("Create_Task",projectId);
    socket.to(projectId).emit("New_Create_Task", taskCreateData);
  }); 
  socket.on("Create_Section", ({sectionCreateData,projectId}) => {
    console.log("Create_Section",projectId);
    socket.to(projectId).emit("New_Create_Section", sectionCreateData);
  });
  socket.on("Delete_Section", ({sectionDeleteData,projectId}) => {
    console.log("Delete_Section",sectionDeleteData);
    socket.to(projectId).emit("New_Delete_Section", sectionDeleteData);
  });
  socket.on("Delete_Task", ({taskDeleteData,projectId}) => {
    console.log("Delete_Task");
    socket.to(projectId).emit("New_Delete_Task", taskDeleteData);
  });
});
