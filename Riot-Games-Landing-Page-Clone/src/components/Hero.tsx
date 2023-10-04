const Hero = () => {
  return (
    <>
      <div className="h-[100vh] trishan">
        <img
          src="https://www.riotgames.com/darkroom/2000/41fafce0d7c75d3f13b0ed474538ffe8:1299811321f0d38aa6d1e0bb2f79ad5c/convergence-ka-riotgames-3840x1600-update.png"
          alt=""
          className="absolute inset-0 object-cover w-full h-[90%] -z-10 brightness-50"
        />

        <div className="py-32 pl-12 mt-6 sm:py-48 lg:py-56">
          <div className="flex gap-11 flex-col items-center text-white w-[40rem]">
            <img
              src="https://www.riotgames.com/darkroom/500/ca793edf399904c3dc1fe954699d7d02:8d4ba21708fdcbe732355d6585a0400d/convergence-logo-riotgames-600x121.png"
              alt="Logo"
              className="w-[22.5rem]"
            />

            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-3xl font-bold">
                Developed by Double Stallion Games
              </p>

              <p className="text-xl text-center opacity-60">
                Run, leap, and slide your way through the streets of Zaun.
                Encounter champions, face down enemies, and locate
                never-before-seen sides of the Undercity.
              </p>
            </div>

            <button className="flex items-center justify-center gap-4 bg-[#d53235] py-3 px-4 rounded-3xl hover:shadow-2xl transition ease-out hover:shadow-[#d53235]">
              <div className="relative flex items-center justify-center">
                <div className="w-12 h-12 p-2 bg-black rounded-full"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3.5}
                  stroke="currentColor"
                  className="absolute w-6 h-6 right-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>

              <p className="text-3xl font-bold tracking-wider">Available Now</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
