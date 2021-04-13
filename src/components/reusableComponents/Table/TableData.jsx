import React from "react";
import './tableData.scss';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

export default function TableData(props) {
    return (
        <StyledTableCell {...props}>{props.children}</StyledTableCell>
    )
}
const StyledTableCell = withStyles(() => ({
    root: {
        fontFamily: "Danske Text v2",
        paddingRight: "40px",
        fontSize: '14px',
        color: "#003755",
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxWidth: "200px",

    },
    head: {
        fontWeight: "600",
    },
    body: {
        fontWeight: "400",
        paddingRight: "40px",

        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    sizeSmall: {
        width: '55px',
        paddingRight: '22px',
        '&:last-child': {
            paddingRight: '24px'
        },
        '&:first-child': {
            paddingRight: '0px'
        }
    }

}))(TableCell);
