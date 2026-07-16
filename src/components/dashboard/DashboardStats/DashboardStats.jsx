import StatCard from "../StatCard/StatCard";

import {
    FaCode,
    FaStar,
    FaCalendar,
    FaLaptopCode
} from "react-icons/fa";

import "./DashboardStats.css";

const DashboardStats = ({ stats }) => {

    return (

        <div className="stats-grid">

            <StatCard

                title="Total Reviews"

                value={stats.totalReviews}

                icon={<FaCode/>}

                color="#2563eb"

            />

            <StatCard

                title="Average Score"

                value={stats.averageScore}

                suffix="%"

                icon={<FaStar/>}

                color="#16a34a"

            />

            <StatCard

                title="Languages"

                value={stats.languagesUsed}

                icon={<FaLaptopCode/>}

                color="#9333ea"

            />

            <StatCard

                title="Today's Reviews"

                value={stats.todayReviews}

                icon={<FaCalendar/>}

                color="#ea580c"

            />

        </div>

    );

};

export default DashboardStats;