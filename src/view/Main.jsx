import { useEffect, useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import Table from "@/components/table/Table";
import {
  addRecord,
  deleteRecord,
  getAllRecords,
  updateRecord,
} from "@/services/widgetsService";
import Modal from "@/components/modal/Modal";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const availableHandles = ["s", "w", "e", "n", "sw", "nw", "se", "ne"];

export default function Main({
  className = "!w-[100%] bg-gray min-h-[90vh]",
  rowHeight = 30,
}) {
  const [state, setState] = useState({
    currentBreakpoint: "lg",
    compactType: "vertical",
    mounted: false,
    layouts: {
      lg: [
        {
          x: 2,
          y: 0,
          w: 6,
          h: 5,
          i: "0",
          resizeHandles: availableHandles,
        },
        {
          x: 8,
          y: 0,
          w: 2,
          h: 5,
          i: "1",
          resizeHandles: availableHandles,
        },
        {
          x: 5,
          y: 1,
          w: 4,
          h: 6,
          i: "2",
          resizeHandles: availableHandles,
        },
      ],
    },
    rows: [],
    fields: {},
    open: false,
    reFetch: false,
  });
  const props = {
    className,
    rowHeight,
  };

  useEffect(() => {
    setState((s) => ({ ...s, mounted: true }));
    getAllRecords()
      .then((res) => {
        let rows = [];
        res.data.forEach((item) => {
          rows.push([
            item._id + "/" + item.name,
            item.email,
            item.number,
            <div className="flex items-center gap-[6px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-blue-500"
                id="add"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-rose-500"
                id="edit"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                id="delete"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>,
          ]);
        });
        state.layouts.lg[0].data = {
          type: "Table",
          rows: rows,
        };
        state.layouts.lg[1].data = {
          type: "Img",
        };
        state.layouts.lg[2].data = {
          type: "tree",
        };
        setState((s) => ({ ...s, rows }));
      })
      .catch((e) => {
        console.error(e);
      });
  }, [state.reFetch]);

  function generateDOM() {
    return _.map(state.layouts.lg, function (l, i) {
      let render = null;
      if (l?.data?.type === "Table") {
        let rows = l.data.rows;
        render = <Table rows={rows} onClick={onClick} />;
      }
      if (l?.data?.type === "Img") {
        render = (
          <div>
            <Image
              src="/next.svg"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
        );
      }
      if (l?.data?.type === "tree") {
        render = (
          <Image src="/hireMe.jpg" fill={true} alt="Picture of the author" />
        );
      }
      return (
        <div key={i} className={""} style={{ border: "1px solid black" }}>
          <div className="">{render}</div>
        </div>
      );
    });
  }

  function onBreakpointChange(breakpoint) {
    setState((s) => ({ ...s, currentBreakpoint: breakpoint }));
  }

  const onLayoutChange = (layout, layouts) => {};

  const onDragStop = (layout, oldItem, newItem, placeholder, e, element) => {
    const cloned = _.cloneDeep(state.layouts.lg);
    cloned.forEach((item, index) => {
      item.y = layout[index].y;
      item.x = layout[index].x;
    });
    setState((s) => ({ ...s, layouts: { lg: cloned } }));
  };

  const onResizeStop = (layout, oldItem, newItem, placeholder, e, element) => {
    const cloned = _.cloneDeep(state.layouts.lg);
    cloned.forEach((item, index) => {
      item.y = layout[index].y;
      item.x = layout[index].x;
      item.w = layout[index].w;
      item.h = layout[index].h;
    });
    setState((s) => ({ ...s, layouts: { lg: cloned } }));
  };

  const handleChange = (e) => {
    setState((s) => ({
      ...s,
      fields: {
        ...s.fields,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    state.isEditing ? UpdateRecord() : AddRecord();
  };

  const UpdateRecord = () => {
    let body = state.fields;
    updateRecord(body)
      .then((res) => {
        setState((s) => ({
          ...s,
          reFetch: !s.reFetch,
          open: false,
          fields: {},
        }));
        toast.success("Record update successfully", {
          position: "bottom-center",
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const AddRecord = () => {
    let body = state.fields;
    addRecord(body)
      .then((res) => {
        setState((s) => ({
          ...s,
          reFetch: !s.reFetch,
          open: false,
          fields: {},
        }));
        toast.success("Record added successfully", {
          position: "bottom-center",
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  function onClick(e) {
    e.stopPropagation();
    let id = e.target.id;
    if (id === "add" || id === "add-button") {
      setState((s) => ({ ...s, open: true, isEditing: false }));
      return;
    }

    if (id === "edit") {
      let item = JSON.parse(e.target.closest("[data-obj]").dataset.obj);
      state.fields.name = item[0].split("/")[1];
      state.fields.email = item[1];
      state.fields.number = item[2];
      state.fields.id = item[0].split("/")[0];
      setState((s) => ({ ...s, open: true, isEditing: true }));
      return;
    }
    if (id === "delete") {
      let item = JSON.parse(e.target.closest("[data-obj]").dataset.obj);
      let id = item[0].split("/")[0];
      deleteRecord(id)
        .then((res) => {
          setState((s) => ({ ...s, reFetch: !s.reFetch }));
          toast.success("Record deleted successfully", {
            position: "bottom-center",
          });
        })
        .catch((e) => {
          console.error(e);
        });
      return;
    }
  }

  const closeModal = () => {
    setState((s) => ({ ...s, open: false, isEditing: false, fields: {} }));
  };

  let btnText = state.isEditing ? "Update" : "Add";

  return (
    <div className="">
      <Modal
        onSubmit={onSubmit}
        open={state.open}
        closeModal={closeModal}
        btnText={btnText}
        heading={state.isEditing ? "Update Entry" : "Add New Entry"}
      >
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Candidate name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Enter name"
            onChange={handleChange}
            value={state.fields?.name ?? ""}
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Candidate email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            onChange={handleChange}
            value={state.fields?.email ?? ""}
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Candidate number
          </label>
          <input
            type="number"
            name="number"
            id="number"
            placeholder="Enter Number"
            onChange={handleChange}
            value={state.fields?.number ?? ""}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
      </Modal>
      <ResponsiveReactGridLayout
        layouts={state.layouts}
        onLayoutChange={onLayoutChange}
        onDragStop={onDragStop}
        onResizeStop={onResizeStop}
        cols={{
          lg: 12,
          md: 8,
          sm: 8,
          xs: 6,
          xxs: 1,
        }}
        {...props}
      >
        {generateDOM()}
      </ResponsiveReactGridLayout>
      <Toaster />
    </div>
  );
}
