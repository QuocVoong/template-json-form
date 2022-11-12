import { apis } from "../../api";
import { now } from "lodash";

const getTableOptions = () => {
  return () => {
    return {
      tableLayout: 'auto',
      debounceInterval: 300,
      filtering: false,
    }
  }
}

const fetchUsers = () => {
  return ({ query }) => {
    const { filters, page, pageSize, search } = query;
    const filter = filters
      .filter((f) => f.value !== 'ALL')
      .reduce((acc, f) => {
        acc[f.column.dataField || f.column.field] = f.value;
        return acc;
      }, {});
    return apis.fetchUsers({ _page: page, _limit: pageSize, ...filter, ...search && { email: search } })
  }
}

const afterFetchUsers = () => {
  return ({ result, query }, resolve) => {
    resolve({ data: result.data, totalCount: 1000, page: query.page });
  }
}

const addUser = (formikContext) => ({
  icon: 'add',
  tooltip: 'Add User',
  isFreeAction: true,
  onClick: (event, rowData) => {
    formikContext.setFieldValue('openCreatingDialog', true);
  }
})

export const events = {
  getTableOptions,
  fetchUsers,
  afterFetchUsers,
  addUser,
}