export const API = {
  // post call
  getOptions: async (resource, options) => {
    try {
      const res = await fetch(
        `http://localhost:4000/${resource}/getUniqueValue`,
        {
          method: "POST",
          body: JSON.stringify({ attribute: options }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.json();
      return data;
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  },
  getNextOptions: async (resource, options, values) => {
    try {
      const body = {
        attribute: options,
        values: values,
      };

      const res = await fetch(
        `http://localhost:4000/${resource}/getNextValue`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  },
  getSku: async (resource, values) => {
    try {
      const res = await fetch(`http://localhost:4000/${resource}/getSku`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  },
};
