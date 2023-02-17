import Image from "next/image";
import React from "react";
import Header from "../../Components/Header/Header";

const SingleTeacher = () => {
  return (
    <div>
      <Header page="singleteacher" />

      <div className="mt-10 grid grid-cols-3 max-w-7xl w-full border-2 border-red-300 mx-auto">
        <div className="col-span-1">
          <Image
            src={"/assets/teacher2.jpg"}
            width={500}
            height={500}
            className="w-[90%] h-[500px] object-cover"
            alt=""
          />
        </div>
        <div className="col-span-2 max-w-lg">
          <h1 className="font-bold text-main_bg_color text-3xl">
            Muhammad Ejaz
          </h1>
          <p className="mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            libero dolores amet distinctio ipsum molestiae magnam tenetur animi
            eligendi eum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleTeacher;
