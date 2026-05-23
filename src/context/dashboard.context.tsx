import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { AxiosProvider } from "../Constant";

export interface DashboardStats {
  total_notes: number;
  pending: number;
  in_progress: number;
  paused: number;
  delayed: number;
  completed: number;
}

interface DashboardContextType {
  stats: DashboardStats;

  fetchDashboardStats: () => Promise<void>;

  loading: boolean;
}

const DashboardContext =
  createContext<DashboardContextType>({
    stats: {
      total_notes: 0,
      pending: 0,
      in_progress: 0,
      paused: 0,
      delayed: 0,
      completed: 0,
    },

    fetchDashboardStats: async () => {},

    loading: false,
  });

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboard = () => {
  return useContext(DashboardContext);
};

const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] =
    useState<boolean>(false);

  const [stats, setStats] =
    useState<DashboardStats>({
      total_notes: 0,
      pending: 0,
      in_progress: 0,
      paused: 0,
      delayed: 0,
      completed: 0,
    });

  const fetchDashboardStats =
    async (): Promise<void> => {
      try {
        setLoading(true);

        const { data } =
          await AxiosProvider.get(
            "/dashboard/stats",
          );

        setStats(data);
      } catch (error) {
        console.error(
          "Dashboard stats error:",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
  const loadDashboard = async () => {
    await fetchDashboardStats();
  };

  loadDashboard();
}, []);

  return (
    <DashboardContext.Provider
      value={{
        stats,
        fetchDashboardStats,
        loading,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;