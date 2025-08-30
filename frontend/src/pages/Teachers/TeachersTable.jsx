import {Box} from "@mui/material";
import {AgGridReact} from "ag-grid-react";

const TeachersTable = ({teachers, se}) => {
    const columns = [
        {headerName: '#', valueGetter: 'node.rowIndex + 1', width: 104},
        {headerName: 'Name', field: 'name', flex: 1},
        {headerName: 'Subject', field: 'subject', flex: 1},
        {headerName: 'Email', field: 'email', flex: 1},
        {headerName: 'Work Contact', field: 'workContact', flex: 1},
    ];

    const defaultColDef = {
        resizable: false,
        sortable: false,
        filter: false,
        cellStyle: {
            color: 'red',
            fontWeight: 'bold',
            textAlign: 'left',
            paddingLeft: '4px',
        },
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: 5,
            borderRadius: 4,
            width: '1344px',
            border: "none"
        }}>
            <div className="ag-theme-alpine" style={{height: 600, width: '100%'}}>
                <AgGridReact
                    rowData={teachers}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                    rowHeight={60}
                    headerHeight={50}
                />
            </div>
        </Box>
    );
}

export default TeachersTable;