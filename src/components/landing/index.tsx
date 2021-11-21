import axios from "axios";
import React, { useEffect } from "react";
import TableIndex from "../Table";
import ReactPaginate from "react-paginate";

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const [data, setData] = React.useState<any>({ data: [], loading: true });
  const [next, setNext] = React.useState<any>({ start: 0, limit: 10 });
  const [Filter, setFilter] = React.useState<String | Number | any>("");
  const [City, setCity] = React.useState<any>("BANGALORE");

  //eslint-disable-next-line

  useEffect(() => {
    const CheckData = localStorage.getItem(City);
    if (CheckData) {
      setData({ data: JSON.parse(CheckData), loading: false });
    } else {
      setData({ data: [], loading: true });
      axios
        .get(`https://vast-shore-74260.herokuapp.com/banks?city=${City}`)
        .then((res) => {
          localStorage.setItem(`${City}`, JSON.stringify(res.data));
          setData({ data: res.data, loading: false });
        });
    }
  }, [City]);

  const HeaderProduct = [
    {
      title: "Sno",
    },
    {
      title: "Bank Id",
    },
    {
      title: "Bank Name",
    },
    {
      title: "Branch",
    },
    {
      title: "City",
    },
    {
      title: "IFSC",
    },
    {
      title: "State",
    },
  ];

  let filterCount =
    Filter !== ""
      ? data?.data?.filter((v) => v?.bank_name.includes(Filter)).length
      : data?.data.length;

  let filter =
    Filter !== ""
      ? data?.data
          ?.filter((v) => v?.bank_name.includes(Filter))
          .slice(next.start, next.limit)
      : data?.data?.slice(next.start, next.limit);

  const handlePageClick = (event) => {
    const newOffset = event.selected * 10;
    setNext({ start: newOffset, limit: newOffset + 10 });
  };

  const ColumnProduct =
    data &&
    filter.map((v: any, index: number) => [
      {
        sno: index + next?.start + 1,
        bankId: v?.bank_id,
        bankName: v?.bank_name,
        branch: v?.branch,
        city: v?.city,
        ifsc: v?.ifsc,
        state: v?.state,
      },
    ]);

  const Component = () => (
    <>
      {data !== undefined && (
        <TableIndex Headers={HeaderProduct} Columns={ColumnProduct} Favourite />
      )}
    </>
  );
  return (
    <>
      {" "}
      <h1 className="text-2xl mx-auto text-center mt-4 font-sans font-bold">
        Search For Bank Info
      </h1>
      {!data?.loading ? (
        <>
          <div className="flex gap-4 mx-auto py-4 p-4 sm:p-10">
            <select
              value={City}
              onChange={(e) => {
                setCity(e.target.value);
                setNext({ start: 0, limit: 10 });
              }}
            >
              <option value="BANGALORE">BANGALORE</option>
              <option value="MUMBAI">MUMBAI</option>
              <option value="CHENNAI">CHENNAI</option>
              <option value="KOLKATA">KOLKATA</option>
              <option value="DELHI">DELHI</option>
            </select>

            <input
              type="text"
              value={Filter}
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              placeholder="Search (Bank Name)"
              onChange={(e) => {
                setFilter(e.target.value.toUpperCase());
                setNext({ start: 0, limit: 10 });
              }}
            />
          </div>
          <Component />
          <div className="flex mx-auto align-center py-10 justify-center gap-2">
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={
                next?.limit > filterCount ? 1 : Math.ceil(filterCount / 10)
              }
              previousLabel="< previous"
              pageClassName="py-2 px-4 bg-indigo-500  text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
              pageLinkClassName="bg-indigo-500 text-white font-semibold "
              previousClassName="bg-indigo-500 py-2 px-4 text-white font-semibold"
              previousLinkClassName="bg-indigo-500 text-white font-semibold "
              nextClassName="bg-indigo-500 py-2 px-4 text-white font-semibold "
              nextLinkClassName="bg-indigo-500 text-white font-semibold "
              breakLabel="..."
              breakClassName="ext-white font-semibold "
              breakLinkClassName="page-link"
              containerClassName="z-0 inline-flex rounded-md overflow-x-auto shadow-sm gap-2"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>
        </>
      ) : (
        <div className="flex mx-auto align-center justify-center mt-48">
          <div className="font-bold text-4xl text-center" role="status">
            <span className="text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-28 w-28 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
