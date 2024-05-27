import { useNavigate, useRouteError } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="w-full h-screen flex  flex-col items-center justify-center gap-4">
      <h1 className="text-lg">Något gick fel 😢 </h1>
      <p>{error.data || error.message}</p>
      <button onClick={() => navigate(-1)}>&larr; Gå tillbaka</button>
    </div>
  );
}

export default NotFound;
