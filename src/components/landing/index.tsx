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

  //axios to fetch github url
  useEffect(() => {
    //create pagination for data fetching
    setData({ data: [], loading: true });
    axios
      .get(`https://vast-shore-74260.herokuapp.com/banks?city=${City}`)
      .then((res) => {
        console.log(res.data);
        setData({ data: res.data, loading: false });
      });
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

  // iterate data objects and map to table rows

  console.log(next);
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
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
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
      {!data?.loading ? (
        <>
          {data !== undefined && (
            <TableIndex Headers={HeaderProduct} Columns={ColumnProduct} />
          )}
        </>
      ) : (
        "Loading"
      )}
    </>
  );
  return (
    <>
      {" "}
      <h1 className="text-4xl mx-auto text-center">Bank</h1>
      <div className="flex mx-auto">
        <select value={City} onChange={(e) => setCity(e.target.value)}>
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
          placeholder="Search"
          onChange={(e) => {
            setFilter(e.target.value.toUpperCase());
            setNext({ start: 0, limit: 10 });
          }}
        />
      </div>
      <Component />
      <div className="flex mx-auto align-center justify-center gap-2">
        {/* <button
        className="py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        onClick={() =>
          setNext({ start: next?.start - 10, limit: next?.limit - 10 })
        }
      >
        {" "}
        Previous{" "}
      </button>
      
      <button className="py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
        {filterCount}
      </button>


      <button
        className="py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        onClick={() =>
          setNext({ start: next?.start + 10, limit: next?.limit + 10 })
        }
      >
        {" "}
        Load More{" "}
      </button> */}

        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={
            next?.limit > filterCount ? 1 : Math.ceil(filterCount / 10)
          }
          previousLabel="< previous"
          pageClassName="py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          pageLinkClassName="bg-indigo-500 text-white font-semibold "
          previousClassName="bg-indigo-500 py-2 px-4 text-white font-semibold"
          previousLinkClassName="bg-indigo-500 text-white font-semibold "
          nextClassName="bg-indigo-500 py-2 px-4 text-white font-semibold "
          nextLinkClassName="bg-indigo-500 text-white font-semibold "
          breakLabel="..."
          breakClassName="ext-white font-semibold "
          breakLinkClassName="page-link"
          containerClassName="relative z-0 inline-flex rounded-md shadow-sm gap-2"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default Index;
