const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const callApiMultipleTimes = async (times) => {
  const endpoint = "http://localhost:3000/api/nyTimes"; // Replace with your actual endpoint

  for (let i = 0; i < times; i++) {
    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        // If a rate limit error is received, wait longer.
        console.error(`Rate limit hit, waiting longer...`);
        await sleep(12000); // Wait for 12 seconds

        // throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      // Wait for 12 seconds before making the next call
      await sleep(12000);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  }
};

// Call the function with the number of times you want to hit the API
callApiMultipleTimes(400);
