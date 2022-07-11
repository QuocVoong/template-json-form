import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useFormikContext } from "formik";
import MaterialTable from "@material-table/core";
import { getEventHandler } from "../registers/events.registry";
import { getCustomComponent } from "../registers/components.registry";
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Box from "@mui/material/Box";

function buildTableOptions(optionsFn) {
  const options = getEventHandler(optionsFn);
  return options ? options() : {};
}

function buildTableColumns(columns, formikContext) {
  return columns.map(col => {
    const Component = getCustomComponent(col.renderFn);
    const FilterComponent = getCustomComponent(col.renderFilterFn);
    return {
      ...col,
      title: col.title,
      field: col.dataField || col.field,
      sorting: col.sorting,
      cellStyle: col.cellStyle,
      headerStyle: {
        backgroundColor: '#f4f6f8',
        color: '#637381',
        fontWeight: 'bold',
        height: 50,
        ...col.headerStyle
      },
      width: col.width,
      minWidth: col.minWidth,
      maxWidth: col.maxWidth,
      ...FilterComponent && { filterComponent: (filterProps) => <FilterComponent {...filterProps} /> },
      ...Component && { render: (row) => <Component {...row} formikContext={formikContext} />},
    };
  });
}

function buildTableActions(actions, formikContext) {
  return actions.map((action) => {
    return getEventHandler(action, formikContext);
  });
}

export default function Table(props) {
  const {
    title,
    columns,
    actions,
    loadDataFn,
    beforeLoadDataFn,
    afterLoadDataFn,
    refreshIf,
    optionsFn,
    localization,
  } = props;

  const formikContext = useFormikContext();
  const { values } = formikContext;
  const { getFieldMeta } = formikContext;
  const tableColumns = buildTableColumns(columns, formikContext);
  const tableActions = buildTableActions(actions, formikContext);

  const tableRef = useRef();

  let refreshIfValue = "";
  if (refreshIf) {
    refreshIfValue = getFieldMeta(refreshIf).value;
  }

  useEffect(() => {
    if (refreshIfValue && tableRef.current) {
      tableRef.current.onQueryChange();
    }
    // eslint-disable-next-line
  }, [refreshIfValue]);

  const tableOptions = useMemo(() => {
    return {
      actionsColumnIndex: -1,
      filtering: true,
      pageSize: 10,
      columnsButton: true,
      ...buildTableOptions(optionsFn)
    };
  }, [optionsFn]);

  const fetchData = useCallback((query) => {
    let request;
    const beforeLoad = getEventHandler(beforeLoadDataFn);
    if (beforeLoad) {
      request = beforeLoad(query, values);
    }
    return new Promise((resolve) => {
      getEventHandler(loadDataFn)({ query, request }).then((result) => {
        const afterLoadFn =  getEventHandler(afterLoadDataFn);
        if (!afterLoadFn) {
          resolve(result);
        } else {
          afterLoadFn({ result, query }, (data) => {
            resolve(data);
          });
        }
      });
    });
  }, [beforeLoadDataFn, loadDataFn, afterLoadDataFn])

  return (
    <Box
      sx={{
        '& .MuiPaper-root': {
          padding: 1,
          backgroundColor: '#fbfbfb',
        },
        '& .MuiTable-root': {
          '& .MuiTableRow-root': {
            borderRadius: 4,
            backgroundColor: '#fff',
            border: '1px solid #f0f0f0',
          },
          '& .MuiTableCell-root': {
            border: 0,
            marginTop: 1,
          },
          '& .MuiTableFooter-root tr td div:nth-child(1)': {
            justifyContent: 'center',
            flex: 'initial',
          },
        }
      }}
    >
      <MaterialTable
        tableRef={tableRef}
        title={title}
        options={tableOptions}
        columns={tableColumns}
        data={fetchData}
        actions={tableActions}
        icons={{ ViewColumn: ViewColumnIcon }}
        localization={localization}
      />
    </Box>
  );
}
