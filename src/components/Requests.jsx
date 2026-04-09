import React, { useEffect } from "react";
import { Base_Url } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequest = async () => {
    try {
      const res = await axios.get(Base_Url + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  const handleReviewRequest = async (status, _id) => {
    try {
      await axios.post(
        Base_Url + `/request/review/${status}/${_id}`,
        {},
        { withCredentials: true },
      );

      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };
  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return <h1> no requests found </h1>;
  if (requests.length === 0) return <h1> no requests found </h1>;

  return (
    <div className="flex justify-center flex-col my-10">
      <h1 className="text-bold text-3xl m-auto">Requests </h1>
      <div className=" w-1/2 m-auto">
        {requests.map((request) => {
          const user = request.fromUserId || {};
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            skills,
          } = user;

          return (
            <div
              key={_id}
              className="flex flex-row mb-4 gap-4 p-4 bg-white shadow-md rounded-xl"
            >
              <img
                src={photoUrl}
                alt="profile"
                className="w-20 h-20 rounded-full"
              />

              <div>
                <h2 className="font-semibold text-xl">
                  {firstName} {lastName}
                </h2>

                <p className="text-sm text-gray-500">
                  {age} • {gender}
                </p>

                <p className="text-gray-500 text-sm">
                  {about || "No bio available"}
                </p>

                <p className="text-gray-500 text-sm">
                  {skills || "No skills available"}
                </p>
              </div>
              <div className="card-actions  items-center  my-4 gap-4 ml-auto">
                <button
                  onClick={() => handleReviewRequest("rejected", request._id)}
                  className="btn bg-blue-500 hover:bg-blue-600 text-white border-none p-4"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleReviewRequest("accepted", request._id)}
                  className="btn bg-pink-500 hover:bg-pink-600 text-white border-none p-4"
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
