import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Icon from "../Icon/Icon";

const Pagination = ({ page, resultsCount, rowsPerPage, rowsPerPageOptions, filteredDataCount, setPage, setRowsPerPage, onChangeRowsPerPage }) => {

    const classes = useStyles();

    return (
        <Grid container direction="row" justify="space-between" alignItems="center" className={`${classes.actionsWrapper}`} >
            <Grid item >
                <span className={`${classes.paginationSpan}`}>{filteredDataCount} out of {resultsCount}</span>
            </Grid>
            <Grid item>
                {/*Example output: <...2 3 4...> */}
                {/* Display arrow left if there are at least one page to the left*/}
                {page - 1 > 0 ? <Icon alt="" className={classes.paginationIcon} icon='back' onClick={() => setPage(page - 1)} /> : null}
                {/* Display multiple dots on the left if there are at least two pages to the left*/}
                {page - 2 > 0 ? <span className={`${classes.paginationSpan}`}>...</span> : null}
                {/* Display page number to the left if there is at least one page to the left*/}
                {page - 1 > 0 ? <span className={`${classes.paginationSpan}`} onClick={() => setPage(page - 1)}>{page - 1}</span> : null}
                {/* Display current page*/}
                <span className={`${classes.paginationSpan} ${classes.paginationSpanSelected}`}>{page}</span>
                {/* Display page number to the right if there is at least one page to the right*/}
                {resultsCount / rowsPerPage > page ? <span className={`${classes.paginationSpan}`} onClick={() => setPage(page + 1)}>{page + 1}</span> : null}
                {/*  Display multiple dots on the right if there are at least two pages to the right*/}
                {resultsCount / rowsPerPage > page + 1 ? <span className={`${classes.paginationSpan}`}>...</span> : null}
                {/*  Display arrow right if there are at least one page to the right*/}
                {resultsCount / rowsPerPage > page ? <Icon alt="" className={classes.paginationIcon} icon='next' onClick={() => setPage(page + 1)} /> : null}
            </Grid>
            <Grid item >
                {rowsPerPageOptions.map((value, index) => (
                    <span
                        key={index}
                        className={`${classes.paginationSpan} ${rowsPerPage === value ? classes.paginationSpanSelected : null}`}
                        onClick={() => { setRowsPerPage(value); onChangeRowsPerPage(value); setPage(1) }}
                    >{value}
                    </span>
                ))}
            </Grid>
        </Grid>
    )
}

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    resultsCount: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
    filteredDataCount: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    setRowsPerPage: PropTypes.func.isRequired,
    onChangeRowsPerPage: PropTypes.func.isRequired
}

Pagination.defaultProps = {
    page: 1,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20],
}

export default Pagination;

const useStyles = makeStyles({
    actionsWrapper: {
        padding: "15px 10px",
        boxSizing: "border-box"
    },
    paginationSpan: {
        fontFamily: 'Danske Text v2',
        fontWeight: '600',
        fontSize: "15px",
        padding: '0 5px',
        color: "#93989C",
        cursor: "pointer",

    },
    paginationSpanSelected: {
        color: "#003755",
    },
    paginationIcon: {
        cursor: "pointer",
        height: '1.2em',
        margin: '5px 0 0 0',
        verticalAlign: 'text-bottom'
    }
});



