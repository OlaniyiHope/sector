import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SectorList = () => {
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    const fetchSectors = async () => {
      const response = await axios.get("http://localhost:4000/api/get-sectors");
      setSectors(response.data);
    };

    fetchSectors();
  }, []);

  return (
    <div>
      <h2>Sector List</h2>
      <ul>
        {sectors.map((sector) => (
          <li key={sector._id}>
            <Link to={`/edit-sector/${sector._id}`}>{sector.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectorList;
