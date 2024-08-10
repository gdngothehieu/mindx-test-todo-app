import React from "react";
import "./Tabs.css";
function List({ allList, status, checkBox, deleteItem, setAllList, ...props }) {
  const savedList = JSON.parse(localStorage.getItem("allList"));

  return (
    <div>
      {allList.map((todo, id) => {
        if (todo.status === status || status === "All") {
          return (
            <div key={todo.title} className="flex mt-4 mb-4">
              <input
                onChange={(e) => {
                  checkBox(e, todo.title);
                }}
                value={todo.status}
                type="checkbox"
              />
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
          );
        }
      })}
    </div>
  );
}

export default List;
