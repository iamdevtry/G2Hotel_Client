import { useState } from 'react';
import { Link } from 'react-router-dom';
const Room = (props) => {
    const [room, setRoom] = useState(props.data);
    return (
        <div className="col l-6 c-12">
            <div className="offers-item__wrap">
                <div
                    className="offers-item__bg"
                    style={{
                        backgroundImage: `url('${room.photos[0]?.url}')`,
                    }}
                >
                    <Link to={`detail/${room.id}`} className="offers-item__name">
                        {room.name}
                    </Link>
                </div>
                <div className="offers-item__container">
                    <div className="offers-item__content">
                        <h4
                            className="offers-item__price"
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            {room.promotionPrice && room.promotionPrice !== 0 ? (
                                <>
                                    {room.promotionPrice.toLocaleString('it-IT', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                    <p
                                        style={{
                                            padding: '0px 6px',
                                            fontSize: '1.2rem',
                                            textDecoration: 'line-through',
                                            color: 'red',
                                        }}
                                    >
                                        {room.defaultPrice.toLocaleString('it-IT', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </p>
                                    <span>/ đêm</span>
                                </>
                            ) : (
                                <>
                                    {room.defaultPrice.toLocaleString('it-IT', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                    <span>/ đêm</span>
                                </>
                            )}
                        </h4>
                        <div className="offers-item__rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </div>
                        <p className="offers-item__desc">{room.shortDescription}</p>
                        <div className="offers-item__action">
                            <img
                                src="./assets/images/ofi1.webp"
                                alt=""
                                className="offers-item__action-img"
                            />
                            <img
                                src="./assets/images/ofi2.webp"
                                alt=""
                                className="offers-item__action-img"
                            />
                            <img
                                src="./assets/images/ofi3.webp"
                                alt=""
                                className="offers-item__action-img"
                            />
                            <img
                                src="./assets/images/ofi4.webp"
                                alt=""
                                className="offers-item__action-img"
                            />
                        </div>
                    </div>
                    <Link to={`detail/${room.id}`} className="offers-item__link">
                        Chi tiết ...
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Room;
