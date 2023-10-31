import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const Table = () => {
  const params = useParams();

  useEffect(() => {
    // TODO gettrainees based on techsill id
  }, []);
  return <table></table>;
};
