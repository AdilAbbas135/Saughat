import { MdLocationOn } from "react-icons/md";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { Link } from "react-router-dom";
const FeaturedJobs = () => {
  const jobs = [
    {
      ProfilePicture:
        "/assets/119485568_3440510952675702_3223573469868302346_n.jpg",
      JobTitle: "Job title",
      Dscription:
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum natus molestias pariatur rerum ipsa quisquam corrupti eveniet incidunt nesciunt assumenda excepturi dicta odio, rem nostrum placeat repudiandae laboriosam officiis voluptas.",
      Location: "Phalia, Punjab, Pakistan",
      "Institute name": "Punjab College Phalia",
      JobType: "Permanent",
    },
    {
      ProfilePicture:
        "/assets/119485568_3440510952675702_3223573469868302346_n.jpg",
      JobTitle: "Job title",
      Dscription:
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum natus molestias pariatur rerum ipsa quisquam corrupti eveniet incidunt nesciunt assumenda excepturi dicta odio, rem nostrum placeat repudiandae laboriosam officiis voluptas.",
      Location: "Phalia, Punjab, Pakistan",
      "Institute name": "Punjab College Phalia",
      JobType: "Temporary",
    },
    {
      ProfilePicture:
        "/assets/119485568_3440510952675702_3223573469868302346_n.jpg",
      JobTitle: "Job title",
      Dscription:
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum natus molestias pariatur rerum ipsa quisquam corrupti eveniet incidunt nesciunt assumenda excepturi dicta odio, rem nostrum placeat repudiandae laboriosam officiis voluptas.",
      Location: "Phalia, Punjab, Pakistan",
      "Institute name": "Punjab College Phalia",
      JobType: "Permanent",
    },
    {
      ProfilePicture:
        "/assets/119485568_3440510952675702_3223573469868302346_n.jpg",
      JobTitle: "Job title",
      Dscription:
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum natus molestias pariatur rerum ipsa quisquam corrupti eveniet incidunt nesciunt assumenda excepturi dicta odio, rem nostrum placeat repudiandae laboriosam officiis voluptas.",
      Location: "Phalia, Punjab, Pakistan",
      "Institute name": "Punjab College Phalia",
      JobType: "Permanent",
    },
  ];
  return (
    <>
      <div className="px-5">
        <div className="mt-10 mb-5 flex justify-between items-center">
          <h1 className="pb-1 w-fit h-fit text-2xl md:text-3xl font-bold font-sans uppercase border-b-2 border-search_color">
            Latest Jobs Around You
          </h1>
          <button className="hidden md:block px-10 py-2 bg-hover_color text-white font-semibold rounded-sm">
            View More
          </button>
        </div>
        <div className="grid grid-cols-1 tablets:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-4 text-black ">
          {jobs.map((job, index) => {
            return (
              <div
                key={index}
                className="flex flex-col rounded-md overflow-hidden shadow-sm border border-gray-300"
              >
                <img
                  height={200}
                  width={300}
                  className="h-[150px] w-full object-cover"
                  src={job.ProfilePicture}
                  alt=""
                />
                <div className="detailContainer px-5 py-3 pb-5">
                  <h1 className="fpName text-2xl uppercase font-bold font-sans ">
                    {job.JobTitle}
                  </h1>
                  <p className="">
                    {job.Dscription.length > 100
                      ? job.Dscription.substring(0, 100)
                      : job.Dscription}{" "}
                    ...
                  </p>
                  <div className="mt-3 flex items-center text-[15px] space-x-1">
                    <MdLocationOn size={17} />
                    <p>{job.Location}</p>
                  </div>
                  <div className="mt-3 flex items-center text-[15px] space-x-1">
                    <VscTypeHierarchySub size={17} />
                    <p>{job.JobType}</p>
                  </div>
                  {/* <div className="mt-2 flex space-x-1 flex-wrap">
                    {teacher.Subjects.map((subject, index) => {
                      return (
                        <div
                          key={index}
                          className="bg-main_color_2 px-4 py-1 rounded-md"
                        >
                          <p className="text-sm">{subject}</p>
                        </div>
                      );
                    })}
                  </div> */}
                  <Link to={"/jobs/12345"}>
                    <button className="mt-4 w-full py-2 bg-hover_color text-white font-semibold rounded-sm">
                      View Job
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FeaturedJobs;
