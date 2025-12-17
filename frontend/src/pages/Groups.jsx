import { useState, useEffect } from "react";
import { fetchGroups, requestGroupJoin } from "../database_api_calls.js";
import CustomButton from "../components/CustomButton.js";
import { useNavigate } from "react-router-dom";
import styles from "../styles/groups.module.css";

export default function Groups() {
  const [groups, setGroup] = useState([]);
  const [userID, setId] = useState(null);

  const fetchGroupData = async () => {
    fetchGroups().then((data) => {
      setGroup(data);
    });
  };

  async function loadUser() {
      const meRes = await fetch("http://localhost:3001/user/me", {
        credentials: "include",
      });

      const meData = await meRes.json();

    
      setId(meData);
  }

  const Groups = () => {
    const navigate = useNavigate();
    return (
      <div className={styles.container}>
        <div className={styles.groupsBox}>
        {groups.map((group) => (
          <div>
          <div key={group.group_id} className={styles.groupsCard}>
            <img
              src={`http://localhost:3001/profile-pictures/${group.group_icon}`}
              alt="group icon"
              onClick={() => navigate(`/group/${group.group_id}`)}
            ></img>
            <h2>{group.group_name}</h2>
            <p>Owner ID: {group.group_owner}</p>
            <div className={styles.description}>
            <p>Description: {group.group_description}</p>
            </div>
            <CustomButton
            text="request to join"
            color="success"
              onClick={() =>
                requestGroupJoin(userID.id, group.group_id).then((data) => {
                  alert("Group request sent");
                })
              }
            >
              
            </CustomButton>
          </div>
          </div>
        ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
     

    loadUser()
    fetchGroupData();
  }, []);

  return (
    <div>
      <Groups/>
    </div>
  );
}
