import { Base_Url } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  // const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const { firstName, lastName, age, gender, about, skills, photoUrl, _id } =
    user || {};

  const handleSendRequest = async (status, userid) => {
    try {
      await axios.post(
        Base_Url + `/request/send/${status}/${userid}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userid));
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="card w-80 bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden pt-4">
        <figure className="h-52 overflow-hidden">
          <img
            src={photoUrl}
            alt="userPhoto"
            className="w-full h-full object-contain"
          />
        </figure>

        <div className="card-body p-5">
          <h2 className="text-xl font-semibold text-gray-800">
            {firstName} {lastName}
          </h2>

          <p className="text-sm text-gray-500">
            {age} • {gender}
          </p>

          <p className="text-gray-600 text-sm mt-2 leading-relaxed">{about}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {/* className="px-3 py-1 text-xs bg-primary/10 text-primary
            rounded-full" */}
            {skills}
          </div>
          <div className="card-actions justify-center my-4 gap-4">
            <button
              onClick={() => handleSendRequest("ignore", _id)}
              className="btn bg-blue-500 hover:bg-blue-600 text-white border-none p-4"
            >
              Ignore
            </button>
            <button
              onClick={() => handleSendRequest("interested", _id)}
              className="btn bg-pink-500 hover:bg-pink-600 text-white border-none p-4"
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
