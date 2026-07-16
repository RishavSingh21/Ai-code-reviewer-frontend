import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Layout from "../components/Layout/Layout";
import SkeletonLoader from "../components/SkeletonLoader/SkeletonLoader";
import DashboardStats from "../components/dashboard/DashboardStats/DashboardStats";
import ActivityChart from "../components/dashboard/ActivityChart/ActivityChart";
import LanguageChart from "../components/dashboard/LanguageChart/LanguageChart";
import RecentReviews from "../components/dashboard/RecentReviews/RecentReviews";
import QuickActions from "../components/dashboard/QuickActions/QuickActions";

import api from "../services/api";

import "./Dashboard.css";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setDashboard(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <SkeletonLoader type="dashboard" />
      </Layout>
    );
  }

  if (!dashboard) {
    return (
      <Layout>
        <div className="empty-state">
          <span className="empty-icon">📊</span>
          <h2>Dashboard Unavailable</h2>
          <p>Unable to load dashboard data. Please check your connection.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <h1 className="page-title">Welcome Back 👋</h1>
          <p className="page-subtitle">
            AI-Powered Code Analysis Platform — Your code quality companion
          </p>
        </div>
        <div className="hero-decoration">
          <div className="hero-orb orb-1" />
          <div className="hero-orb orb-2" />
          <div className="hero-orb orb-3" />
        </div>
      </div>

      <DashboardStats stats={dashboard.stats} />

      <QuickActions />

      <div className="chart-grid">
        <ActivityChart data={dashboard.reviewTrend || []} />
        <LanguageChart data={dashboard.languageDistribution} />
      </div>

      <RecentReviews reviews={dashboard.recentReviews} />
    </Layout>
  );
};

export default Dashboard;