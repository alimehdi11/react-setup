import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaCity, FaUser } from "react-icons/fa";
import { useUsers } from "../../contexts/UserContext";
import Drawer from "../../components/Drawer";
import FormGenerator from "../../components/FormElements/FormGenerator";

const UserForm = () => {
  const { addAndUpdateUser } = useUsers();

  const handleSubmit = (user) => {
    addAndUpdateUser(user);
  };

  const userFormFields = [
    {
      name: "name",
      icon: <FaUser className="text-blue-500" />,
      required: true,
      min: 3,
    },
    {
      name: "contact_number",
      icon: <IoMdCall className="text-red-500" />,
      type: "number",
      required: true,
      min: 10,
    },
    {
      name: "email",
      icon: <MdEmail className="text-green-500" />,
      type: "email",
      required: true,
      pattern: /^\S+@\S+\.\S+$/,
    },
    {
      name: "city",
      icon: <FaCity className="text-yellow-500" />,
      type: "select",
      required: true,
      options: ["karachi", "lahore", "islamabad", "quetta", "peshawar", "hyderabad"],
    },
  ];




  return (
    <>
      <Drawer title="Add User">
        <FormGenerator
          fields={userFormFields}
          onSubmit={handleSubmit}
          // values={user}
          // setValues={setUser}
        />
      </Drawer>
    </>
  );
};

export default UserForm;


