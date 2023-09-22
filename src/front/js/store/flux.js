const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: { token: "" },
        actions: {
            generateToken: async (email, password) => {
                try {
                    // fetching data from the backend
                    const resp = await fetch(
                        process.env.BACKEND_URL + "/api/token",
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                email: email,
                                password: password
                            })
                        }
                    );
                    if (resp.status !== 200)
                        throw new Error("There has been an error");
                    const data = await resp.json();
                    sessionStorage.setItem("token", data.access_token);
                    setStore({ token: data.access_token });
                    return data;
                } catch (error) {
                    console.log("Error generating Token", error);
                }
            },
            removeToken: () => {
                setStore({ token: "" });
            }
        }
    };
};

export default getState;
