import React, { useEffect, useState } from "react";
import { getUsers } from "../../services/user.service";
import Card from "../../components/Card/Card";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((u) => (
        <Card
          key={u._id}
          title={u.name}
          description={`Email: ${u.email}, Role: ${u.role}`}
        />
      ))}
    </div>
  );
};

export default UserList;
