import React, { useState } from "react";
import Header from "../components/Header";
import HeaderTabs from "../components/HeaderTabs";
import ActiveTask from "../components/tasks/ActiveTask";
import BuyTokens from "../components/tasks/BuyTokens";
import SetupTasks from "../components/tasks/SetupTasks";

const Tasks = () => {
    const [activeTabs, setActiveTabs] = useState(0);
    return (
        <div className="w-screen overflow-hidden min-h-screen bg-gradient-to-r from-pink-100 to-violet-100">
            <Header />

            <HeaderTabs activeTabs={activeTabs} setActiveTabs={setActiveTabs} />

            {activeTabs === 0 && <SetupTasks setActiveTabs={setActiveTabs} />}
            {activeTabs === 1 && <ActiveTask />}
            {activeTabs === 2 && <BuyTokens />}
        </div>
    );
};

export default Tasks;
