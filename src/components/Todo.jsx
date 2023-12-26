import { useEffect, useState } from "react";
import {
  addTodo,
  deleteTodo,
  getAllTodos,
  toggleTodo,
  updateTodo,
} from "../services/handleApi";
import { GiCrossMark, GiCheckMark } from "react-icons/gi";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const Todo = () => {
  const [input, setInput] = useState({ todo: "" });
  const [todos, setTodos] = useState([]);
  const [editId, setEditID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadAllTODOS();
  }, []);

  const loadAllTODOS = async () => {
    try {
      const response = await getAllTodos();
      setTodos(response);
    } catch (error) {
      console.log(`Failed to fetch all todos `);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId !== null) {
        setIsLoading(true);
        const response = await updateTodo(editId, input);
        setEditID(null);
        setInput({ todo: "" });
        console.log(response);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        const response = await addTodo(input);
        setInput({ todo: "" });
        console.log(response);
        setIsLoading(false);
      }
      loadAllTODOS();
    } catch (error) {
      console.log(`Failed to add Todo`);
    }
  };

  const handleToggle = async (id, done) => {
    try {
      await toggleTodo(id, !done);
      loadAllTODOS();
    } catch (error) {
      console.log(`Failed to toggle todo`);
    }
  };

  const handleEdit = async (id, todo) => {
    setEditID(id);
    setInput({ todo });
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      loadAllTODOS();
    } catch (error) {
      console.log(`Failed to delete todo`);
    }
  };
  return (
    <div className="container mx-auto p-5 text-center">
      <h1 className="text-3xl font-bold p-4">TODO APP</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl my-5 mx-auto p-3 ">
        <input
          name="todo"
          value={input.todo}
          onChange={handleChange}
          className="w-9/12 px-4 mr-3 outline-none border rounded-md focus:border-gray-800 py-2 "
          placeholder="Enter Your Tasks Here.."
          type="text"
          required
        />
        <button
          disabled={isLoading}
          className={`bg-gray-700 w-2/12 text-xl font-bold text-white px-4 py-2 rounded-md hover:bg-gray-800 ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {editId === null ? "Add" : "Edit"}
        </button>
      </form>

      {todos.length === 0 ? (
        <>
          <div className="max-w-lg mx-auto p-5 rounded-md border shadow-sm">
            <p className="h-72 flex  justify-center items-center">
              No tasks available
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="max-w-2xl mx-auto p-5 rounded-md border shadow-sm">
            <ul className="max-h-80 overflow-y-auto">
              {todos.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between items-center text-xl py-2 border-b-2 "
                >
                  <div
                    onClick={() => handleToggle(item._id, item.done)}
                    className="flex items-center space-x-4 cursor-pointer"
                  >
                    {item.done ? (
                      <>
                        <GiCheckMark className="text-green-600" />
                      </>
                    ) : (
                      <>
                        <GiCrossMark className="text-gray-600" />
                      </>
                    )}

                    <p
                      className={item.done ? "line-through text-left" : "text-left" }
                    >
                      {item.todo}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 cursor-pointer">
                    <BiSolidEditAlt
                      onClick={() => handleEdit(item._id, item.todo)}
                      className="text-blue-600"
                    />
                    <MdDelete
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <div className="flex mt-5 justify-between items-center text-center rounded-md shadow-sm border max-w-2xl mx-auto p-5">
        <div>
          <p>Total tasks</p>
          <p>{todos.length}</p>
        </div>
        <div>
          <p>completed tasks</p>
          <p>{todos.filter((todo) => todo.done).length}</p>
        </div>
        <div>
          <p>remaning tasks</p>
          <p>{todos.filter((todo) => !todo.done).length}</p>
        </div>
      </div>
    </div>
  );
};

export default Todo;
