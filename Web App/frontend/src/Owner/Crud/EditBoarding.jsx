import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Update from "./Update";

function EditBoarding() {
    const { id } = useParams();
    const [Data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/boarding-data/${id}`)
            .then((res) => {
                console.log(res.data[0]);
                setData(res.data[0]);
                console.log("data is fetched successfully");
                console.log(Data);
            })
            .catch((error) => {
                console.error("Error, fetching data from backend:", error);
            });
            // eslint-disable-next-line
    }, []);

    return (
        <div>
            {Data && (
                <Update
                    initialValues={Data} // Pass the boarding details as initialValues
                />
            )}
        </div>
    );
}

export default EditBoarding;
