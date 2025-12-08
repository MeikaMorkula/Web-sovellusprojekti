import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGroup } from "../database_api_calls.js";
import CustomButton from "../components/CustomButton.js";

export default function Group() {
  const [group, setGroup] = useState([]);
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
  };

  const Group = () => {
    return (
      <div style={styles.container}>
       <div key={group.group_id} style={styles.side}>
          <img style={styles.img} 
          src={`http://localhost:3001/group_icon/${group.group_icon}`} alt="group icon">

          </img>
          <h2>{group.group_name}</h2>
        </div>
         <div style={styles.main}>
          <p>{group.group_description}</p>
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
