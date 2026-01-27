import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [blogs, setblogs] = useState({});

  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);


  const handleSummarize=async ()=>{
    try {
      console.log(blogs?.about)
      setLoading(true)
      const res=await fetch("http://localhost:3000/api/ai/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogText: blogs?.about,
        }),
      })
      const data=await res.json()
      // console.log(data.summary)
      setSummary(data.summary)
      setShowModal(true)

    } catch (error) {
      console.error(error)
      alert("Failed to summarize blog")
    }
    finally{
      setLoading(false)
    }
  }

  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
  
    setChatMessages((prev) => [
      ...prev,
      { role: "user", text: chatInput },
    ]);
  
    setChatLoading(true);
  
    try {
      const res = await fetch("http://localhost:3000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogText: blogs?.about,
          message: chatInput,
        }),
      });
  
      const data = await res.json();
  
      setChatMessages((prev) => [
        ...prev,
        { role: "ai", text: data.reply },
      ]);
    } catch (err) {
      console.error(err);
      alert("Chat failed");
    } finally {
      setChatLoading(false);
      setChatInput("");
    }
  };
  


  console.log(blogs);
  useEffect(() => {
    const fetchblogs = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/blogs/single-blog/${id}`,

          {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
          }
        );
        console.log(data);
        setblogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchblogs();
  }, [id]);

  // -------------------------------------------------
  return (
    <div>
      <div>
        {blogs && (
          <section className="container mx-auto p-4">
            <div className="text-blue-500 uppercase text-xs font-bold mb-4">
              {blogs?.category}
            </div>
            <h1 className="text-4xl font-bold mb-6">{blogs?.title}</h1>
            <div className="flex items-center mb-6">
              <img
                src={blogs?.adminPhoto}
                alt="author_avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <p className="text-lg font-semibold">{blogs?.adminName}</p>
            </div>

            <div className="flex flex-col md:flex-row">
              {blogs?.blogImage && (
                <img
                  src={blogs?.blogImage?.url}
                  alt="mainblogsImg"
                  className="md:w-1/2 w-full h-125 mb-6 rounded-lg shadow-lg cursor-pointer border"
                />
              )}
              <div className="md:w-1/2 w-full md:pl-6">
              <div className="h-125 overflow-y-auto px-5 py-4 border rounded-lg shadow-inner">
                <p className="text-sm text-gray-500 mb-2">Blog Content</p>

                <p className="text-lg leading-relaxed whitespace-pre-line">
                  {blogs?.about}
                </p>
              </div>

              <button
                onClick={handleSummarize}
                disabled={loading}
                className="mt-4 bg-amber-400 px-4 py-2 rounded font-semibold border-2 border-black hover:bg-amber-300 disabled:opacity-50"
              >
                {loading ? "Summarizing..." : "Summarize"}
              </button>

              <button
                onClick={() => setShowChat(true)}
                className="ml-4 mt-4 bg-amber-400 px-4 py-2 rounded font-semibold border-2 border-black hover:bg-amber-300 disabled:opacity-50"
              >
                {"Ask ai"}
              </button>
                        
              </div>
            </div>
          </section>
        )}
      </div>

      {showModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-6 relative">
      
      {/* Close Button */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-3 text-xl font-bold"
      >
        ×
      </button>

      <h2 className="text-2xl font-bold mb-4 text-center">
        Blog Summary
      </h2>

      <div className="max-h-125 overflow-y-auto border p-4 rounded">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {summary}
        </p>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={() => setShowModal(false)}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
  {/* ------------------------------------------------------------- */}
  
  {showChat && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-4 flex flex-col">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-lg font-bold">Ask AI about this blog</h2>
        <button
          onClick={() => setShowChat(false)}
          className="text-xl font-bold"
        >
          ×
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto my-3 space-y-2">
        {chatMessages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] p-2 rounded text-sm ${
              msg.role === "user"
                ? "bg-amber-200 ml-auto text-right"
                : "bg-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {chatLoading && (
          <p className="text-sm text-gray-500">AI is thinking...</p>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2 text-sm"
          placeholder="Ask a question about this blog..."
        />
        <button
          onClick={handleSendChat}
          className="bg-amber-400 px-4 rounded font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
}

export default Detail;