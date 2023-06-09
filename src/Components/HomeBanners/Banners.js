import { Link } from "react-router-dom";

const Banners = () => {
  const Banners = [
    {
      name: "Q&A HUB",
      FeaturedImage: "/assets/pexels-pixabay-356079.jpg",
      link: "/qahub",
    },
    {
      name: "Discussion",
      FeaturedImage: "/assets/pexels-fauxels-3184360.jpg",
      link: "/discussion",
    },
    {
      name: "Jobs",
      FeaturedImage: "/assets/pexels-fauxels-3184465.jpg",
      link: "/jobs",
    },
  ];
  return (
    <>
      <div className="mt-5 md:mt-10 grid px-5 md:px-0 grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
        {Banners.map((elem, index) => {
          return (
            <Link
              to={elem.link}
              key={index}
              className={`featuredItem relative rounded-lg overflow-hidden text-white cursor-pointer h-60 w-full`}
            >
              <img
                width={600}
                height={600}
                className="w-full h-full rounded-lg"
                src={elem.FeaturedImage}
                alt=""
              />
              <div className="absolute bottom-7 left-5">
                <h1 className="text-3xl font-bold font-sans  rounded-md">
                  {elem.name}
                </h1>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Banners;
