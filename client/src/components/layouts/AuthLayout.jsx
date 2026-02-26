import React from "react";
import CARD_2 from "../../assets/images/card2.webp";
import { LuTrendingUpDown } from "react-icons/lu"
import LOGO from "/budget.png";

const AuthLayout = ({ children }) => {
    return <div className="flex">
        <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
            <div className="flex items-center gap-2">
                <img src={LOGO} alt="Logo" className="w-7 h-7 object-contain" />
                <h2 className="text-lg font-medium text-black">LuxLedger</h2>
            </div>
            {children}
        </div>

        <div className="hidden md:block w-[40vw] h-screen bg-[#d8f3dc] bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
            <div className="w-48 h-48 rounded-[40px] bg-[#52b788] absolute -top-7 -left-5" />
            <div className="w-48 h-48 rounded-[40px] border-[20px] border-[#95d5b2] absolute top-[30%] -right-10" />
            <div className="w-48 h-48 rounded-[40px] bg-[#2d6a4f] absolute -bottom-7 -left-5" />

            <div className="grid grid-cols-1 z-20">
                <StateInfoCard
                    icon={<LuTrendingUpDown />}
                    lable="Tract Your Income & Expenses"
                    value="430,000"
                    color="bg-primary"
                />
            </div>

            <img
                src={CARD_2}
                className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15"
            />

        </div>
    </div>;
};

export default AuthLayout;

const StateInfoCard = ({ icon, lable, value, color }) => {
    return <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-[#52b788]/20 border border-gray-200/50 z-10">
        <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
            {icon}
        </div>
        <div>
            <h6 className="text-xs text-gray-500 mb-1">{lable}</h6>
            <span className="text-[20px]">${value}</span>

        </div>
    </div>
}