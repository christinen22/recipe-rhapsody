import { useIsFetching } from "@tanstack/react-query";
import { PacmanLoader } from "react-spinners";

const Loading = () => {
  const isFetching = useIsFetching();

  return isFetching ? (
    <div id="loading-spinner">
      <PacmanLoader color="#90cea1" size={20} speedMultiplier={1.5} />
    </div>
  ) : null;
};

export default Loading;
