import React from "react";

const MainPage: React.FC = () => {
  return (
    <>
      <header>
        <img
          src="/images/Spoonfed.png"
          alt="Spoonfed"
          className="relative w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-xl border-4 border-white mx-auto"
        />
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8 px-4"></div>
        <h1 className="text-4xl font-bold mb-6">Welcome to Spoon Fed</h1>
        <p className="text-xl text-gray-600">
          Your personal recipe discovery and management platform
        </p>
        <img
          src="/images/Spoonfed.png"
          alt="Spoonfed"
          className="relative w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-xl border-4 border-white mx-auto"
        />
      </div>
    </>
  );
};

export default MainPage;