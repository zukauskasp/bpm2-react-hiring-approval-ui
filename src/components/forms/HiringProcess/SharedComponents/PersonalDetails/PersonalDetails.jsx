import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import { useSelector, useDispatch } from "react-redux";
import { getEmployeeDetails } from "./actions";
import { saveFormVariablesToStore } from "../../../../../redux/actions/actions";
import Grid from "@material-ui/core/Grid";
import TextField from "../../../../reusableComponents/TextField/TextField";

const PersonalDetails = props => {

  const componentName = "PersonalDetails"
  const dispatch = useDispatch();
  const employee = useSelector(
    state => state.fetchEmployeeDetailsByIdReducer.item
  );
  const { formKey, taskId } = props;
  const [departmentRegNo, setDepartmentRegNo] = useState("");
  const [department, setDepartment] = useState("");
  const [employeeTitle, setEmployeeTitle] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    dispatch(getEmployeeDetails(taskId));
  }, [dispatch, taskId]);

  useEffect(() => {
    if (Object.entries(employee).length > 0) {
      setDepartmentRegNo(employee.regNoPrimaryDepartment);
      setDepartment(employee.unitNamePrimaryDepartment);
      setEmployeeTitle(employee.title);
      setFullName(employee.fullName);
    }
  }, [employee, dispatch, formKey]);

  dispatch(
    saveFormVariablesToStore({
      componentName,
      vars: {
        departmentRegNo,
        department,
        employeeTitle,
        fullName
      }
    })
  );

  const handleChange = () => {
    dispatch(saveFormVariablesToStore({ componentName, vars: null }));
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs>
          <FormControl fullWidth margin="normal">
            <TextField
              type="text"
              name="fullName"
              value={fullName}
              onChange={e => {
                setFullName(e.target.value);
                handleChange();
              }}
              label="Full Name"
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl fullWidth margin="normal">
            <TextField
              type="text"
              name="employeeTitle"
              value={employeeTitle}
              onChange={e => {
                setEmployeeTitle(e.target.value);
                handleChange();
              }}
              label="Employee Title"
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl fullWidth margin="normal">
            <TextField
              type="text"
              name="departmentRegNo"
              value={departmentRegNo}
              onChange={e => {
                setDepartmentRegNo(e.target.value);
                handleChange();
              }}
              label="Department Reg No"
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl fullWidth margin="normal">
            <TextField
              type="text"
              name="department"
              value={department}
              onChange={e => {
                setDepartment(e.target.value);
                handleChange();
              }}
              label="Department"
              required
            />
          </FormControl>
          <div >
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default PersonalDetails;
