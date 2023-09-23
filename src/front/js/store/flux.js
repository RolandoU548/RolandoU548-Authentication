const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: { token: null, user: { name: null, email: null } },
        actions: {
            createUser: async (name, email, password) => {
                try {
                    const resp = await fetch(
                        process.env.BACKEND_URL + "api/user",
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                name: name,
                                email: email,
                                password: password
                            })
                        }
                    );
                    if (resp.status === 422) {
                        console.error("User already exists");
                        return "User already exists";
                    } else if (resp.status !== 201) {
                        return false;
                    }
                    const data = await resp.json();
                    setStore({ user: { name: data.name, email: data.email } });
                    return true;
                } catch (error) {
                    console.log("There has been an error", error);
                }
            },
            generateToken: async (email, password) => {
                try {
                    // fetching data from the backend
                    const resp = await fetch(
                        process.env.BACKEND_URL + "api/token",
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
            signOut: () => {
                setStore({ token: null, user: { name: null, email: null } });
                sessionStorage.removeItem("token");
            }
        }
    };
};

export default getState;
