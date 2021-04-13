import React, { useState, useEffect } from 'react'
import Table from "../../../reusableComponents/Table/Table";
import Button from "../../../reusableComponents/Button/Button";
import Grid from '@material-ui/core/Grid';

import Input from "../../../reusableComponents/TextField/TextField";
import SingleSelect from "../../../reusableComponents/SingleSelect/SingleSelect";
import DateTimePicker from "../../../reusableComponents/DateTimePicker/DateTimePicker";
import Modal from "../../../reusableComponents/Modal/Modal";


export default function VacancyDetails() {

    const titles = ["Job description", "Departament longer title", "Position", "Salary (range)", "Start date"];
    const [tableData, setTableData] = useState([]);
    const [data,] = useState([
        { jobTitle: "Softwere engineer", departament: "Test departament", position: "SENIOR", salaryRange: "2000-3000 EUR", date: "2020-03-20" },
        { jobTitle: "Softwere engineer", departament: "Test departament", position: "JUNIOR", salaryRange: "2000-3000 EUR", date: "2020-03-20" },
        { jobTitle: "Softwere engineer", departament: "Test departament", position: "MID", salaryRange: "2000-3000 EUR", date: "2020-03-20" },
        { jobTitle: "Softwere engineer khlgk jgkfld", departament: "Test departament", position: "MID", salaryRange: "2000-3000 EUR 111111111", date: "2020-03-20" },
    ]);
    const [modalOpen, setModalOpen] = useState(false);
    const [id, setId] = useState(null);
    const [jobTitle, setJobTitle] = useState("");
    const [departament, setDepartament] = useState("");
    const [position, setPosition] = useState("");
    const [salaryRange, setSalaryRange] = useState("");
    const [date, setDate] = useState(new Date());
    const [additionalInfo, setAdditionalInfo] = useState("");
    const positionsList = [{ name: "", value: "" }, { name: "Junior", value: "JUNIOR" }, { name: "Mid", value: "MID" }, { name: "Senior", value: "SENIOR" }];

    //updates table data with given data on first render
    useEffect(() => {
        let newDataForTable = [];
        let textObject = {};
        textObject[0] = "lLorem ipsum dolor, sit amet consectetur adipisicing elit. Ut labore, libero fuga impedit error, sint, nobis ex non quisquam saepe a dolore similique. Totam libero, veniam at ex recusandae temporibus?";
        textObject[2] = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit autem iure molestias a dignissimos dolore, non quasi ducimus ipsam aspernatur rerum temporibus asperiores delectus libero architecto et, sint ad. Unde. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam nobis labore eveniet a nihil aperiam dolorem iusto illum ut sint, cupiditate blanditiis similique perspiciatis cum? Consequatur eaque ex quos facilis.";
        data.map((value, key) => newDataForTable.push({ id: key, isChecked: false, data: value, expandableData: textObject[key] ? textObject[key] : "" }))
        setTableData(newDataForTable);
    }, [data]);

    const editAction = (row, id) => {
        setVariables(id, row.data.jobTitle, row.data.departament, row.data.position, row.data.salaryRange, new Date(row.data.date), row.expandableData);
        setModalOpen(true);
    }

    const deleteAction = (id) => setTableData(tableData.filter(row => row.id !== id));

    const copyAction = (row) => {
        addNewItemToTheTable(row.data.jobTitle, row.data.departament, row.data.position, row.data.salaryRange, new Date(row.data.date), row.expandableData);
    }

    const modalWindowAction = () => {

        if (id === null) {
            addNewItemToTheTable(jobTitle, departament, position, salaryRange, date, additionalInfo)
        } else {
            editItemInTheTable(jobTitle, departament, position, salaryRange, date, additionalInfo);
        }
        setVariables(null, "", "", "", "", new Date(), "");
        setModalOpen(false);
    }

    const addNewItemToTheTable = (jobTitle, departament, position, salaryRange, date, additionalInfo) => {

        let dateString = date.toISOString().split('T')[0];
        let newData = {};
        newData.id = tableData.length > 0 ? tableData[tableData.length - 1].id + 1 : 0; //generates unique ID 
        newData.isChecked = false;
        newData.data = { jobTitle, departament, position, salaryRange, date: dateString };
        newData.expandableData = additionalInfo;
        setTableData(tableData => [...tableData, newData]);
    }

    const editItemInTheTable = (jobTitle, departament, position, salaryRange, date, additionalInfo) => {

        let dateString = date.toISOString().split('T')[0];
        let dataArray = tableData;
        dataArray.map(row => {
            if (row.id === id) {
                row.data = { jobTitle, departament, position, salaryRange, date: dateString };
                row.expandableData = additionalInfo;
            }
            return row;
        })
        setTableData(dataArray);
    }


    const setVariables = (id, jobTitle, departament, position, salaryRange, date, additionalInfo) => {
        setId(id);
        setJobTitle(jobTitle);
        setDepartament(departament);
        setPosition(position)
        setSalaryRange(salaryRange);
        setDate(date);
        setAdditionalInfo(additionalInfo);
    }

    const handleModalCancelButtonClick = () => {
        setModalOpen(false)
        setVariables(null, "", "", "", "", new Date(), "");
    }

    return (
        <div>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-start"
            >
                <Grid item >
                    <h1>Vacancy tables</h1>
                </Grid>
                <Grid item >
                    <Button icon="add" onClickEvent={() => setModalOpen(true)} />
                </Grid>
            </Grid>
            <Table
                selectionTable={true}
                copyAction={copyAction}
                editAction={editAction}
                deleteAction={deleteAction}
                titles={titles}
                data={tableData}
                setData={setTableData}
                expandableTable={true}
            />
            <Modal open={modalOpen} title="Add new vacancy" onSubmit={modalWindowAction} submitButtonText="Save" onClose={handleModalCancelButtonClick}
            >
                <Grid container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                    spacing={2}>
                    <Grid item  >
                        <Input
                            type="text"
                            name="jobtitle"
                            value={jobTitle}
                            onChange={e => setJobTitle(e.target.value)}
                            label="Job title"
                            required />
                        <Input
                            name="departament"
                            value={departament}
                            onChange={e => setDepartament(e.target.value)}
                            label="Departament"
                            required />
                        <SingleSelect
                            items={positionsList}
                            label="Select position"
                            onChange={e => setPosition(e.target.value)}
                            errorMessage=""
                            name="position"
                            value={position}
                        />
                        <Input
                            type="text"
                            name="salaryrange"
                            value={salaryRange}
                            onChange={e => setSalaryRange(e.target.value)}
                            label="Salary Range"
                            required />
                        <DateTimePicker
                            format="MM/dd/yyyy"
                            disablePast={true}
                            showTodayButton={true}
                            selectedDate={date}
                            setDate={setDate}
                            inputVariant="outlined"
                            name="date"
                            label="Start date"
                            isHoursDisabled={true}
                            isHolidaysDisabled={false}
                            id={'0'}
                            required />
                    </Grid>
                    <Grid item >
                        <Input
                            textarea={true}
                            type="text"
                            name="expandableInformation"
                            value={additionalInfo}
                            onChange={e => setAdditionalInfo(e.target.value)}
                            label="Additional information"
                        />
                    </Grid>
                </Grid>
            </Modal>
        </div>

    )
}

