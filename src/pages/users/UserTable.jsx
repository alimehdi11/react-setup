import { useUsers } from '../../contexts/UserContext'
import DynamicTable from '../../components/DynamicTable';

const UserTable = () => {
    const { users, handleDeleteUser, editUserFn } = useUsers();
    const userTableColumns = ["name", "email", "contact_number", "city"]
    const handleEdit = (user) => {
        editUserFn(user)
    }
    const handleDelete = (id) => {
        handleDeleteUser(id);
    }
    return (
        <div className='max-w-7xl mx-auto'>
            <DynamicTable columns={userTableColumns} data={users} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
    )
}

export default UserTable
