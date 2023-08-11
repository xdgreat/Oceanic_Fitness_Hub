import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

const Contact = () => {
  const [ResponseData, GetResponseData] = useState([]);

  useEffect(() => {
    document.title = "Contact | Oceanic Fitness Hub";

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/usercreated");
        const data = await response.json();
        GetResponseData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(ResponseData);

  return (
    <div>
      <Navbar />
      Contact
      <div>
        {ResponseData.map((el) => {
          return <li key={el._id}>{el.email}</li>;
        })}
      </div>
      <BottomNav />
    </div>
  );
};

export default Contact;
