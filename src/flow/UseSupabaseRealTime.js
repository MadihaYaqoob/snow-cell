// src/hooks/useSupabaseRealtime.js
import { useState, useEffect } from "react";
import supabase from "flow/SupabaseClient";

const useSupabaseRealtime = (tableName, selectQuery) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from(tableName).select(selectQuery);
      if (error) {
        throw error;
      }
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel(`public:${tableName}`)
      .on("postgres_changes", { event: "*", schema: "public", table: tableName }, (payload) => {
        console.log("Change received!", payload);
        if (payload.eventType === "INSERT") {
          setData((currentData) => [...currentData, payload.new]);
        } else if (payload.eventType === "UPDATE") {
          setData((currentData) =>
            currentData.map((item) => (item.id === payload.new.id ? payload.new : item))
          );
        } else if (payload.eventType === "DELETE") {
          setData((currentData) => currentData.filter((item) => item.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableName, selectQuery]);

  return { data, loading, error, fetchData, setData };
};

export default useSupabaseRealtime;
