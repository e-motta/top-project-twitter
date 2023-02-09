import { CameraIcon } from "@heroicons/react/24/outline";
import Avatar from "../generics/Avatar";

import bgImg from "../../assets/bg-example.jpeg";
import AvatarImg from "../../assets/avatar_example.jpeg";
import Button from "../generics/Button";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Input from "./Input";
import Loading from "../generics/Loading";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);

  // todo: query current logged in user data
  // todo: display loading spinner for page
  // todo: update name with user name

  // mock
  const userInfo = {
    handle: "elonmusk",
    name: "Elon Musk",
    avatar: AvatarImg,
    bgImage: bgImg,
    followers: ["elonmusk", "billgates"],
    following: ["elonmusk"],
    tweets: ["id1", "id2"],
  };

  useEffect(() => {
    if (userInfo) {
      setHandle(userInfo.handle);
      setName(userInfo.name);
    }
  }, []);

  return (
    <div>
      <Header
        mainText={userInfo.name}
        subText={`@${userInfo.handle}`}
        showBackBtn
      />

      <div
        id="bg-img"
        className="max-h-48 aspect-[25/8] bg-gray-300 relative mb-24"
      >
        <img src={userInfo.bgImage} alt="background image" />
        <button
          type="button"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            p-3 rounded-full bg-gray-800 bg-opacity-50 transition-all
            hover:bg-opacity-40"
        >
          <CameraIcon className="h-6 w-6 text-white" />
        </button>
        <div
          className="absolute bottom-0 left-0 translate-y-1/2 p-1 bg-white
          rounded-full ml-4"
        >
          <div>
            <Avatar size="lg" url={userInfo.avatar} disabled />
            <button
              type="button"
              className="absolute top-1/2 left-1/2 -translate-x-1/2
                -translate-y-1/2 p-3 rounded-full bg-gray-900 bg-opacity-50
                transition-all hover:bg-gray-800"
            >
              <CameraIcon className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      <form
        id="edit-profile"
        action="#"
        className="flex flex-col gap-5 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e); // todo: handle submit
        }}
      >
        <div className="flex flex-col gap-5 relative">
          <Input value={name} setValue={setName} label="Name" />
          <Input value={handle} setValue={setHandle} label="Username" />
          {loading && <Loading />}
        </div>

        <div>
          <Button
            className="text-white bg-black font-bold"
            type="submit"
            form="edit-profile"
            disabled={name.length === 0 || handle.length === 0}
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            }}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
