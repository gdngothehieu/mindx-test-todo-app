import React from "react";
import "./Tabs.css";
function List({ allList, status, checkBox, deleteItem, setAllList, showDeleteAll, ...props }) {
  const savedList = JSON.parse(localStorage.getItem("allList"));
  return (
    <div>
      {showDeleteAll ? (
        <Alert severity="error">Successfully Delete all items</Alert>
      ) : null}
      {allList?.map((todo, id) => {
        if (todo.status === status || status === "All") {
          return (
            <div key={todo.id} className="flex mt-4 mb-4">
              <input
                onChange={(e) => {
                  checkBox(e, todo.title);
                }}
                value={todo.status}
                type="checkbox"
              />
              <div className="line-box">
                <p
                  className="ml-5 "
                  style={
                    todo.isChecked ? { textDecoration: "line-through" } : null
                  }
                >
                  {todo?.title}
                </p>
                {status === "Completed" ? (
                  <img
                    className="trash-can"
                    src="./public/trash-can.png"
                    onClick={() => {
                      deleteItem(todo.title);
                    }}
                  />
                ) : null}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default List;
