import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <div className="h-screen grid grid-cols-2 bg-more-blue">
      <div className="grid place-content-center text-white">
        <h1 className="text-5xl font-bold">
          Build the NEXT <br />
          <span className="font-extrabold text-7xl">DAO</span>
        </h1>
        <p>
          WHERE SPORTS MEET{' '}
          <span className="font-extrabold text-2xl">METAVERSE</span>
        </p>
        <div className="pt-10">
          <Link className="button" to="/create">
            Create a Campaign
          </Link>
        </div>
      </div>
      <div className="grid place-content-center ">
        <div className="p-2 rounded-full border border-primary border-opacity-30 hover:border-opacity-70 duration-500 ease-in">
          <div className="p-4 rounded-full border-4 border-primary border-opacity-20 hover:border-opacity-60 duration-500 ease-in">
            <div className="p-5 rounded-full border border-primary border-opacity-10 hover:border-opacity-50 duration-500 ease-in">
              <img
                src="/sun.jpg"
                alt="Dawn"
                className="w-60 h-60 rounded-full animate-spin-slow"
              />
            </div>
          </div>
        </div>

        {/* <img
            src="https://assets.uefa.tv.uicentric.net/images/tiles/UCL_circle_web_medium.png"
            alt="image"
            className="w-60 h-60"
          />
          <img
            src="https://digitalhub.fifa.com/m/58223e0c1caa5674/original/FIFA-logo.png"
            alt="image"
            className="relative -left-20 w-60 h-60"
          />
          <img
            src="/favicon.svg"
            alt="image"
            className="relative -left-40 w-60 h-60"
          /> */}
      </div>
    </div>
  )
}
