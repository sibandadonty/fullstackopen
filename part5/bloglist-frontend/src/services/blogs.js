import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const addBlog = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const results = await axios.post(baseUrl, data, config);
  return results.data;
};

const updateLikes = async (data, token, blogId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const results = await axios.put(`${baseUrl}/${blogId}`, data, config);
  return results.data;
};

const deleteBlog = async (blogId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  await axios.delete(`${baseUrl}/${blogId}`, config);
};

export default { getAll, addBlog, updateLikes, deleteBlog };