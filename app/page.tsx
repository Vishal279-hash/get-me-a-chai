
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col items-center text-white min-h-[44vh] py-8 px-4 gap-4 text-center">

        <div className="font-bold flex flex-wrap gap-2 text-3xl sm:text-4xl md:text-5xl justify-center items-center">
          Get Me a Chai
          <span>
            <img className="invertIMG" src="/tea.gif" width={88} alt="" />
          </span>
        </div>

        <p className="text-sm sm:text-base">
          A crowdfunding platform for creators to fund their projects.
        </p>

        <p className="text-sm sm:text-base max-w-2xl">
          A place where your fans can buy you a chai. Unleash the power of your
          fans and get your projects
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href={"/login"}>
            <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
              Start Here
            </button>
          </Link>

          <Link href={"/about"}>
            <button type="button" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">
              Read More
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto px-4 pb-20 sm:pb-32 pt-14">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-10 sm:mb-14">
          Your Fans can buy you a Chai
        </h2>

        <div className="flex flex-col md:flex-row gap-10 md:gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="man.gif" alt="" />
            <p className="font-bold">Fans want to help</p>
            <p className="text-center">Your fans are availble for you to help you</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="coin.gif" alt="" />
            <p className="font-bold">Fans want to help</p>
            <p className="text-center">Your fans are availble for you to help you</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="group.gif" alt="" />
            <p className="font-bold">Fans want to help</p>
            <p className="text-center">Your fans are availble for you to help you</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto px-4 pb-20 sm:pb-32 pt-14 flex flex-col items-center justify-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-14">
          Learn more about us
        </h2>

        <div className="w-full max-w-[560px] aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/nxFZbkhNrXk?si=F2ae_-AManKLjEV9"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}
