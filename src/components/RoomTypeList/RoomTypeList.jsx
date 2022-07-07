import { useEffect, useState } from 'react';
import G2HotelAPI from '../../api/G2HotelAPI';
import RoomType from '../RoomType/RoomType';

const RoomTypeList = () => {
    const [roomTypes, setRoomTypes] = useState([]);

    useEffect(() => {
        const getRoomTypes = async () => {
            try {
                const response = await G2HotelAPI.getAllRoomTypes();
                //get 3 item from response
                const roomTypesRes = response.slice(0, 3);
                setRoomTypes(roomTypesRes);
            } catch {
                console.log('error');
            }
        };
        getRoomTypes();
    }, []);
    return (
        <div className="tour-list">
            <div className="row">
                {roomTypes && roomTypes.map((item, index) => <RoomType key={index} data={item} />)}
            </div>
        </div>
    );
};
export default RoomTypeList;
