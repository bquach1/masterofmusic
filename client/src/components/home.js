import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async (accessToken) => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        setError(error.response?.data || error.message);
        console.error("Error fetching profile:", error);
      }
    };

    const accessToken =
      "BQDxay2MCEUlUUOrCYuZcAB_1DqVtyNsARUVbkN17eMFlNe576nsf6lbqic5KeXUSpoMRpnAHvWD-AWT89WHNgMoEQVGq82zrcz7n6-6YqIPKMQVqr8";
    if (accessToken) {
      fetchUserProfile(accessToken);
    } else {
      console.error("Access token is missing.");
      setError("Access token is missing.");
    }
  }, []);

  return (
    <div>
      <h1>Homepage</h1>
      {userData ? (
        <div>
          <h2>Welcome, {userData.display_name}</h2>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
