import { Link } from "react-router-dom";

const FeaturedTeachers = () => {
  const Teachers = [
    {
      ProfilePicture: "/assets/teacher1.jpg",
      name: "Teacher 1",
      Subjects: ["Math", "Chemistry", "Physics"],
    },
    {
      ProfilePicture: "/assets/teacher2.jpg",
      name: "Teacher 2",
      Subjects: ["English", "Urdu"],
    },
    {
      ProfilePicture: "/assets/teacher3.jpg",
      name: "Teacher 3",
      Subjects: ["Urdu", "Math", "Physics"],
    },
    {
      ProfilePicture: "/assets/teacher4.jpg",
      name: "Teacher 4",
      Subjects: ["Math", "English", "Physics"],
    },
  ];

  return (
    <>
      <div className="px-5 md:px-0">
        <div className="mb-5 flex justify-between items-center">
          <h1 className="pb-1 w-fit h-fit text-2xl md:text-3xl font-bold font-sans uppercase border-b-2 border-search_color">
            Our Top Rated Teachers -
          </h1>
          <Link to={"/teachers"}>
            <button className="hidden md:block px-10 py-2 bg-hover_color text-white font-semibold rounded-sm">
              View All
            </button>
          </Link>
        </div>
        <div className=" grid grid-cols-1 tablets:grid-cols-2  md:grid-cols-4 gap-x-5 gap-y-5">
          {Teachers.map((teacher, index) => (
            <div
              key={index}
              style={{
                boxShadow:
                  "0 4px 5px -2px rgb(0 0 0 / 20%), 0 7px 10px 1px rgb(0 0 0 / 14%), 0 2px 16px 1px rgb(0 0 0 / 12%)",
              }}
              className="fp-container-item flex flex-col rounded-md overflow-hidden"
            >
              <img
                height={300}
                width={500}
                className="h-[250px] md:h-[300px] w-full object-cover"
                src={teacher.ProfilePicture}
                alt=""
              />
              <div className="detailContainer px-3 py-3">
                <span className="fpName text-2xl uppercase font-bold font-sans ">
                  {teacher.name}
                </span>
                <div className="mt-2 flex space-x-1 flex-wrap">
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
                </div>
                <Link to="/teachers/134">
                  <button className="mt-4 w-full py-2 bg-hover_color text-white font-semibold rounded-sm">
                    Visit Profile
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturedTeachers;
