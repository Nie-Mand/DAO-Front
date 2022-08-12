export default function Cool() {
  return (
    <div className="h-screen bg-blueish">
      <div className="grid place-content-center h-full text-center text-white">
        <h1 className=" text-5xl uppercase font-bold ">
          <span className="font-extrabold">be a part</span> <br />
          <span className="text-4xl">
            bring your favourite championship to <br />
          </span>
          <div className="relative group mt-4 mb-2 cursor-pointer">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-dark-primary blur-lg opacity-80 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <span className="relative font-extrabold text-7xl text-white z-100 p-4">
              the metaverse
            </span>
          </div>
          <br />
          <span className="text-4xl">like what a fan would </span>
          <span className="font-extrabold text-primary">dao</span>
        </h1>

        <h2 className="pt-10 font-bold text-xs">
          #BUILT ON
          <span className="text-polygon font-extrabold"> POLYGON </span>
          NETWORK
        </h2>
      </div>
    </div>
  )
}
