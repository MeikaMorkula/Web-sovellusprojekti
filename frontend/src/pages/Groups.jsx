import { useState, useEffect } from "react";
import  { fetchGroups } from "../database_api_calls.js";
import CustomButton from "../components/CustomButton.js";
import { useNavigate } from "react-router-dom";


export default function Groups() {
  const [groups, setGroup] = useState([]);

  const fetchGroupData = async () => {
    fetchGroups().then((data) => {
      setGroup(data);
    });
  };

  const Groups = () => {
    const navigate = useNavigate();
    return (
      <div>
        <h1>Group Page</h1>
        {groups.map((group) => (
          <div key={group.group_id}>
            <img src="" alt="group icon"
            onClick={() => navigate(`/group/${group.group_id}`)}
            ></img>
            <h2>{group.group_name}</h2>
            <p>Owner ID: {group.group_owner}</p>
            <p>Description: {group.group_description}</p>
            <button>request to join</button>
          </div>
        ))}
       
      </div>
    );
  };

  useEffect(() => {
    fetchGroupData();
  }, []);

  return (
    <div>
      <Groups />
    </div>
  );
}
