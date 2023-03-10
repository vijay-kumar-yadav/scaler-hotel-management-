import { Button, Container, Table } from "rsuite";
import React, { useState } from "react";

const { Column, HeaderCell, Cell } = Table;
const EditableCell = ({ rowData, dataKey, onChange, ...props }) => {
  const editing = rowData.status === "EDIT";
  return (
    <Cell {...props} className={editing ? "table-content-editing" : ""}>
      {editing ? (
        <input
          className="rs-input"
          defaultValue={rowData[dataKey]}
          onChange={(event) => {
            onChange && onChange(rowData.id, dataKey, event.target.value);
          }}
        />
      ) : (
        <span className="table-content-edit-span">{rowData[dataKey]}</span>
      )}
    </Cell>
  );
};

const ActionCell = ({ rowData, dataKey, onClick, disable, ...props }) => {
  return (
    <Cell {...props} style={{ padding: "6px" }}>
      <Button
        disabled={disable}
        appearance="link"
        onClick={() => {
          onClick(rowData.id);
        }}
      >
        {rowData.status === "EDIT" ? "Save" : "Edit"}
      </Button>
    </Cell>
  );
};
const Room = ({ reservationList, setReservationList }) => {
  const [disable, setDisable] = useState(false);
  const [data, setData] = useState(reservationList);
  console.log(reservationList);
  // const columns = [
  //   { title: "Name", id1: "title" },
  //   { title: "Email", id1: "email" },
  //   { title: "Start Date", id1: "start" },
  //   { title: "End Date", id1: "end" },
  //   { title: "Duration [hrs]", id1: "duration" },
  // ];

  const handleChange = (id, key, value) => {
    const nextData = Object.assign([], data);
    if (value.length <= 0) setDisable(true);
    else setDisable(false);

    if (
      key === "email" &&
      value
        .toLowerCase()
        .match(
          /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
        ) === null
    ) {
      setDisable(true);
    } else setDisable(false);
    nextData.find((item) => item.id === id)[key] = value;
    setData(nextData);
  };
  const handleEditState = (id) => {
    const nextData = Object.assign([], data);
    const activeItem = nextData.find((item) => item.id === id);
    activeItem.status = activeItem.status ? null : "EDIT";
    setData(nextData);
    setReservationList(data);
  };
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const getData = () => {
    if (sortColumn && sortType) {
      return reservationList.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };
  return (
    <Container style={{ overflow: "hidden", height: "100vh" }}>
      <Table
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        loading={loading}
        cellBordered
        fillHeight
        width={"100vw"}
        data={getData()}
      >
        <Column flexGrow={2} width={200} sortable>
          <HeaderCell>Name</HeaderCell>
          <EditableCell onChange={handleChange} dataKey={"title"} />
        </Column>
        <Column flexGrow={2} width={200}>
          <HeaderCell>Email</HeaderCell>
          <EditableCell onChange={handleChange} dataKey={"email"} />
        </Column>
        <Column flexGrow={2} width={200}>
          <HeaderCell>Room Booked</HeaderCell>
          <Cell fullText dataKey={"room"} />
        </Column>

        <Column flexGrow={2} width={75}>
          <HeaderCell>Duration</HeaderCell>
          <Cell dataKey={"duration"} />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>...</HeaderCell>
          <ActionCell
            disable={disable}
            dataKey="title"
            onClick={handleEditState}
          />
        </Column>
      </Table>
    </Container>
  );
};

export default Room;
