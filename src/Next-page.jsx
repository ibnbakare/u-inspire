import { useLocation } from "react-router-dom";

function NextPage() {
  const location = useLocation();
  const { userData } = location.state || {}; // Access the passed data

  return (
    <div>
      <h1>Welcome, {userData?.name}</h1>
      <p>Your registration type: {userData?.registrationType}</p>
      {/* Use other data as needed */}
    </div>
  );
}
