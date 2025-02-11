import Auth from "../utils/auth";

const retrieveUsers = async () => {
  try {
    const response = await fetch("/api/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error("invalid user API response, check network tab!");
    }

    return data;
  } catch (err) {
    console.log("Error from data retrieval:", err);
    return [];
  }
};

const registerUser = async (userData: {
  username: string;
  password: string;
}) => {
  console.log("Attempting to register user...");
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(userData),
    });
    console.log("Response status:", response.status);
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    return data;
  } catch (err) {
    console.log("Error registering user:", err);
    return Promise.reject("Could not register user");
  }
};

export { retrieveUsers, registerUser };
