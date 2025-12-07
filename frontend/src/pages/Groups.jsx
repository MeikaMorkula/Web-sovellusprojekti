import { useState, useEffect } from "react";
import  { fetchGroup } from "../database_api_calls.js";
import CustomButton from "../components/CustomButton.js";

export default function Group() {
  const [groups, setGroup] = useState([]);

  const fetchGroupData = async () => {
    fetchGroup().then((data) => {
      setGroup(data);
    });
  };

  const Group = () => {
    return (
      <div>
        <h1>Group Page</h1>
        {groups.map((group) => (
          <div key={group.group_id}>
            <img src=""></img>
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
      <Group />
    </div>
  );
}
