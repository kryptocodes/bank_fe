import React from "react";
import { useRouter } from "next/router";

interface ISupplierTableProps {
  title: string;
}

const TableIndex: React.FC<any> = ({ Headers, Columns, Favourite }) => {
  const router = useRouter();
  const [fav, setFav] = React.useState<any>(false);

  React.useEffect(() => {
    const favourite = localStorage.getItem("favourites")
    setFav(favourite)
  }, [fav])

  //check ifsc code is in favourites
  const IsFavourite = (code: string) => {
    const favourites = localStorage.getItem("favourites");
    //check if favourites is not empty
      if (favourites !== null) {
    const favs = JSON.parse(favourites);
    if (favs.includes(code)) {
      console.log("IsFavourite",code)
      return true;
      
    }
    }
    return false;
  };



  const removeFromLocalStorage = (id: string) => {
    const favourites = localStorage.getItem("favourites");
    const favouritesArray = JSON.parse(favourites);
    const index = favouritesArray.findIndex((item: any) => item.ifsc === id);
    favouritesArray.splice(index,1);
    localStorage.setItem("favourites", JSON.stringify(favouritesArray));
    setFav(favouritesArray)
  };

  const AddToFavourites = (data: any) => {
    const favourites = localStorage.getItem("favourites");
    if (favourites) {
      const favouritesArray = JSON.parse(favourites);
      if(favouritesArray.some(item => item.ifsc === data.ifsc)){
        return -1;
      } else {
      const newFavourites = [...favouritesArray, data];
      localStorage.setItem("favourites", JSON.stringify(newFavourites));
      setFav(newFavourites)
    }
    } else {
      localStorage.setItem("favourites", JSON.stringify([data]));
      setFav(data)
    }
  };


  const Th: React.FC<ISupplierTableProps> = ({ title = "" }) => (
    <th className="py-3 px-6 text-left ">{title}</th>
  );

  const TdContent = ({ content }: any) => (
    <td className="px-4 py-3 text-ms font-semibold border">
      <div className="flex items-center ">{content}</div>
    </td>
  );

  

  const Td: React.FC<any> = ({ data }) => (
    // loop the object data
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-100 ">
        {Object.keys(data[0]).map((key, index) => (
          <TdContent content={data[0][key]} key={index} />
        ))}
        <button
        onClick={() => 
          IsFavourite(data[0].ifsc) ? removeFromLocalStorage(data[0].ifsc) : AddToFavourites(data[0])
        }
        className="mx-auto pt-2 flex text-center align-center  justify-center px-4 py-3">
          <svg
            className="w-6 h-6 text-indigo-600 "
            fill={fav ? fav.includes(data[0].ifsc) ? 'currentColor' : 'none' : 'none'}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
          </svg> 
        </button>
      </tr>
    </>
  );

  return (
    <>
      <section className="p-2">
        <div className="overflow">
          <div className="overflow-x-auto rounded-lg shadow-lg ">
            <table className="w-full mx-auto">
              <thead>
                <tr className="text-md font-mono font-semibold tracking-wide text-left text-gray-100 bg-indigo-500 uppercase border-b border-gray-600">
                  {Headers?.map((item: any, index: number) => (
                    <Th title={item.title} key={index} />
                  ))}
                  {Favourite && <Th title="Fav" />}
                </tr>
              </thead>
              <tbody className="border-b border-gray-200 hover:bg-gray-100 text-gray-600 text-sm font-light">
                {Columns.map((item: any, index: number) => (
                  <Td data={item} key={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default TableIndex;
