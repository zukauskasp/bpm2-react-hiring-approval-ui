import React, { useState } from 'react';

import DateTimePicker from '../../../../reusableComponents/DateTimePicker/DateTimePicker';
import SingleSelect from '../../../../reusableComponents/SingleSelect/SingleSelect';
import Button from '../../../../reusableComponents/Button/Button';
import DragAndDropArea from './DragAndDropArea/DragAndDropArea';
import Grid from "@material-ui/core/Grid";

import './customerFolder.scss';
import CustomTable from '../../../../reusableComponents/Table/Table';


const CustomerFolder = () => {
    
    const [toDate, setToDate] = useState(new Date());
    const [fromDate, setFromDate] = useState(new Date(new Date().setMonth(toDate.getMonth() - 1)));
    const [documentType, setDocumentType] = useState('All');
    const [tableData, setTableData] =useState([{"id":1,"isChecked":false,"data":{
                                                date:"2020-02-22",
                                                documentType:<a href="https://www.LINKTOCUSTOMERFOLER.COM">Digital case</a>,
                                                supplementaryText:"", 
                                                status:"Cancelled - time-out",
                                                tragDocument: "TO-BE-ADDED"
                                            },"expandableData":""}]);

    return (
        <div className='customer-folder-container'>
            <div className='search-container'>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <DateTimePicker 
                            id="date-picker-from"
                            label="Start date"
                            isHoursDisabled={false}
                            format="MM/dd/yyyy HH:mm"
                            showTodayButton={true} 
                            selectedDate={fromDate}
                            setDate={setFromDate}
                            inputVariant="outlined"
                        />
                    </Grid>
                    <Grid item xs>
                        <DateTimePicker 
                            id="date-picker-to"
                            label="End date"
                            isHoursDisabled={false}
                            format="MM/dd/yyyy HH:mm"
                            showTodayButton={true} 
                            selectedDate={toDate}
                            setDate={setToDate}
                            inputVariant="outlined"
                        />
                    </Grid>
                    <Grid item xs>
                        <SingleSelect 
                            items={[{value: "All", name:"All"},{value: "Internal document", name:"Internal document"}]}
                            onChange={e => setDocumentType(e.target.value)}
                            value={documentType}
                        />
                    </Grid>
                    <Grid item xs>
                        <Button 
                            text="Search"
                            buttonType="primary"
                            icon="search"
                            onClickEvent={()=>console.log('action to be added')}
                        />
                    </Grid>
                </Grid>
            </div>
            <hr />
                <CustomTable
                    setData={setTableData}
                    data={tableData}
                    titles={["Date", "Document Type", "Supplementary Text", "Status", "Drag Document"]}
                />
            <hr />

            <DragAndDropArea 
                documentTypes={[{value: "", name:""},{value: "vienas", name:"vienas"},{value: "du", name:"du"},{value: "trys", name:"trys"}]}
                informationTypes={[{value: "", name:""},{value: "vienas", name:"vienas"},{value: "du", name:"du"},{value: "trys", name:"trys"}]}
            />
        </div>
    )
}

export default CustomerFolder;
