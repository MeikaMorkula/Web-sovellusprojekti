import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchGroup,
  fetchGroupRequests,
  addToGroup,
  removeUserFromGroup,
  removeGroupRequest,
  fetchGroupMembers,
  fetchUserData,
  fetchGroupMember,
} from "../database_api_calls.js";
import CustomButton from "../components/CustomButton.js";
import defaultUser from "./defaultuser.png";

export default function Group() {
  const [group, setGroup] = useState([]);
  const [groupRequests, setGroupRequests] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [isMember, setIsMember] = useState(false);
  const [userData, setUserData] = useState([]);
  const { id } = useParams();

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
    },
    side: {
      flex: "20%",
      padding: "20px",
    },
    main: {
      flex: "80%",
      padding: "20px",
      flexDirection: "collumn",
    },
    img: {
      width: "300px",
      objectFit: "cover",
      cursor: "pointer",
    },
  };

  const fetchGroupData = async () => {
    fetchGroup(id).then((data) => {
      setGroup(data);
    });
    fetchGroupRequests(id).then((data) => {
      setGroupRequests(data);
    });
    fetchGroupMembers(id).then((data) => {
      setGroupMembers(data);
    });
  };

  const GroupRequest = () => {
    if (userData.user_id !== group.group_owner) return null;
    return (
      <div style={styles.main}>
        {groupRequests.length > 0 ? (
          groupRequests.map((request) => (
            <div key={request.request_id}>
              <h3>{request.username}</h3>
              <button
                onClick={() => {
                  addToGroup(
                    request.user_id,
                    group.group_id,
                    request.username,
                  );
                  removeGroupRequest(request.request_id);
                  window.location.reload();
                }}
              >
                Add to the group
              </button>
              <button
                onClick={() => {
                  removeGroupRequest(request.request_id);
                  window.location.reload();
                }}
              >
                Deny
              </button>
            </div>
          ))
        ) : (
          <p>No group requests</p>
        )}
      </div>
    );
  };

  const GroupMembers = () => {
    if (userData.user_id === group.group_owner)
      return (
        <table>
          <thead>
            <tr>
              <th>
                <p>Username</p>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {groupMembers.map((member) => (
              <tr key={member.user_id}>
                <td>
                  <p>{member.username}</p>
                </td>
                <td>
                  <button
                    onClick={() => {
                      removeUserFromGroup(member.user_id, group.group_id);
                      window.location.reload();
                    }}
                  >
                    Remove from group
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    else {
      return (
        <div>
          <button
            onClick={() => {
              removeUserFromGroup(userData.user_id, group.group_id);
              window.location.reload();
            }}
          >
            Leave Group
          </button>
          <table>
            <thead>
              <tr>
                <th>
                  <p>Username</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {groupMembers.map((member) => (
                <tr key={member.user_id}>
                  <td>
                    <p>{member.username}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  const Group = () => {
    return (
      <div style={styles.container}>
        <div key={group.group_id} style={styles.side}>
          <img
            style={styles.img}
            src={
              group.group_icon
                ? `http://localhost:3001/profile-pictures/${group.group_icon.replace(
                    "public/",
                    ""
                  )}`
                : defaultUser
            }
            alt="group icon"
          ></img>
          <h2>{group.group_name}</h2>
          <GroupMembers />
        </div>
        <div style={styles.main}>
          <p>{group.group_description}</p>
          <br></br>
          <GroupRequest />
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchGroupData();
    fetchUserData().then((data) => {
      setUserData(data);
      fetchGroupMember(group.group_id, data.user_id).then((data) => {
        console.log(data);
        if (data.length > 0) {
          setIsMember(true);
        }
      });
    });
  }, []);

  return (
    <div>
      <Group />
    </div>
  );
}
