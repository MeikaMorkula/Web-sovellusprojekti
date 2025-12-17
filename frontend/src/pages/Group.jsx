import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchGroup,
  fetchGroupRequests,
  addToGroup,
  removeGroupRequest,
} from "../database_api_calls.js";
import CustomButton from "../components/CustomButton.js";
import defaultUser from "./defaultuser.png";

export default function Group() {
  const [group, setGroup] = useState([]);
  const [groupRequests, setGroupRequests] = useState([]);
  const { id } = useParams();

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
    },
    side: {
      flex: "40%",
      backgroundColor: "#f1f1f1",
      padding: "20px",
    },
    main: {
      flex: "80%",
      backgroundColor: "#ffffff",
      padding: "20px",
    },
    img: {
      width: "100%",
      objectFit: "cover",
      cursor: "pointer",
    },
  };

  const fetchGroupData = async () => {
    fetchGroup(id).then((data) => {
      console.log(data);
      setGroup(data);
    });
    fetchGroupRequests(id).then((data) => {
      console.log(data);
      setGroupRequests(data);
    });
  };

  const Group = () => {
    return (
      <div style={styles.container}>
        <div key={group.group_id} style={styles.side}>
        <img
          style={styles.img}
          src={
            group.group_icon
              ? `http://localhost:3001/${group.group_icon.replace("public/", "")}`
              : defaultUser
            }
            alt="group icon"
          ></img>
          <h2>{group.group_name}</h2>
        </div>
        <div style={styles.main}>
          <p>{group.group_description}</p>
          {groupRequests.length > 0 ? (
            groupRequests.map((request) => (
              <div key={request.request_id}>
                <h5>User ID: {request.user_id}</h5>
                <button
                  onClick={() => {
                    addToGroup(request.user_id, group.group_id);
                  }}
                >
                  Add to the group
                </button>
                <button
                  onClick={() => {
                    removeGroupRequest(request.request_id);
                  }}
                >Deny</button>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
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
