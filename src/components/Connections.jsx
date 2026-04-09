import React, { useEffect } from "react";
import { Base_Url } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  console.log("connections:", connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(Base_Url + "/user/connections", {
        withCredentials: true,
      });
      console.log("res", res.data.data);
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <h1>Loading...</h1>;

  if (connections.length === 0) {
    return <h1>No connections found</h1>;
  }
  return (
    <div className="flex justify-center flex-col my-10">
      <h1 className="text-bold text-3xl m-auto">My Connections</h1>
      <div className=" w-1/2 m-auto">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className=" flex flex-row mb-4 gap-4 p-4 bg-white shadow-md rounded-xl"
          >
            <img
              src={connection.photoUrl}
              alt="profile"
              className="w-20 h-20 rounded-full "
            />

            <div>
              <h2 className="font-semibold text-xl">
                {connection.firstName} {connection.lastName}
              </h2>
              <p className="text-sm text-gray-500">
                {connection.age} • {connection.gender}
              </p>
              {/* you can keep a filter for user like if they want to see the age and gender  */}
              <p className="text-gray-500 text-sm">
                {connection.about || "No bio available"}
              </p>
              <p className="text-gray-500 text-sm">
                {connection.skills || "No skills available"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
