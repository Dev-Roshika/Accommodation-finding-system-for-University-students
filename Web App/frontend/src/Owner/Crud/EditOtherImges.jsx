import axios from "axios";
import React, { useEffect } from "react";
import UpdateOtherImages from "./UpdateOtherImages";

function EditOtherImges() {
    const { id } = useParams();
    const [Data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/boarding-data/${id}`)
            .then((res) => {
                console.log(res.data[0].OtherImages);
                setData(res.data[0].OtherImages);
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
                <UpdateOtherImages
                    initialValues={Data} // Pass the boarding details as initialValues
                />
            )}
        </div>
    );
}

export default EditOtherImges;
