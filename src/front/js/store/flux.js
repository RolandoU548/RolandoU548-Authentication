const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: { token: localStorage.getItem("token") || null, user: { id: null, name: null, email: null } },
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
                        return "User already exists";
                    }
                    if (!resp.ok) {
                        return false;
                    }
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
                    if (resp.status === 403){
                        return "Incorrect password";
                    }
                    if (resp.status === 400){
                        return "User doesn't exist";
                    }
                    const data = await resp.json();
                    localStorage.setItem("token", data.access_token);
                    setStore({ token: data.access_token });
                    return data;
                } catch (error) {
                    console.log("Error generating Token.", error);
                }
            },
            identificateUser: async (token)=>{
                try{
                    const resp = await fetch(process.env.BACKEND_URL + "api/user", {headers: {"Content-Type": "application/json", "authorization": "Bearer " + token}})
                    const data = await resp.json()
                    setStore({user: {id: data.id, name: data.name, email: data.email}})
                    return data
                }catch (error){
                    console.log("There has been an error", error)
                }
            }
            ,
            signOut: () => {
                setStore({ token: null, user: { id:null, name: null, email: null } });
                localStorage.removeItem("token");
            }
        }
    };
};

export default getState;
