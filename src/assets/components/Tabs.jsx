import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./Tabs.css";
import List from "./List";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const [allList, setAllList] = React.useState([
    {
      id: 1,
      title: "Become President",
      status: "Active",
      isChecked: false,
    },
    {
      id: 2,

      title: "Become Developer",
      status: "Active",
      isChecked: false,
    },

    {
      id: 3,

      title: "Become a Billionaire",
      status: "Completed",
      isChecked: false,
    },
    {
      id: 4,

      title: "Become a good person",
      status: "Completed",
      isChecked: false,
    },
  ]);
  const [keyword, setKeyword] = React.useState("");
  const addTask = () => {
    if (!keyword) {
      return;
    }
    setAllList([
      ...allList,
      {
        id: allList.length + 1,
        title: keyword,
        status: "Active",
        isChecked: false,
      },
    ]);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const resetIsChecked = () => {
    const newList = allList.map((todo) => {
      todo.isChecked = false;
      return todo;
    });
    console.log(newList);
    setAllList(newList);
  };
  const deleteItem = (title) => {
    const newList = allList.filter((todo) => todo.title !== title);
    setAllList(newList);
  };
  const deleteAll = (title) => {
    const newList = [];
    setAllList(newList);
  };
  const checkBox = (e, title) => {
    const newList = allList.map((todo) => {
      console.log(todo.title, title);
      if (todo.title === title) {
        todo.isChecked = e.target.checked;
      }
      return todo;
    });
    console.log(newList);
    setAllList(newList);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <div className="text-center todo-head">#Todo</div>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          onClick={() => {
            resetIsChecked();
          }}
          aria-label="basic tabs example"
        >
          <Tab style={{ width: "33%" }} label="All" {...a11yProps(0)} />
          <Tab style={{ width: "33%" }} label="Active" {...a11yProps(1)} />
          <Tab style={{ width: "33%" }} label="Completed" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <div className="flex ">
          <input
            className="add-details-input"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            placeholder="add details"
          />
          <button className="add-button" onClick={() => addTask()}>
            Add
          </button>
        </div>
        <div className=" ">
          <List
            deleteItem={deleteItem}
            checkBox={checkBox}
            allList={allList}
            status={"All"}
          />
        </div>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <div>
          <input
            className="add-details-input"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            placeholder="add details"
          />
          <button className="add-button" onClick={() => addTask()}>
            Add
          </button>
        </div>
        <List
          deleteItem={deleteItem}
          checkBox={checkBox}
          allList={allList}
          status={"Active"}
        />

        <button
          className="complete-task"
          onClick={() => {
            const newList = allList.map((todo, index) => {
              console.log(todo.id, index);
              if (todo.isChecked) {
                todo.status = "Completed";
              }
              return todo;
            });
            console.log(newList);
            setAllList(newList);
          }}
        >
          Complete Task
        </button>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <List
          deleteItem={deleteItem}
          checkBox={checkBox}
          allList={allList}
          status={"Completed"}
        />

        <button
          className="delete-all"
          onClick={() => {
            deleteAll();
          }}
          
        >
          Delete All
        </button>
      </CustomTabPanel>
    </Box>
  );
}
