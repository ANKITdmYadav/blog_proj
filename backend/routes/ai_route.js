import express from "express";
import { summarizeBlogController ,blogChatController} from "../controller/ai_controller.js";

const router = express.Router();

router.post("/summarize", summarizeBlogController);
router.post("/chat",blogChatController)
export default router;
