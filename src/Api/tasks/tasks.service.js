import client from "../index";



const getSelectedTask = async (id) => {
    try {
        let response = await client.get(`/projects/tasks/${id}/`);
        let selected_task = null;
        if (response) selected_task = response.data;
        return selected_task;
    } catch (error) {
        throw Error("Could not find the specific task")
    }

}

const shiftTaskCardNext = async (action_id, task_id) => {
    let action = action_id;
    action += 1
    try {
        let response = await client.put(`/projects/tasks/${task_id}/next/`, { action });
        let choice = null
        if (response) choice = response.data;
        console.log(choice);
    } catch (error) {
        throw Error("Could not update the card")
    }
}

const shiftTaskCardPrevious = async (action_id, task_id) => {
    let action = action_id;
    action -= 1
    try {
        let response = await client.put(`/projects/tasks/${task_id}/previous/`, { action });
        let choice = null
        if (response) choice = response.data;
        console.log(choice);
    } catch (error) {
        throw Error("Could not update the card")
    }
}


export const tasksAPI = {
    getSelectedTask,
    shiftTaskCardNext,
    shiftTaskCardPrevious
}