import React, { useState, useEffect } from "react";
import Checkbox from "../../../reusableComponents/Checkbox/Checkbox";
import SingleSelect from "../../../reusableComponents/SingleSelect/SingleSelect";
import TextArea from "../../../reusableComponents/TextField/TextField";
import { saveFormVariablesToStore } from "../../../../redux/actions/actions";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";


const ApprovalForm = () => {

    const componentName = "ApprovalForm"
    const dispatch = useDispatch();
    const [approval, setApproval] = useState(false);
    const [reason, setReason] = useState("");
    const [validationError, setValidationError] = useState("");

    const reasonsList = [
        { name: "", value: "" },
        { name: "Not allowed", value: "NOT_ALLOWED" },
        { name: "Something changed", value: "CHANGED" },
        { name: "Other reason", value: "OTHER" }
    ];

    useEffect(() => {
        dispatch(saveFormVariablesToStore({ componentName, vars: { approval } }));
    }, [dispatch, componentName, approval]);

    const handleChange = (value) => {

        dispatch(
            saveFormVariablesToStore({
                componentName,
                vars: { approval: value }
            })
        );
    };

    const handleCommentSectionValidation = (value) => {
        let errorMessage = value.length === 0 && reason === "OTHER" ? "This field is required" : "";
        setValidationError(errorMessage)
    }

    return (
        <div>
            <Grid container spacing={2} direction="row"
                justify="flex-start">
                <Grid item xs={3}>
                    <Checkbox
                        label="Approve requisition"
                        value={approval}
                        name="approval"
                        onChange={e => {
                            setApproval(e.target.checked);
                            handleChange(e.target.checked);
                        }}
                    />
                </Grid>
                <Grid item xs={9}>
                    <SingleSelect
                        items={reasonsList}
                        label="Select disapproval reason"
                        onChange={(e) => setReason(e.target.value)}
                        errorMessage=""
                    />
                    {reason === "OTHER" ?
                        <TextArea label="Please specify"
                            required
                            textarea
                            errorMessage={validationError}
                            onChange={(e) => handleCommentSectionValidation(e.target.value)} />
                        : null}
                </Grid>
            </Grid>
        </div>
    );
};

export default ApprovalForm;
