// Models
import User from "@/models/User";
// Utils
import ConnectDb from "@/utils/ConnectDb";
import { sortTodos } from "@/utils/functions";
// Next Auth
import { getServerSession } from "next-auth";
import { authOption } from "./auth/[...nextauth]";

const handler = async (req, res) => {
  try {
    await ConnectDb();
  } catch (err) {
    return res.status(500).json({ status: "Failed", message: "Server Error" });
  }
  const session = await getServerSession(req, res, authOption);
  if (!session) {
    return res.status(404).json({ status: "Failed", message: "You are not login" });
  }
  const user = await User.findOne({ email: session?.user?.email });
  if (!user) {
    return res.status(404).json({ status: "Failed", message: "User doesn't exist!" });
  }
  if (req.method === "POST") {
    const { todo, status } = req.body;
    if (!todo || !status) {
      return res.status(500).json({ status: "Failed", message: "Invalid Data" });
    }
    user.todos.push({ title: todo, status });
    user.save();
    return res.status(200).json({ status: "Success", message: "Todos created" });
  } else if (req.method === "GET") {
    const todos = user.todos;
    if (!todos) {
      return res.status(404).json({ status: "Failed", message: "todos not found" });
    }
    const sortedT = sortTodos(todos);
    return res
      .status(200)
      .json({ status: "Success", message: "get todos succefully", todos: sortedT });
  } else if (req.method === "PATCH") {
    const { id, toStatus } = req.body;
    if (!id || !toStatus) {
      return res.status(401).json({ status: "Failed", message: "Invalid Data" });
    }
    const statusUpdate = await User.updateOne(
      { "todos._id": id },
      { $set: { "todos.$.status": toStatus } }
    );
    return res.status(200).json({ status: "Success", message: "Update Succesfully", statusUpdate });
  }
  return res.status(404).json({ status: "Failed", message: "Bad request" });
};
export default handler;
