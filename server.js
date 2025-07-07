import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const stats = [
  { title: "Total Chats", value: "24", icon: "MessageCircle", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
  { title: "Generated Code", value: "18", icon: "Code", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/30" },
  { title: "Saved Projects", value: "12", icon: "Save", color: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30" },
  { title: "This Month", value: "42", icon: "TrendingUp", color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-900/30" }
];

const recentChats = [
  { id: 1, title: "React Component Help", date: "2024-01-15", messages: 12, status: "active" },
  { id: 2, title: "API Integration Question", date: "2024-01-14", messages: 8, status: "completed" },
  { id: 3, title: "Database Design Discussion", date: "2024-01-13", messages: 15, status: "completed" }
];

const recentProjects = [
  { id: 1, title: "Todo App", language: "React", date: "2024-01-15", status: "completed", lines: 245 },
  { id: 2, title: "Weather Widget", language: "JavaScript", date: "2024-01-14", status: "draft", lines: 128 },
  { id: 3, title: "Login Form", language: "HTML/CSS", date: "2024-01-13", status: "completed", lines: 89 }
];

app.get('/dashboard/stats', (req, res) => {
  res.json(stats);
});

app.get('/dashboard/recent-chats', (req, res) => {
  res.json(recentChats);
});

app.get('/dashboard/recent-projects', (req, res) => {
  res.json(recentProjects);
});

app.listen(port, () => {
  console.log(`Mock server listening at http://localhost:${port}`);
});
