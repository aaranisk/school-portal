import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {Box} from "@mui/material";
import "./_classes-table.css"
import {ClientSideRowModelModule, ModuleRegistry} from 'ag-grid-community';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const ClassesTable = ({classes}) => {
    const columns = [
        {headerName: '#', valueGetter: 'node.rowIndex + 1', width: 104,},
        {headerName: 'Class Level', field: 'level', width: 300,},
        {headerName: 'Class Name', field: 'name', width: 300,},
        {headerName: 'Form Teacher', field: 'formTeacher.name', flex: 1},
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
            border: "none",
            p: '32px',
            height: '50',
        }}>
            <div className="ag-theme-alpine" style={{height: '60vh', width: '100%'}}>
                <AgGridReact
                    rowData={classes}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                    rowHeight={60}
                    headerHeight={50}
                />

            </div>
        </Box>
    );
};

export default ClassesTable;

