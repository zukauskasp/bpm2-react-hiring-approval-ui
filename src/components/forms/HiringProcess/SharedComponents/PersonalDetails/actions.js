import * as actions from "../../../../../redux/actions/actions";

export const getEmployeeDetails = (taskId) =>  (dispatch, getState) => {
    return dispatch(actions.fetchTaskVariables(taskId)).then((data) => {
        const employeeId = data.response.employeeId.value
        if (!employeeId) dispatch(actions.showErrorPage(`employee not fond for task id - ${taskId}`))
        return dispatch(actions.fetchEmployeeDetailsById(employeeId))
    })
}