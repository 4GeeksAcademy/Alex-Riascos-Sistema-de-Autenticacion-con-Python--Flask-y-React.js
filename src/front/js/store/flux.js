const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,

			user: null,

			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {


			getUser: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/me", {
						method: "GET",
						headers: {

							Authorization: "Bearer " + sessionStorage.getItem("token")
						}
					});
					const data = await response.json();
					console.log(data);
					if (response.ok) {
						setStore({ user: data });
					}

				} catch (error) {
					console.log("There was an error getting the user", error);
				}
			},

			login: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/token", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email: email, password: password })
					});
					const data = await response.json();
					console.log(data);
					if (response.ok) {
						sessionStorage.setItem("token", data.token);
						setStore({ user: data.user });
						return true;
					}
					return false;
				} catch (error) {
					console.log("There was an error logging in", error);
					return false;
				}
			},

			logout: () => {
				sessionStorage.removeItem("token");
				setStore({ user: null });
			},

			register: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/register", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email: email, password: password })
					});
					const data = await response.json();
					console.log(data);
					if (response.ok) {
						return true;
					}
					return false;
				} catch (error) {
					console.log("There was an error registering", error);
					return false;
				}
			},





			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
