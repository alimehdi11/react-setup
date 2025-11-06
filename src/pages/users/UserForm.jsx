import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaCity, FaUser } from "react-icons/fa";
import { useUsers } from "../../contexts/UserContext";
import Drawer from "../../components/Drawer";
import FormGenerator from "../../components/FormElements/FormGenerator";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../Api";

const UserForm = () => {
  const { addAndUpdateUser } = useUsers();
  const [user, setUser] = useState();
  const { id } = useParams();

  const handleSubmit = (user) => {
    addAndUpdateUser(user,id);
  };

  const userFormFields = [
    {
      name: "name",
      icon: <FaUser className="text-blue-500" />,
      required: true,
      min: 3,
      value: user?.name,
    },
    {
      name: "contact_number",
      icon: <IoMdCall className="text-red-500" />,
      type: "number",
      required: true,
      min: 10,
      value: user?.contact_number,
    },
    {
      name: "email",
      icon: <MdEmail className="text-green-500" />,
      type: "email",
      required: true,
      pattern: /^\S+@\S+\.\S+$/,
      value: user?.email,
    },
    {
      name: "city",
      icon: <FaCity className="text-yellow-500" />,
      type: "select",
      required: true,
      options: ["karachi", "lahore", "islamabad", "quetta", "peshawar", "hyderabad"],
      value: user?.city,
    },
  ];


  const getUser = async () => {
    if (id) {
      const user = await api.userApi.getUserById(id);
      setUser(user);
    }
  }

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Drawer title={`${id ? "Update" : "Add"} User`}>
        <FormGenerator
          fields={userFormFields}
          onSubmit={handleSubmit}
        />
      </Drawer>
    </>
  );
};

export default UserForm;


