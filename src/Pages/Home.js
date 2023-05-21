import Header from "../Components/Header/Header";
import Banners from "../Components/HomeBanners/Banners";
import FeaturedTeachers from "../Components/FeaturedTeachers/FeaturedTeachers";
import FeaturedJobs from "../Components/FeatruredJobs/FeaturedJobs";
import EmailList from "../Components/EmailList/EmailList";
import Footer from "../Components/Footer/Footer";

export default function Home() {
  return (
    <>
      {/* <head>
        <title>TeachersHub - Find the Best Teachers Near You</title>
        <meta name="description" content="Find the Best Teachers Near You" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head> */}
      <div>
        <Header page="home" />
        <div className="w-full">
          <div className="w-full max-w-6xl m-auto pt-16  ">
            <FeaturedTeachers />
            {/* <Banners /> */}
            {/* <FeaturedJobs /> */}
          </div>
          <EmailList />
          <Footer />
        </div>
      </div>
    </>
  );
}
