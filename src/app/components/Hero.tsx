export default function Hero() {
    
    return (
        <section className="container my-16">

            <h1 className="text-4xl font-bold text-center">
                Find your next<br /> dream job
            </h1>
            <p className="text-center text-gray-600 mt-2">
                Over 100+ jobs available in tunisia or remote
            </p>
            <form className="flex gap-2 mt-4 max-w-md mx-auto">
                <input type="search" className="border border-gray-400 w-full py-2 px-3 rounded-md" placeholder="Search job.."/>
                <button className="bg-blue-600 text-white  py-2 px-4  rounded-md transition-transform duration-300 ease-in-out hover:scale-105">Search</button>
            </form>
        </section>
    );
}