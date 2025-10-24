const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, title: 'Finish project proposal', priority: 'high', deadline: '2025-10-20' },
  { id: 2, title: 'Review design mockups', priority: 'medium', deadline: '2025-10-18' }
];

function generateId() {
  return todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;
}

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const { title, priority = 'medium', deadline } = req.body;

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ message: 'Title is required and must be a string.' });
  }

  if (!deadline || isNaN(Date.parse(deadline))) {
    return res.status(400).json({ message: 'A valid deadline date is required.' });
  }

  const newTodo = {
    id: generateId(),
    title,
    priority,
    deadline
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const { title, priority, deadline } = req.body;

  const todo = todos.find(t => t.id === todoId);
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found.' });
  }

  if (title !== undefined) todo.title = title;
  if (priority !== undefined) todo.priority = priority;
  if (deadline !== undefined && !isNaN(Date.parse(deadline))) todo.deadline = deadline;

  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.json({ message: 'Deleted' });
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
