import { memo } from "react";

const Table = (props) => {
  const { children, rows = [], onClick } = props;
  return (
    <div className="">
      {rows.length === 0 ? (
        <div className="p-[1rem]">
          <button
            onMouseDown={onClick}
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-[auto]"
            type="button"
            id="add-button"
          >
            Add Record
          </button>
        </div>
      ) : (
        <table className="border-collapse table-auto w-full text-sm">
          <thead>
            <tr className="bg-[#324f80]">
              {["Name", "Email", "Phone", "Action"].map((item, index) => {
                return (
                  <th
                    key={item + index}
                    className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
                  >
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          {children ? (
            children
          ) : (
            <tbody className="bg-white" data-table onMouseDown={onClick}>
              {rows.map((item, index) => {
                return (
                  <tr
                    key={index + Math.random().toString()}
                    className="hover:bg-[whitesmoke] cursor-pointer"
                    data-obj={JSON.stringify(item)}
                  >
                    {item.length > 0 &&
                      item.map((val, index) => {
                        let cell = index === 0 ? val?.split("/")[1] : val;
                        let id = index === 0 ? val?.split("/")[0] : val;
                        return (
                          <td
                            key={id}
                            className="border-b dark:border-slate-600 p-4 pl-8 pt-0 pb-3"
                          >
                            {cell}
                          </td>
                        );
                      })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      )}
    </div>
  );
};

export default memo(Table);
