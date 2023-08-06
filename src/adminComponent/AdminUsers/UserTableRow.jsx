import React from 'react';
import { Link } from 'react-router-dom';

const UserTableRow = ({data, handleUserDelete}) => {
    return (
        
            <tbody>                       
                {
                            data.map((user) => <tr key={user?._id}>
                                <td>{user?._id}</td>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>
                                    {new Date(user?.createdAt).toDateString()}
                                </td>
                                <td>
                                    <i onClick={() => handleUserDelete(user?._id)} className="actionIcon actionDelete fa-regular fa-trash-can me-4"></i>
                                    <Link className='text-decoration-none' to={`/profile/${user?._id}`}> <i className="actionIcon actionView fa-regular fa-eye"></i></Link>

                                </td>
                            </tr>)
                        }

                    </tbody>
       
    );
};

export default UserTableRow;