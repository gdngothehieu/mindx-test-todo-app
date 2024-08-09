import React from "react";
import "./Tabs.css";
function List({ allList, status, checkBox, deleteItem, ...props }) {
  return (
    <div>
      {allList.map((todo, id) => {
        if (todo.status === status || status === "All") {
          return (
            <div key={todo.title} className="flex">
              <input
                onChange={(e) => {
                  checkBox(e, todo.title);
                }}
                value={todo.status}
                type="checkbox"
              />
              <p
                className="ml-5"
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
