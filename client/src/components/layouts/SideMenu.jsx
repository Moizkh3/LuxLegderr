import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import CharAvatar from "../Cards/CharAvatar";
import { motion } from "framer-motion";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.label === "Logout") {
      handleLogout();
    } else {
      navigate(item.path);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for individual items
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20 px-4"
    >
      <div className="flex flex-col items-center justify-center gap-3 mt-5 mb-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {user?.profileImageUrl ? (
            <img
              src={user?.profileImageUrl || ""}
              alt="Profile Image"
              className="w-20 h-20 bg-slate-400 rounded-full object-cover border-2 border-primary/20"
            />
          ) : (
            <CharAvatar
              fullName={user?.fullName}
              width="w-20"
              height="h-20"
              style="text-xl"
            />
          )}
        </motion.div>

        <motion.h5
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-950 font-medium leading-6"
        >
          {user?.fullName || ""}
        </motion.h5>
      </div>

      <div className="space-y-2">
        {SIDE_MENU_DATA.map((item, index) => (
          <motion.button
            key={`menu_${index}`}
            variants={itemVariants}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center gap-4 text-[15px] ${activeMenu == item.label
              ? "text-white bg-[#95d5b2] shadow-lg shadow-[#95d5b2]/30"
              : "text-gray-600 hover:bg-gray-50"
              } py-3 px-6 rounded-xl transition-all duration-200`}
            onClick={() => handleClick(item)}
          >
            <item.icon className="text-xl" />
            <span className="font-medium">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default SideMenu;