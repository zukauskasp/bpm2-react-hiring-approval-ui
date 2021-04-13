import React, { useState } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Checkbox from "../Checkbox/Checkbox";
import TableData from "./TableData";
import PaginationActions from "./TablePagination";
import Icon from "../Icon/Icon";

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';


const CustomTable = ({ selectionTable, expandableTable, data, setData, titles, copyAction, editAction, deleteAction }) => {

    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openExpandableRowId, setOpenExpandableRowId] = useState(null);

    const handleChangeRowsPerPage = (value) => {
        setRowsPerPage(value);
        setPage(1);
    };

    const setChecked = (id) => {
        let newData = [...data];
        newData.map(row => row.id === id ? row.isChecked = !row.isChecked : null)
        setData(newData)
    }

    const toggleTableRow = id => id === openExpandableRowId ? setOpenExpandableRowId(null) : setOpenExpandableRowId(id);

    return (
        <Paper elevation={0} >
            <TableContainer >
                <Table className={classes.table} >
                    {titles && titles.length > 0 ?
                        <TableHead>
                            <TableRow>
                                {selectionTable ? <TableData size="small" padding="checkbox" /> : null}
                                {expandableTable ? <TableData size="small" padding="checkbox" /> : null}
                                {titles.map((value, index) => (
                                    <TableData key={index} title={value} >{value}</TableData>
                                ))}
                                {copyAction ? <TableData /> : null}
                                {editAction ? <TableData /> : null}
                                {deleteAction ? <TableData /> : null}
                            </TableRow>
                        </TableHead>
                        : null}

                    <TableBody>
                        {data.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((row, key) => (
                            <React.Fragment key={key}>

                                {/*Table row start */}
                                <StyledRow key={row.id}>
                                    {selectionTable ? // show checkboxes if true
                                        <TableData size="small" ><Checkbox value={row.isChecked} checked={row.isChecked} onChange={() => { setChecked(row.id) }} /></TableData>
                                        : null}
                                    {expandableTable ? // show expand icon if true
                                        <TableData size="small" padding="checkbox" >
                                            {expandableTable && row.expandableData !== "" ?
                                                <Icon
                                                    icon={row.id !== openExpandableRowId ? 'expand' : 'collapse'}
                                                    className={classes.icon}
                                                    onClick={() => toggleTableRow(row.id)}
                                                />
                                                : null}
                                        </TableData>
                                        : null}

                                    {/*Display data start*/}
                                    {Object.keys(row.data).map((value, index) => {
                                        return <TableData key={index}
                                            className={index + 1 === Object.keys(row.data).length ? "full-width-table-cell" : ""}
                                            title={row.data[value]}>
                                            {row.data[value]}
                                        </TableData>
                                    })}
                                    {/*Display data end*/}

                                    {copyAction ? <TableData size="small"><Icon alt="" className={classes.icon} icon='duplicate' onClick={() => copyAction(row)} /> </TableData> : null}
                                    {editAction ? <TableData size="small"><Icon alt="" className={classes.icon} icon='edit' onClick={() => editAction(row, row.id)} /></TableData> : null}
                                    {deleteAction ? <TableData size="small"><Icon alt="" className={classes.icon} icon='trash' onClick={() => deleteAction(row.id)} /></TableData> : null}
                                </StyledRow>
                                {/*Table row end */}

                                {/*Expandable row start */}
                                {expandableTable && row.id === openExpandableRowId && row.expandableData !== "" ?
                                    <StyledRow key={`${row.id}_expanded`}>
                                        <TableData colSpan="100%" style={{ textOverflow: 'initial', whiteSpace: 'normal' }} >{row.expandableData}</TableData>
                                    </StyledRow>
                                    : null}
                                {/*Expandable row end*/}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationActions
                resultsCount={data.length}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                page={page}
                setPage={setPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                filteredDataCount={data.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).length}
            />
        </Paper>
    );
}

CustomTable.propTypes = {
    selectionTable: PropTypes.bool,
    expandableTable: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.number,
        isChecked: PropTypes.bool,
        data: PropTypes.object,
        expandableData: PropTypes.string
    })),
    setData: function (props, propName, componentName) {
        if ((props['selectionTable'] === true && (props[propName] === undefined || typeof (props[propName]) !== 'function'))) {
            return new Error('setData function is required for selectionTable');
        }
    },
    titles: PropTypes.array.isRequired,
    copyAction: PropTypes.func,
    editAction: PropTypes.func,
    deleteAction: PropTypes.func,
}

CustomTable.defaultProps = {
    data: []
}

export default CustomTable;

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    icon: {
        cursor: 'pointer'
    }
});

const StyledRow = withStyles(() => ({
    root: {
        transitionDuration: ".2s",
        "&:hover": {
            background: "#F0F7FA",
        },
    },
}))(TableRow);

