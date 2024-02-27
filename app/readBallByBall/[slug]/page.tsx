// pages/scoreboard/[matchId].tsx
"use client";
import { GetServerSideProps } from "next";

import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Checkbox, Select } from "antd";

interface CricketData {
  localId: number;
  over: number;
  ball_number: number;
  runs: number | null;
  // Add more properties based on your data
}

const ScoreboardPage = ({ params }: { params: { slug: string } }) => {
  const [filteredData, setFilteredData] = useState<CricketData[]>([]);
  const [fetchDataFromApi, setFetchDataFromApi] = useState([]);
	const [filterFromDropdown,setFilterFromDropdown] = useState('')
  const [folderPath, setFolderPath] = useState<string>(() => {
    // Retrieve folder path from localStorage or use an empty string
    return localStorage.getItem("folderPath") || "";
  });

  useEffect(() => {
    // Save folder path to localStorage whenever it changes
    localStorage.setItem("folderPath", folderPath);
  }, [folderPath]);
	useEffect(()=>{
		console.log(filterFromDropdown)
		if(filterFromDropdown === 'wickets') setFilteredData(fetchDataFromApi.filter((e:any)=> e.is_out != -1))
		if(filterFromDropdown === 'fours') setFilteredData(fetchDataFromApi.filter((e:any)=> e.runs === 4))
		if(filterFromDropdown === 'sixes') setFilteredData(fetchDataFromApi.filter((e:any)=> e.runs === 6))
		if(filterFromDropdown === 'appeals') setFilteredData(fetchDataFromApi.filter((e:any)=> e.appeal_type !== -1))
		if(filterFromDropdown === 'clear') setFilteredData(fetchDataFromApi);
	},[filterFromDropdown])

  const searchParams = useSearchParams();
  let inningNumber = 0;
  inningNumber = Number(searchParams.get("inning"));
  let matchId: any = 0;
  matchId = params.slug;
  useEffect(() => {

    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/getBallByBall?matchId=${matchId}&inning=${inningNumber}`
      );
      setFetchDataFromApi(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Implement your filtering logic here based on user input
    // For simplicity, this example assumes 'over' as the filter property
    const filterNumber = parseInt(e.target.value, 10);

    if (e.target.value === "") {
      setFilteredData(fetchDataFromApi);
      return;
    }

    const filteredResult = fetchDataFromApi.filter(
      (item: any) => item.over === filterNumber
    );
    setFilteredData(filteredResult);
  };
	const openFolderPath = () => {
		if (folderPath) {
			// Check if the platform is Windows
			if (window.navigator.platform.toLowerCase().includes('win')) {
				// Use backslashes for Windows file paths
				const windowsPath = folderPath.replace(/\//g, '\\');
				window.open(`file:///${windowsPath}`);
			} else {
				// For non-Windows platforms, assume macOS
				// Replace spaces with %20 in the path for macOS
				const macPath = folderPath.replace(/ /g, '%20');
				// Open Finder on macOS
				window.open(`file://${macPath}`);
			}
		}
	};
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row justify-center gap-4 bg-white fixed w-full">
        <div className="mb-4">
          <label className="mr-2">Over:</label>
          <input
            type="text"
            className="border rounded p-2"
            onChange={handleFilterChange}
          />
        </div>
        <div className="mb-4">
          <label className="mr-2">Folder Path:</label>
          <input
            type="text"
            placeholder="Enter folder path..."
            className="border rounded p-2"
            onChange={(e) => setFolderPath(e.target.value)}
          />
        </div>
        <Select
          placeholder="select Balls"
          className="mb-4"
          onSelect={(e) => setFilterFromDropdown(e)}
        >
          <Select.Option key={"wickets"}>Wickets</Select.Option>
          <Select.Option key={"fours"}>4's</Select.Option>
          <Select.Option key={"sixes"}>6's</Select.Option>
					<Select.Option key={"appeals"}>Appeals</Select.Option>
					<Select.Option key={"clear"}>Clear</Select.Option>
        </Select>
      </div>

      <table className="table-auto w-full mt-20">
        <thead>
          <tr>
            <th className="border px-4 py-2">Ball Number</th>
            <th className="border px-4 py-2">Runs</th>
            <th className="border px-4 py-2">Video</th>
            <th className="border px-4 py-2">Wicket</th>
            {/* Add more columns based on your data */}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item: any) => {
            return (
              <tr key={item.localId} className={item?.is_out != -1 ? "bg-red-700 text-white rounded-md" :''}>
                <td className="border px-4 py-2">
                  {item?.over}.{item.ball_number}
                </td>

                <td className="border px-4 py-2">
                  {item.runs !== null ? item.runs : "0"}
                </td>
                <td
                  onClick={openFolderPath}
                  className="border px-4 py-2 cursor-pointer to-blue-600"
                >
                  {item.videourl.split("sendEvent?BallNo=BallNo=")[1]
                    ? `${folderPath}/${
                        item.videourl.split("sendEvent?BallNo=BallNo=")[1]
                      }.mp4`
                    : ""}
                </td>
                <td>{item?.is_out == -1 ? "-" : item?.is_out}</td>
                {/* Add more cells based on your data */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreboardPage;
