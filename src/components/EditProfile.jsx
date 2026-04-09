import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";
import axios from "axios";
import { Base_Url } from "../utils/constants";

const EditProfile = ({ user = {} }) => {
  const [firstName, setfirstName] = useState(user.firstName || "");
  const [lastName, setlastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || ""); // comma separated input
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfileHandler = async () => {
    setError("");
    try {
      const res = await axios.patch(
        Base_Url + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          skills,
          photoUrl,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="card w-96 bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h1>Edit Profile</h1>
          {/* First Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">First Name</span>
            </label>
            <input
              type="text"
              value={firstName}
              placeholder="Enter first name"
              className="input input-bordered"
              onChange={(e) => setfirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="form-control mt-3">
            <label className="label">
              <span className="label-text font-bold">Last Name</span>
            </label>
            <input
              type="text"
              value={lastName}
              placeholder="Enter last name"
              className="input input-bordered"
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>

          {/* Age */}
          <div className="form-control mt-3">
            <label className="label">
              <span className="label-text font-bold">Age</span>
            </label>
            <input
              type="number"
              value={age}
              placeholder="Enter age"
              className="input input-bordered"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          {/* Gender */}
          <div className="form-control mt-3">
            <label className="label">
              <span className="label-text font-bold">Gender</span>
            </label>
            <select
              className="select select-bordered"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Photo URL */}
          <div className="form-control mt-3">
            <label className="label">
              <span className="label-text font-bold">Photo URL</span>
            </label>
            <input
              type="text"
              value={photoUrl}
              placeholder="Enter image URL"
              className="input input-bordered"
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>

          {/* About */}
          <div className="form-control mt-3">
            <label className="label">
              <span className="label-text font-bold">About</span>
            </label>
            <textarea
              value={about}
              placeholder="Write something about yourself"
              className="textarea textarea-bordered"
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          {/* Skills */}
          <div className="form-control mt-3">
            <label className="label">
              <span className="label-text font-bold">Skills</span>
            </label>
            <input
              type="text"
              value={skills}
              placeholder="e.g. React, Node, CSS"
              className="input input-bordered"
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          {/* Button */}
          <div className="form-control mt-5 flex justify-center">
            <button
              className="btn bg-blue-500 hover:bg-blue-600 text-white border-none p-4 "
              onClick={saveProfileHandler}
            >
              Save Profile
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
          {showToast && (
            <div className="toast toast-top toast-center">
              <div className="alert alert-success">
                <span>Data saved successfully.</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <UserCard
        user={{ firstName, lastName, age, gender, about, skills, photoUrl }}
      />
    </div>
  );
};

export default EditProfile;
