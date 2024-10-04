import Link from "next/link";

export default function Navbar() {
    return(
        <nav className="flex justify-between items-center bg-gray-800 rounded-b-3xl mx-20 pt-6 p-6">
         <Link href='\landing'> <div className="text-3xl font-bold font-mono">Xcharge</div> </Link>
          <div className="flex items-center space-x-6">
            <button className=" bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200">
              CONNECT WALLET
            </button>
          </div>
        </nav>
    )
}