import { createContext, useContext, useEffect, useState } from "react";
import api from "../Api";

// 1️⃣ Create Context
const UserContext = createContext();

// 2️⃣ Create Provider Component
const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const handleDeleteUser = async (id) => {
    const deleteUser = await api.userApi.deleteUser(id);
    if (deleteUser) {
      const updatedUsers = users.filter((user) => user.id != id);
      setUsers(updatedUsers);
    }
  };

  const addAndUpdateUser = async (userData, id = null) => {
    if (id) {
      const updatedUser = await api.userApi.updateUser(userData,id);
      if (!updatedUser) return;
      setUsers((prev) =>  prev.map((u) => (u.id === id ? updatedUser : u)));
      return;
    }
    const createdUser = await api.userApi.createUser(userData);
    if (!createdUser) return;
    setUsers((prev) => [...prev, createdUser]);
  };




  const fetchAllUsers = async () => {
    const users = await api.userApi.getAllUsers();
    if (!users) return;
    setUsers(users);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const userContextValue = {
    users,
    addAndUpdateUser,
    handleDeleteUser,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useUsers = () => useContext(UserContext);
