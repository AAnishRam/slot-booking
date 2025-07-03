"use client";

import React, { useState } from "react";
import { Check, Plus, Edit3, Trash2 } from "lucide-react";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Book meeting room for client presentation",
      completed: false,
    },
    { id: 2, text: "Reserve parking slot for tomorrow", completed: true },
    { id: 3, text: "Check availability for conference room", completed: false },
  ]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo.trim(),
          completed: false,
        },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, newText) => {
    if (newText.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: newText.trim() } : todo
        )
      );
    }
    setEditingId(null);
  };

  return (
    <div className="bg-orange-100 border border-orange-300 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <Check className="w-6 h-6 text-green-500 mr-2" />
        <h3 className="text-lg font-semibold text-orange-700">Quick Tasks</h3>
      </div>

      {/* Add Todo */}
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <button
          onClick={addTodo}
          className="px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Todo List */}
      <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-hide">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
              todo.completed
                ? "bg-green-50 border-green-200"
                : "bg-white border-orange-200"
            }`}
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                todo.completed
                  ? "bg-green-500 border-green-500"
                  : "border-orange-300 hover:border-green-500"
              }`}
            >
              {todo.completed && <Check className="w-3 h-3 text-white" />}
            </button>

            {editingId === todo.id ? (
              <input
                type="text"
                defaultValue={todo.text}
                onBlur={(e) => updateTodo(todo.id, e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    updateTodo(todo.id, e.target.value);
                  }
                }}
                className="flex-1 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                autoFocus
              />
            ) : (
              <span
                className={`flex-1 text-sm ${
                  todo.completed
                    ? "text-gray-500 line-through"
                    : "text-orange-800"
                }`}
              >
                {todo.text}
              </span>
            )}

            <div className="flex space-x-1">
              <button
                onClick={() => setEditingId(todo.id)}
                className="p-1 text-orange-500 hover:text-orange-700 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-1 text-orange-500 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {todos.length === 0 && (
          <div className="text-center py-8 text-orange-500">
            <Check className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No tasks yet. Add one above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
