import axios from "axios";



const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token')
    }
})

const fetchProjectData = async (id) => {
    const projectURL = `/projects/projects/${id}/`;
    const projectTasks = `/projects/actionitems/?search=${id}`;

    // define the methods we want to perform on the previous urls 
    const projectRequest = await client.get(projectURL);
    const tasksRequest = await client.get(projectTasks);

    try {
        let data = axios.all([projectRequest, tasksRequest]).then(axios.spread((...responses) => {
            const projectResponse = responses[0];
            const tasksResponse = responses[1]
            return [projectResponse.data, tasksResponse.data.results]
        }));
        if (data) return data;

    } catch (error) {
        throw Error("There was a problem fetching data");
    }
}

const postTask = async (data) => {
    try {
        let response = await client.post('/projects/tasks/', data);
        let task = null;
        if (response) task = response.data;
        return task;
    } catch (error) {
        throw Error('The data could not be added');
    }
}


export const projectApi = {
    fetchProjectData,
    postTask
}
