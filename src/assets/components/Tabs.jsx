import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./Tabs.css";
import List from "./List";
import { Alert } from "@mui/material";
import NestedModal from "./DeleteModal";
import DeleteAllModal from "./DeleteAllModal";

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
const data = [
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

    title: "Become a hyper active person",
    status: "Completed",
    isChecked: false,
  },

  {
    id: 5,

    title: "Become a patient person",
    status: "Completed",
    isChecked: false,
  },

  {
    id: 6,

    title: "Become a  person",
    status: "Completed",
    isChecked: false,
  },
];
export default function BasicTabs() {
  const savedList = JSON?.parse(localStorage?.getItem("allList"));
  //   localStorage?.setItem(data)
  const [value, setValue] = React.useState(0);

  const [allList, setAllList] = React.useState(
    savedList?.length ? savedList : []
  );
  const [keyword, setKeyword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [showDeleteAll, setShowDeleteAll] = React.useState(false);
  const [showCompleteTask, setShowCompleteTask] = React.useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = React.useState(false);

  React.useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShowDeleteAll(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [showDeleteAll]);

  React.useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [show]);

  React.useEffect(() => {
    if (allList.length) {
      localStorage.setItem("allList", JSON?.stringify(allList));
    }
  }, [allList]);

  const addTask = (e) => {
    if (!keyword) {
      return;
    }
    const existTask = allList.filter((todo) => todo.title === keyword);

    if (existTask.length) {
      setShow(true);
      const setShowFalse = () => {
        setShow(false);
      };
      setTimeout(set);

      return;
    }
    setAllList((prev) => {
      return [
        ...prev,
        {
          id: prev?.length + 1,
          title: keyword,
          status: "Active",
          isChecked: false,
        },
      ];
    });

    // reload();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const reload = () => {
    window.location.reload();

    resetIsChecked();
  };
  const resetIsChecked = () => {
    const newList = allList.map((todo) => {
      todo.isChecked = false;
      return todo;
    });
    setAllList(newList);
  };

  const deleteItem = (title) => {
    const newList = allList.filter((todo) => todo.title !== title);
    setAllList(newList);
    // window.location.reload();
    localStorage.setItem("allList", JSON.stringify(newList));
  };

  const deleteAll = (title) => {
    const newList = [];
    setAllList(newList);
    // reload();
    localStorage.setItem("allList", JSON.stringify([]));
  };

  const checkBox = (e, title) => {
    const newList = allList.map((todo) => {
      if (todo.title === title) {
        todo.isChecked = e.target.checked;
      }
      return todo;
    });
    setAllList(newList);
  };

  const completeTask = () => {
    const newList = allList.map((todo, index) => {
      if (todo.isChecked) {
        todo.status = "Completed";
      }
      return todo;
    });
    // reload();

    setAllList(newList);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <div className="text-center todo-head">
        <h3>#Todo</h3>
      </div>
      {showDeleteAll ? (
        <Alert severity="success">Successfully Delete all items</Alert>
      ) : null}
      {showCompleteTask ? (
        <Alert severity="success">Successfully Complete Task</Alert>
      ) : null}
      {show ? (
        <Alert severity="error">
          You already have this task. Please kindly input a new task.
        </Alert>
      ) : null}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          onClick={() => {
            resetIsChecked();
          }}
          TabIndicatorProps={{
            style: {
              height:"5px",
              width: "10%",
            marginLeft: "12%"
            }
          }}   
          aria-label="basic tabs example"
        >
          <Tab
            style={{ width: "33%" }}
                     label="All"
            {...a11yProps(0)}
          />
          <Tab style={{ width: "33%" }} label="Active" {...a11yProps(1)} />
          <Tab style={{ width: "33%" }} label="Completed" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <div className="flex">
          <input
            className="add-details-input"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            placeholder="add details"
          />
          <button className="add-button" onClick={(e) => addTask(e)}>
            Add
          </button>
        </div>
        <div className=" ">
          <List
            setAllList={setAllList}
            deleteItem={deleteItem}
            checkBox={checkBox}
            allList={allList}
            status={"All"}
          />
        </div>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <div className="flex">
          <input
            className="add-details-input"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            placeholder="add details"
          />
          <button className="add-button" onClick={(e) => addTask(e)}>
            Add
          </button>
        </div>
        <List
          setAllList={setAllList}
          deleteItem={deleteItem}
          checkBox={checkBox}
          allList={allList}
          status={"Active"}
        />

        <button
          className="complete-task"
          onClick={() => {
            completeTask();
          }}
        >
          Complete Task
        </button>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <List
          setAllList={setAllList}
          deleteItem={deleteItem}
          checkBox={checkBox}
          allList={allList}
          status={"Completed"}
        />

        <button
          className="delete-all"
          onClick={() => {
            setShowDeleteAllModal(true);
          }}
        >
          Delete All
        </button>
      </CustomTabPanel>
      <DeleteAllModal
        showDeleteAll={showDeleteAll}
        setShowDeleteAll={setShowDeleteAll}
        showDeleteAllModal={showDeleteAllModal}
        setShowDeleteAllModal={setShowDeleteAllModal}
        deleteAll={deleteAll}
      />

      <NestedModal />
    </Box>
  );
}
