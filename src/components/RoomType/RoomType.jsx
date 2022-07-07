const RoomType = (props) => {
    return (
        <div className="col l-4 m-12 c-12">
            <div
                style={{
                    backgroundImage: `url('${props.data.photos[0].url}')`,
                }}
                className="tour-item"
            >
                <div className="tour-item__container">
                    <p className="tour-item__date">Giá hấp dẫn</p>
                    <div className="tour-item__content">
                        <h6 className="tour-item__title">{props.data.name}</h6>
                        <div className="tour-item__rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </div>
                    </div>
                    <div className="btn-wrap">
                        <div className="btn-bg"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomType;
