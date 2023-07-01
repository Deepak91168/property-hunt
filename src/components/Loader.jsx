import loader from "../assets/images/loader.svg";

export const Loader = () => {
  return (
    <div className="flex h-screen z-40">
      <img src={loader} className="h-32 m-auto" alt="loader" />
    </div>
  );
};
