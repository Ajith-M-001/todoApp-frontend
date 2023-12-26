import axios from "axios";

const baseURL = "https://todoapp-backend-sigr.onrender.com/api/todos";

export const addTodo = async (input) => {
  try {
    const response = await axios.post(`${baseURL}/add`, input);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllTodos = async () => {
  try {
    const response = await axios.get(`${baseURL}/all`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const toggleTodo = async (id, done) => {
  try {
    const response = await axios.put(`${baseURL}/toggle/${id}`, { done });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateTodo = async (id, input) => {
  try {
    const response = await axios.put(`${baseURL}/update/${id}`, input);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/delete/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
