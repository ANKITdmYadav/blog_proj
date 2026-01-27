import { summarizeBlog ,blogChat} from "../models/genai_model.js";

export const summarizeBlogController = async (req, res) => {
  try {
    const { blogText } = req.body;

    if (!blogText) {
      return res.status(400).json({ message: "Blog text is required" });
    }

    const summary = await summarizeBlog(blogText);

    res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "AI summarization failed" });
  }
};


export const blogChatController = async (req, res) => {
    try {
      const { blogText, message } = req.body;
  
      if (!blogText || !message) {
        return res.status(400).json({ message: "Missing blogText or message" });
      }
  
      const reply = await blogChat(blogText, message);
  
      res.status(200).json({
        success: true,
        reply,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Chat failed" });
    }
};
