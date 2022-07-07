import { useEffect, useState } from 'react';
import G2HotelAPI from '../../api/G2HotelAPI';
import Room from '../Room/Room';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const getRooms = async () => {
            try {
                const response = await G2HotelAPI.getRooms();
                //get 3 item from response
                const roomsRes = response.slice(0, 8);
                setRooms(roomsRes);
            } catch {
                console.log('error');
            }
        };
        getRooms();
    }, []);
    return (
        <div className="offers-content">
            <div className="row">
                {rooms.map((room) => (
                    <Room key={room.id} data={room} />
                ))}
            </div>
        </div>
    );
};

export default RoomList;
