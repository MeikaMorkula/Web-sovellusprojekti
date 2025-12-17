import { useState, useEffect } from "react";
import { fetchGroups, requestGroupJoin } from "../database_api_calls.js";
import CustomButton from "../components/CustomButton.js";
import { useNavigate } from "react-router-dom";
import styles from "../styles/groups.module.css";
import defaultUser from "./defaultuser.png";

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
          <div key={group.group_id} className={styles.groupsCard}>
            <img
              src={
                group.group_icon
                ? `http://localhost:3001/profile-pictures/${group.group_icon.replace("public/", "")}`
                : defaultUser }
              alt="group icon"
              onClick={() => navigate(`/group/${group.group_id}`)}
              style={{
                width: "100%",
                maxWidth: "200px",
                height: "200px",
                objectFit: "cover",
                display: "block",
                margin: "0 auto 10px auto",
                borderRadius: "8px",
                cursor: "pointer",                
              }}
            ></img>
            <h2>{group.group_name}</h2>
            <p>Owner : {group.owner_username}</p>
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
